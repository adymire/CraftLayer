# Agent compatibility

Reviewed against official documentation on 2026-11-11. These paths describe
skill discovery; the installer must still be tested against real agent
versions before a release claims compatibility.

| Target | Project path | User path | Official documentation |
|---|---|---|---|
| OpenCode | `.opencode/skills/` | `~/.config/opencode/skills/` | [OpenCode skills](https://opencode.ai/docs/skills/) |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` | [Claude Code skills](https://code.claude.com/docs/en/skills) |
| OpenAI Codex | `.agents/skills/` | `~/.agents/skills/` | [Codex skills](https://developers.openai.com/codex/skills) |
| Cursor | `.cursor/skills/` | `~/.cursor/skills/` | [Cursor skills](https://cursor.com/docs/skills) |
| Generic Agent Skills | `.agents/skills/` | `~/.agents/skills/` | [Agent Skills specification](https://agentskills.io/specification) |

OpenCode, Codex, Cursor, Claude Code, and the Agent Skills specification
support a directory containing `SKILL.md` with `name` and `description`
frontmatter. Their optional metadata and discovery behavior can differ. The
canonical CraftLayer content stays neutral; do not emit agent-specific
fields unless a verified target requires them.

Cursor also discovers compatible skills from `.agents/skills/`, `.claude`,
and `.codex` paths; OpenCode also discovers compatibility directories.
CraftLayer uses each product's dedicated project path by default, except
Codex, which uses the generic `.agents/skills/` path documented for Codex.
The generic target also uses `.agents/skills/`.

The current adapter package resolves project and user destinations. It does
not yet install, overwrite, update, or remove files. Explicit destination
overrides are resolved from the provided project directory when relative.
Before a future installer writes, it must inspect existing files and
symlinks, stage downloads, and apply the documented overwrite policy.
