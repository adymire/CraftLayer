import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
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
  await mkdir(path.join(root, ".claude-plugin"), { recursive: true });
  await writeFile(
    path.join(root, "skills", "registry.json"),
    JSON.stringify(registry),
  );
  const skills =
    typeof registry === "object" &&
    registry !== null &&
    "skills" in registry &&
    Array.isArray(registry.skills)
      ? registry.skills.flatMap((skill: unknown) =>
          typeof skill === "object" &&
          skill !== null &&
          "id" in skill &&
          typeof skill.id === "string"
            ? [`./skills/${skill.id}`]
            : [],
        )
      : [];
  await writeFile(
    path.join(root, ".claude-plugin", "plugin.json"),
    JSON.stringify({
      name: "craftlayer",
      displayName: "CraftLayer",
      version: "0.1.0",
      description: "CraftLayer validation fixture.",
      author: { name: "CraftLayer test" },
      skills,
    }),
  );
  await writeFile(
    path.join(root, ".claude-plugin", "marketplace.json"),
    JSON.stringify({
      name: "craftlayer",
      owner: { name: "CraftLayer test" },
      plugins: [{ name: "craftlayer", source: "./" }],
    }),
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
      errors.some((error) =>
        error.includes('depends on unknown skill "unknown-skill"'),
      ),
    ).toBe(true);
  });

  it("reports plugin skills that are not in the registry", async () => {
    const root = await createRepository({ schemaVersion: 1, skills: [] });
    await writeFile(
      path.join(root, ".claude-plugin", "plugin.json"),
      JSON.stringify({
        name: "craftlayer",
        displayName: "CraftLayer",
        version: "0.1.0",
        description: "CraftLayer validation fixture.",
        author: { name: "CraftLayer test" },
        skills: ["./skills/not-registered"],
      }),
    );

    const errors = await validateRepository(root);
    expect(errors).toContain(
      '.claude-plugin/plugin.json: skill path "./skills/not-registered" is not registered',
    );
  });

  it("reports missing and escaping local skill references", async () => {
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
          status: "draft",
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
        "description: Plan interface work before implementation.",
        "---",
        "## When to use",
        "Plan a product interface.",
        "## When not to use",
        "Do not use for backend-only work.",
        "## Workflow",
        "Inspect then plan.",
        "## Validation",
        "Check the plan.",
        "[Missing guide](references/missing.md)",
        "[Outside file](../README.md)",
      ].join("\n"),
    );

    const errors = await validateRepository(root);
    expect(errors).toContain(
      'skills/design-intelligence/SKILL.md: local link target is missing: "references/missing.md"',
    );
    expect(errors).toContain(
      'skills/design-intelligence/SKILL.md: local link escapes the skill directory: "../README.md"',
    );
  });

  it("validates every skill in the repository catalog", async () => {
    const repositoryRoot = fileURLToPath(
      new URL("../../../", import.meta.url),
    );
    await expect(validateRepository(repositoryRoot)).resolves.toEqual([]);
  });

  it("keeps a guarded evaluation case for every Claude plugin skill", async () => {
    const repositoryRoot = fileURLToPath(
      new URL("../../../", import.meta.url),
    );
    const pluginManifest = JSON.parse(
      await readFile(
        path.join(repositoryRoot, ".claude-plugin", "plugin.json"),
        "utf8",
      ),
    ) as { skills: string[] };
    const evaluation = JSON.parse(
      await readFile(
        path.join(repositoryRoot, "evals", "design", "core-skills.json"),
        "utf8",
      ),
    ) as {
      cases: Array<{
        skill: string;
        expected: string[];
        mustNot: string[];
      }>;
    };

    expect(evaluation.cases.map(({ skill }) => skill)).toEqual(
      pluginManifest.skills.map((skillPath) =>
        skillPath.replace("./skills/", ""),
      ),
    );
    for (const testCase of evaluation.cases) {
      expect(testCase.expected.length).toBeGreaterThan(0);
      expect(testCase.mustNot.length).toBeGreaterThan(0);
    }
  });
});
