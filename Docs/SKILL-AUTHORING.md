# Skill authoring guide

CraftLayer skills are reusable instructions for AI coding agents. A skill
must solve a bounded task and contain enough practical guidance to be useful
without relying on vague advice.

## Required file and metadata

Each skill lives at `skills/<skill-id>/SKILL.md`. Its directory name and
frontmatter `name` must match, using lowercase letters, digits, and hyphens.
Frontmatter requires a non-empty `description` of at most 1024 characters.

```yaml
---
name: example-skill
description: A concise explanation of the skill and when it is useful.
---
```

The registry record lives in `skills/registry.json` and includes:

- `id`, `name`, and `description`
- `category`, semantic `version`, and repository-relative `path`
- `tags`, supported `agents`, `dependencies`, and `relatedSkills`
- `status` (`draft` or `published`), `license`, and ISO `lastReviewed` date

Registry names and descriptions must match the skill's frontmatter. Paths
must be exactly `skills/<id>`.

## Content standard

Every registered `SKILL.md` must have these headings with non-empty,
task-specific content:

- `When to use`
- `When not to use`
- `Workflow`
- `Validation`

Write the content under these headings as specific directions, not as empty
section labels. Include relevant inputs and assumptions, a practical
workflow, decision criteria, examples or patterns, common failure modes,
and acceptance checks. Add supporting files only when they provide useful
detail; link to them from the skill. Do not copy large shared sections
between skills.

Skills should respect the user's existing project and avoid unapproved
destructive changes. State uncertainty and distinguish requirements from
preferences. Do not fabricate facts, references, metrics, or customer proof.

## Lifecycle and validation

New work may be registered as `draft`. Before publishing, verify references
and licensing, complete the skill content, review it against realistic
tasks, and run:

```sh
pnpm validate
pnpm test
pnpm typecheck
```

Only publish content that passes validation and substantive review. The
validator checks format and consistency; it does not certify that the
instructions are correct or useful.
