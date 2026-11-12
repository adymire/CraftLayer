import type { Dirent } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { ZodError } from "zod";
import {
  skillFrontmatterSchema,
  skillRegistrySchema,
  type SkillRegistry,
} from "./schema.js";

function formatZodError(error: ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "value"}: ${issue.message}`)
    .join("; ");
}

function hasRequiredSections(markdown: string): boolean {
  const required = [
    "when to use",
    "when not to use",
    "workflow",
    "validation",
  ];
  const headings = [...markdown.matchAll(/^#{1,6}\s+(.+)$/gm)];

  return required.every((requiredHeading) => {
    const headingIndex = headings.findIndex(
      (match) => match[1].trim().toLowerCase() === requiredHeading,
    );
    if (headingIndex < 0) {
      return false;
    }

    const currentHeading = headings[headingIndex];
    const nextHeading = headings[headingIndex + 1];
    const sectionBody = markdown.slice(
      (currentHeading.index ?? 0) + currentHeading[0].length,
      nextHeading?.index,
    );
    return sectionBody.trim().length > 0;
  });
}

export async function validateRepository(
  rootDirectory: string,
): Promise<string[]> {
  const errors: string[] = [];
  const registryFile = path.join(rootDirectory, "skills", "registry.json");

  let registry: SkillRegistry;
  try {
    const registryContents = await readFile(registryFile, "utf8");
    const parsedRegistry: unknown = JSON.parse(registryContents);
    const result = skillRegistrySchema.safeParse(parsedRegistry);
    if (!result.success) {
      return [`skills/registry.json: ${formatZodError(result.error)}`];
    }
    registry = result.data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      return [`skills/registry.json: invalid JSON: ${error.message}`];
    }
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return ["skills/registry.json: file is missing"];
    }
    throw error;
  }

  const registeredSkills = new Map(
    registry.skills.map((skill) => [skill.id, skill]),
  );

  for (const skill of registry.skills) {
    for (const dependency of skill.dependencies) {
      if (!registeredSkills.has(dependency)) {
        errors.push(
          `skills/registry.json: "${skill.id}" depends on unknown skill "${dependency}"`,
        );
      }
    }
    for (const relatedSkill of skill.relatedSkills) {
      if (!registeredSkills.has(relatedSkill)) {
        errors.push(
          `skills/registry.json: "${skill.id}" references unknown related skill "${relatedSkill}"`,
        );
      }
    }
  }

  const skillsDirectory = path.join(rootDirectory, "skills");
  let directories: Dirent[];
  try {
    directories = await readdir(skillsDirectory, { withFileTypes: true });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return [...errors, "skills: directory is missing"];
    }
    throw error;
  }
  for (const directory of directories.filter((entry) => entry.isDirectory())) {
    const skillId = directory.name;
    const registryEntry = registeredSkills.get(skillId);
    if (!registryEntry) {
      errors.push(`skills/${skillId}: missing registry entry`);
      continue;
    }

    const skillFile = path.join(skillsDirectory, skillId, "SKILL.md");
    let source: string;
    try {
      source = await readFile(skillFile, "utf8");
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") {
        errors.push(`skills/${skillId}/SKILL.md: file is missing`);
        continue;
      }
      throw error;
    }

    let frontmatter: unknown;
    let body: string;
    try {
      const parsed = matter(source);
      frontmatter = parsed.data;
      body = parsed.content;
    } catch (error) {
      errors.push(
        `skills/${skillId}/SKILL.md: invalid frontmatter: ${error instanceof Error ? error.message : String(error)}`,
      );
      continue;
    }

    const metadataResult = skillFrontmatterSchema.safeParse(frontmatter);
    if (!metadataResult.success) {
      errors.push(
        `skills/${skillId}/SKILL.md: ${formatZodError(metadataResult.error)}`,
      );
      continue;
    }

    if (metadataResult.data.name !== skillId) {
      errors.push(
        `skills/${skillId}/SKILL.md: frontmatter name must match directory name`,
      );
    }
    if (registryEntry.name !== metadataResult.data.name) {
      errors.push(
        `skills/${skillId}/SKILL.md: registry name must match frontmatter name`,
      );
    }
    if (registryEntry.description !== metadataResult.data.description) {
      errors.push(
        `skills/${skillId}/SKILL.md: registry description must match frontmatter description`,
      );
    }
    if (!hasRequiredSections(body)) {
      errors.push(
        `skills/${skillId}/SKILL.md: must include non-empty "When to use", "When not to use", "Workflow", and "Validation" sections`,
      );
    }
  }

  for (const skill of registry.skills) {
    const directory = path.join(skillsDirectory, skill.id);
    try {
      await readdir(directory);
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") {
        errors.push(`skills/${skill.id}: directory is missing`);
        continue;
      }
      throw error;
    }
  }

  return errors;
}

export { skillFrontmatterSchema, skillRegistrySchema };
export type { SkillFrontmatter, SkillRegistry, SkillRegistryEntry } from "./schema.js";
