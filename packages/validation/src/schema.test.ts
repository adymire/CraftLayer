import { describe, expect, it } from "vitest";
import {
  skillFrontmatterSchema,
  skillRegistrySchema,
} from "./schema.js";

const validEntry = {
  id: "design-intelligence",
  name: "design-intelligence",
  description: "Plan interfaces around users, product needs, and constraints.",
  category: "design",
  version: "0.1.0",
  path: "skills/design-intelligence",
  tags: ["design", "planning"],
  agents: ["generic"],
  dependencies: [],
  relatedSkills: [],
  status: "draft",
  license: "MIT",
  lastReviewed: "2026-11-11",
};

describe("skill metadata schemas", () => {
  it("accepts valid Agent Skills frontmatter", () => {
    expect(
      skillFrontmatterSchema.safeParse({
        name: "design-intelligence",
        description: validEntry.description,
      }).success,
    ).toBe(true);
  });

  it("rejects invalid skill names and empty descriptions", () => {
    expect(
      skillFrontmatterSchema.safeParse({
        name: "../design",
        description: " ",
      }).success,
    ).toBe(false);
  });

  it("rejects skill names that exceed the Agent Skills limit", () => {
    expect(
      skillFrontmatterSchema.safeParse({
        name: `a${"b".repeat(64)}`,
        description: "Valid description.",
      }).success,
    ).toBe(false);
  });

  it("accepts an empty initial registry", () => {
    expect(
      skillRegistrySchema.safeParse({ schemaVersion: 1, skills: [] }).success,
    ).toBe(true);
  });

  it("rejects unsafe paths and duplicate skill IDs", () => {
    const result = skillRegistrySchema.safeParse({
      schemaVersion: 1,
      skills: [
        { ...validEntry, path: "skills/../outside" },
        { ...validEntry },
      ],
    });

    expect(result.success).toBe(false);
  });
});
