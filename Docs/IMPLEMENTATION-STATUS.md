# Implementation status

Last updated: 2026-11-11

## Completed

- Confirmed this repository is a new, minimal CraftLayer workspace.
- Adopted TypeScript, Node.js 22+, pnpm workspaces, Zod, gray-matter, and
  Vitest for the initial validation foundation.
- Added the versioned registry schema and repository validation command.
- Added tests for metadata, paths, unresolved references, and published-skill
  requirements.
- Added project overview, architecture, skill-authoring, licensing, and
  roadmap documentation.
- Added GitHub Actions CI for validation, tests, and type-checking.
- Authored and registered 35 skill drafts, including all 33 skill areas
  named in the master prompt and JavaScript/TypeScript and Python
  engineering guidance.
- Added catalog and repository-structure docs, shared quality rules,
  authoring templates, and manual evaluation cases for the initial eight
  skills.
- Verified documented skill destinations and implemented project/global
  path resolution for OpenCode, Claude Code, Codex, Cursor, and generic
  Agent Skills.
- Added executable JavaScript and Python examples with unit tests and CI
  checks for both runtimes.

## Not implemented yet

- Skills are registered as drafts pending execution of evaluation cases,
  content review, and source/license review; none are marked published.
- The `craftlayer` CLI, GitHub downloader, and skill file installation,
  update, and removal do not exist yet.
- Themes, docs website, and release automation are not implemented.
- Agent paths were checked against official docs; runtime compatibility has
  not yet been tested in each agent. Package-name availability has not been
  checked.
- Reference and asset registries have not been researched or populated; no
  third-party assets are bundled.

## Validation

Validated with pnpm 11.25.0, Node.js 24, and Python 3.12:

- `pnpm validate` — passed; all 35 registered skill directories validate.
- `pnpm test` — passed, 15 tests across 3 files.
- `pnpm test:javascript` — passed, 2 tests.
- `pnpm test:python` — passed, 3 tests.
- `pnpm typecheck` — passed.
- `git diff --check` — passed.

## Next milestone

Evaluate and review the initial eight core skills, then implement the
selective installer and theme engine. Test installation in fixture projects
for all five documented agent targets.
