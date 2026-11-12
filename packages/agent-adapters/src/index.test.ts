import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  agentAdapters,
  resolveSkillDestination,
  resolveSkillRoot,
} from "./index.js";

const projectDirectory = path.resolve("fixture-project");
const homeDirectory = path.resolve("fixture-home");

describe("agent adapter destinations", () => {
  it("defines project and user locations for all requested targets", () => {
    expect(Object.keys(agentAdapters)).toEqual([
      "opencode",
      "claude-code",
      "codex",
      "cursor",
      "generic",
    ]);

    expect(
      resolveSkillRoot({
        agent: "opencode",
        scope: "project",
        projectDirectory,
        homeDirectory,
      }),
    ).toBe(path.join(projectDirectory, ".opencode", "skills"));
    expect(
      resolveSkillRoot({
        agent: "claude-code",
        scope: "global",
        projectDirectory,
        homeDirectory,
      }),
    ).toBe(path.join(homeDirectory, ".claude", "skills"));
    expect(
      resolveSkillRoot({
        agent: "codex",
        scope: "project",
        projectDirectory,
        homeDirectory,
      }),
    ).toBe(path.join(projectDirectory, ".agents", "skills"));
    expect(
      resolveSkillRoot({
        agent: "cursor",
        scope: "global",
        projectDirectory,
        homeDirectory,
      }),
    ).toBe(path.join(homeDirectory, ".cursor", "skills"));
  });

  it("resolves explicit destinations relative to the project", () => {
    expect(
      resolveSkillRoot({
        agent: "generic",
        scope: "global",
        projectDirectory,
        homeDirectory,
        destinationOverride: "custom/skills",
      }),
    ).toBe(path.join(projectDirectory, "custom", "skills"));
  });

  it("resolves absolute overrides without rewriting them", () => {
    const destinationOverride = path.resolve("outside-destination");
    expect(
      resolveSkillRoot({
        agent: "generic",
        scope: "project",
        projectDirectory,
        destinationOverride,
      }),
    ).toBe(destinationOverride);
  });

  it("rejects invalid skill IDs before constructing a path", () => {
    const options = {
      agent: "generic" as const,
      scope: "project" as const,
      projectDirectory,
      homeDirectory,
    };

    expect(resolveSkillDestination(options, "design-intelligence")).toBe(
      path.join(projectDirectory, ".agents", "skills", "design-intelligence"),
    );
    expect(() => resolveSkillDestination(options, "../outside")).toThrow(
      "Invalid skill id",
    );
    expect(() => resolveSkillDestination(options, "Uppercase")).toThrow(
      "Invalid skill id",
    );
  });
});
