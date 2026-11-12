# CraftLayer architecture

## Current foundation

CraftLayer is a pnpm TypeScript workspace. The first package,
`@craftlayer/validation`, defines the skill metadata and registry schemas and
validates the repository's `skills/` content. `skills/registry.json` is the
source of truth for catalog metadata.

The registry currently contains 35 draft skills. Each skill lives in its
own directory with a complete `SKILL.md`. A registry entry cannot safely
cause a file write: the future installer must separately validate remote
paths, fetch only selected content, stage it, and protect existing files.

## Intended product boundaries

- **Canonical skills:** agent-neutral Markdown, with small adapter metadata
  transformations only when an agent requires them.
- **Registry:** versioned catalog metadata, dependencies, related skills,
  lifecycle status, license, and review date.
- **CLI and installer (planned):** selection, fetching, safe staging, and
  installation into verified agent destinations.
- **Agent adapters:** path resolution for project/global skill destinations
  based on official agent documentation; actual install/update/remove
  operations are not yet implemented.
- **Quality checks:** mechanical validation plus human review for design and
  usability, which cannot be fully automated.
- **Language guidance:** TypeScript implements repository tooling;
  JavaScript/TypeScript and Python each have a dedicated engineering skill.

## Current technology decisions

- TypeScript and Node.js 22+
- pnpm workspaces
- Zod for metadata validation
- gray-matter for Markdown frontmatter
- Vitest for tests
- GitHub Actions for continuous integration

No database, telemetry, docs website, or project-source collection is part
of the initial scope.

## Planned boundaries

The CLI, GitHub downloader, and theme engine have not been implemented.
Agent adapters currently resolve destinations but do not write files.
Skill drafts have not yet passed representative human evaluation. Their
requirements and sequence are tracked in the
[roadmap](ROADMAP.md). Agent-specific paths and metadata conventions must be
checked against current official documentation before support is claimed.
