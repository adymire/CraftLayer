# Repository structure

The repository grows only when a directory has a current purpose. The
architecture in the master prompt is a target, not a requirement to add
empty folders or placeholder documents.

## Implemented

```text
.
├── .github/workflows/       CI validation, tests, and type-check
├── Docs/                    Project, authoring, licensing, and catalog docs
├── packages/
│   ├── agent-adapters/      Verified project/global destination resolution
│   └── validation/          Registry and SKILL.md validator with tests
├── skills/                  35 skill drafts and registry.json
├── evals/                   Manual evaluation cases
├── rules/                   Shared quality standards
├── templates/               Skill and project-audit templates
├── assets/                  Asset policy and registry
├── references/              Source policy and registry
├── CONTRIBUTING.md
├── LICENSE
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

JavaScript and TypeScript implement the repository tooling and the
JavaScript/TypeScript skill. Python is covered by a dedicated Python
engineering skill with Python examples and compatibility guidance; a Python
runtime package is not required for this TypeScript-first repository.

## Planned only

The CLI, GitHub installer, themes, automated evaluation runner, release
automation, and website are not implemented. Create their package or app
directories when implementing a concrete vertical slice, and add tests and
documentation with that work.

## Naming

The existing top-level `Docs/` directory is retained to preserve the
repository's supplied master prompt. New documentation remains there rather
than introducing a second competing docs tree.
