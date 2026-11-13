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
- Expanded the eight core skills with original domain-specific playbooks and
  added a repeatable manual evaluation protocol.
- Added a Claude Code plugin manifest and same-repository marketplace entry
  exposing the core eight without duplicating their canonical skill files.
- Extended validation to check plugin/marketplace consistency, registered
  plugin skill paths, and local links from skills.

## Not implemented yet

- Skills are registered as drafts pending execution of evaluation cases,
  content review, and source/license review; none are marked published.
- The `craftlayer` CLI, GitHub downloader, and skill file installation,
  update, and removal do not exist yet.
- The Claude Code plugin has not yet been checked with
  `claude plugin validate` or installed from a marketplace; the Claude Code
  CLI is not available in the current environment.
- The eight core evaluation cases have not yet been run against an agent;
  all skills remain drafts.
- Themes, docs website, and release automation are not implemented.
- Agent paths were checked against official docs; runtime compatibility has
  not yet been tested in each agent. Package-name availability has not been
  checked.
- Reference and asset registries have not been researched or populated; no
  third-party assets are bundled.

## Validation

Validated with Node.js 24 and the repository's existing dependencies via
Corepack/pnpm 11.25.0:

- `corepack pnpm validate` — passed; all 35 registered skills and plugin
  paths validate.
- `corepack pnpm test` — passed, 20 tests across 3 files.
- `corepack pnpm test:javascript` — passed, 2 tests.
- `corepack pnpm test:python` — passed, 3 tests.
- `corepack pnpm typecheck` — passed.
- `git diff --check` — passed.

The local `pnpm` shim itself points back to the shim; invoking the pinned
version with `corepack pnpm` worked. Claude Code's native plugin validation
was not run because the `claude` CLI is unavailable.

## Next milestone

Run and document evaluations for the eight core skills, then use the
Claude Code CLI to validate and install the plugin from the marketplace.
After that, implement the selective installer and test it in fixture
projects for the documented agent targets.
