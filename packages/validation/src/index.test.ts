import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { validateRepository } from "./index.js";

const temporaryDirectories: string[] = [];

async function createRepository(registry: unknown): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "craftlayer-validation-"));
  temporaryDirectories.push(root);
  await mkdir(path.join(root, "skills"), { recursive: true });
  await writeFile(
    path.join(root, "skills", "registry.json"),
    JSON.stringify(registry),
  );
  return root;
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

describe("validateRepository", () => {
  it("accepts the empty initial registry", async () => {
    const root = await createRepository({ schemaVersion: 1, skills: [] });
    await expect(validateRepository(root)).resolves.toEqual([]);
  });

  it("reports missing skill directories and invalid published content", async () => {
    const root = await createRepository({
      schemaVersion: 1,
      skills: [
        {
          id: "design-intelligence",
          name: "design-intelligence",
          description: "Plan interface work before implementation.",
          category: "design",
          version: "0.1.0",
          path: "skills/design-intelligence",
          tags: [],
          agents: ["generic"],
          dependencies: [],
          relatedSkills: [],
          status: "published",
          license: "MIT",
          lastReviewed: "2026-11-11",
        },
      ],
    });

    const errors = await validateRepository(root);
    expect(errors).toContain("skills/design-intelligence: directory is missing");
  });

  it("checks frontmatter consistency and required skill sections", async () => {
    const registry = {
      schemaVersion: 1,
      skills: [
        {
          id: "design-intelligence",
          name: "design-intelligence",
          description: "Plan interface work before implementation.",
          category: "design",
          version: "0.1.0",
          path: "skills/design-intelligence",
          tags: [],
          agents: ["generic"],
          dependencies: [],
          relatedSkills: [],
          status: "published",
          license: "MIT",
          lastReviewed: "2026-11-11",
        },
      ],
    };
    const root = await createRepository(registry);
    const skillDirectory = path.join(root, "skills", "design-intelligence");
    await mkdir(skillDirectory);
    await writeFile(
      path.join(skillDirectory, "SKILL.md"),
      [
        "---",
        "name: design-intelligence",
        "description: Different description.",
        "---",
        "# Design Intelligence",
        "",
        "Some incomplete content.",
      ].join("\n"),
    );

    const errors = await validateRepository(root);
    expect(errors).toContain(
      "skills/design-intelligence/SKILL.md: registry description must match frontmatter description",
    );
    expect(
      errors.some((error) => error.includes('must include non-empty "When to use"')),
    ).toBe(true);
  });

  it("accepts a complete published skill", async () => {
    const description = "Plan interface work before implementation.";
    const root = await createRepository({
      schemaVersion: 1,
      skills: [
        {
          id: "design-intelligence",
          name: "design-intelligence",
          description,
          category: "design",
          version: "0.1.0",
          path: "skills/design-intelligence",
          tags: [],
          agents: ["generic"],
          dependencies: [],
          relatedSkills: [],
          status: "published",
          license: "MIT",
          lastReviewed: "2026-11-11",
        },
      ],
    });
    const skillDirectory = path.join(root, "skills", "design-intelligence");
    await mkdir(skillDirectory);
    await writeFile(
      path.join(skillDirectory, "SKILL.md"),
      [
        "---",
        "name: design-intelligence",
        `description: ${description}`,
        "---",
        "# Design Intelligence",
        "",
        "## When to use",
        "Use this for product interface planning.",
        "",
        "## When not to use",
        "Do not use it for unrelated backend-only changes.",
        "",
        "## Workflow",
        "Inspect constraints, define direction, then validate the work.",
        "",
        "## Validation",
        "Check accessibility, responsive behavior, and project conventions.",
      ].join("\n"),
    );

    await expect(validateRepository(root)).resolves.toEqual([]);
  });

  it("reports unresolved registry references", async () => {
    const root = await createRepository({
      schemaVersion: 1,
      skills: [
        {
          id: "design-intelligence",
          name: "design-intelligence",
          description: "Plan interface work before implementation.",
          category: "design",
          version: "0.1.0",
          path: "skills/design-intelligence",
          tags: [],
          agents: ["generic"],
          dependencies: ["unknown-skill"],
          relatedSkills: [],
          status: "draft",
          license: "MIT",
          lastReviewed: "2026-11-11",
        },
      ],
    });

    const errors = await validateRepository(root);
    expect(
      errors.some((error) => error.includes('depends on unknown skill "unknown-skill"')),
    ).toBe(true);
  });

  it("validates every skill in the repository catalog", async () => {
    const repositoryRoot = fileURLToPath(
      new URL("../../../", import.meta.url),
    );
    await expect(validateRepository(repositoryRoot)).resolves.toEqual([]);
  });
});
