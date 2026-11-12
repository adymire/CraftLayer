import os from "node:os";
import path from "node:path";

export const agentAdapters = {
  opencode: {
    id: "opencode",
    displayName: "OpenCode",
    projectPath: ".opencode/skills",
    globalPath: ".config/opencode/skills",
  },
  "claude-code": {
    id: "claude-code",
    displayName: "Claude Code",
    projectPath: ".claude/skills",
    globalPath: ".claude/skills",
  },
  codex: {
    id: "codex",
    displayName: "OpenAI Codex",
    projectPath: ".agents/skills",
    globalPath: ".agents/skills",
  },
  cursor: {
    id: "cursor",
    displayName: "Cursor",
    projectPath: ".cursor/skills",
    globalPath: ".cursor/skills",
  },
  generic: {
    id: "generic",
    displayName: "Generic Agent Skills",
    projectPath: ".agents/skills",
    globalPath: ".agents/skills",
  },
} as const;

export type AgentId = keyof typeof agentAdapters;
export type InstallScope = "project" | "global";

export interface ResolveDestinationOptions {
  agent: AgentId;
  scope: InstallScope;
  projectDirectory: string;
  homeDirectory?: string;
  destinationOverride?: string;
}

export function resolveSkillRoot(
  options: ResolveDestinationOptions,
): string {
  const projectDirectory = path.resolve(options.projectDirectory);
  const homeDirectory = path.resolve(options.homeDirectory ?? os.homedir());

  if (options.destinationOverride !== undefined) {
    return path.resolve(projectDirectory, options.destinationOverride);
  }

  const adapter = agentAdapters[options.agent];
  const relativePath =
    options.scope === "project" ? adapter.projectPath : adapter.globalPath;
  const baseDirectory =
    options.scope === "project" ? projectDirectory : homeDirectory;

  return path.resolve(baseDirectory, relativePath);
}

export function resolveSkillDestination(
  options: ResolveDestinationOptions,
  skillId: string,
): string {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skillId)) {
    throw new Error(`Invalid skill id: ${skillId}`);
  }

  const skillRoot = resolveSkillRoot(options);
  const destination = path.resolve(skillRoot, skillId);
  const relativePath = path.relative(skillRoot, destination);
  if (
    relativePath === "" ||
    relativePath === ".." ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error(`Skill destination escapes its root: ${skillId}`);
  }
  return destination;
}
