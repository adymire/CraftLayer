# Contributing to CraftLayer

Thank you for helping make CraftLayer more useful, trustworthy, and
practical for developers and the agents they work with. Contributions can
improve skills, examples, validation, documentation, compatibility research,
or implementation tooling.

Please read the [Community Standards](CODE_OF_CONDUCT.md) before
participating in issues or pull requests.

## What makes a good contribution

- It solves a clear user or maintainer problem.
- It follows the repository's existing conventions and keeps scope focused.
- It gives agents actionable steps, decision criteria, and ways to verify
  their work—not generic advice or empty headings.
- It preserves project files, functioning behavior, and user decisions.
- It distinguishes verified facts from assumptions and planned work.
- It verifies third-party references and licenses instead of copying
  material without permission.

## Before you start

1. Read the [README](README.md) to understand current capabilities and
   limitations.
2. Check the [roadmap](Docs/ROADMAP.md), [implementation status](Docs/IMPLEMENTATION-STATUS.md),
   and existing skill catalog for overlapping work.
3. Use the [issue forms](https://github.com/adymire/CraftLayer/issues/new/choose)
   to report a bug or propose a skill.
4. For a substantial feature, open or find an issue first so the expected
   behavior can be discussed before implementation.
5. Do not start work that requires publishing, external accounts, or
   destructive actions without maintainer approval.

## Set up the repository

Requirements:

- Node.js 22+
- pnpm 11 (the repository pins pnpm 11.25.0)
- Python 3.12 for the Python example tests

```sh
git clone https://github.com/adymire/CraftLayer.git
cd CraftLayer
pnpm install
```

Create a feature branch before making changes:

```sh
git switch -c docs/describe-your-change
```

Use an appropriate branch prefix such as `docs/`, `skills/`, `fix/`, or
`feat/`.

## Working on a skill

1. Choose a bounded task and inspect neighboring skills to avoid
   duplication.
2. Author `skills/<skill-id>/SKILL.md` using the
   [skill authoring guide](Docs/SKILL-AUTHORING.md).
3. Keep the directory name, frontmatter `name`, and registry `id` aligned.
4. Add or update the registry entry in `skills/registry.json`. Keep its
   name and description in sync with the frontmatter.
5. Add supporting references, examples, or checklists only when they help
   with real use; link to them from the skill.
6. Add a realistic evaluation case under the relevant `evals/` area for
   meaningful skill behavior. Evaluation cases are review prompts, not
   benchmark claims.
7. Leave a skill in `draft` until its content, evaluation, sources, and
   license have been reviewed.

Do not mark a skill `published` just because the validator passes. The
validator checks structure and consistency, not factual correctness,
originality, usefulness, or model performance.

## Working on TypeScript, JavaScript, or Python

- Match the project's TypeScript/Node.js conventions and strict type checks.
- Keep JavaScript examples compatible with the supported Node.js version.
- Keep Python examples compatible with the declared tested Python version;
  avoid assuming an undeclared package or interpreter.
- Add tests for successful behavior and meaningful invalid-input or failure
  cases.
- Do not add a runtime dependency when a small, well-tested standard-library
  solution is sufficient.
- Avoid unsafe casts, broad exception swallowing, and success-shaped
  fallbacks.

## Documentation and references

- Keep the README and docs accurate to current behavior; mark unfinished
  work as planned.
- Use relative links for repository documentation.
- Verify official agent conventions against official sources and update
  [Agent Compatibility](Docs/AGENT-COMPATIBILITY.md) with a review date.
- For third-party code, text, examples, or assets, check the exact license
  and preserve required notices. Read the
  [Licensing Policy](Docs/LICENSING.md).
- Do not add fabricated usage figures, benchmark results, customer marks,
  product screenshots, or endorsements.

## Run checks

Run the relevant checks from the repository root:

```sh
pnpm validate
pnpm test
pnpm test:javascript
pnpm test:python
pnpm typecheck
```

For documentation-only changes, checks are optional unless the change
updates a command, link, path, format, or other behavior claim. Report
which checks you ran and any that you could not run.

Python tests require Python 3.12. On Windows, the test launcher locates it
through the `py` launcher; set `PYTHON_EXECUTABLE` if the interpreter is
installed outside the launcher registry.

## Pull request checklist

Before submitting, confirm:

- [ ] The change solves a stated problem and stays within scope.
- [ ] Existing work and unrelated user files are untouched.
- [ ] Skill metadata, registry entries, and files agree.
- [ ] New advice has practical examples, edge cases, and acceptance checks.
- [ ] Third-party references and licenses have been verified.
- [ ] Relevant validation, tests, and type-checks pass.
- [ ] Documentation describes only implemented behavior.
- [ ] The PR summary lists the change, validation commands, and known
      limitations.

Keep pull requests reviewable. If a change affects user behavior,
installation paths, security, or published skill contracts, explain the
trade-offs and migration implications.
Use the [pull request template](.github/PULL_REQUEST_TEMPLATE.md) to report
scope, validation, and limitations.

## Review and release

Maintainers may request revisions to improve correctness, safety,
accessibility, clarity, licensing, or fit with the product scope. Do not
publish packages, create external resources, or make destructive repository
changes as part of a contribution without explicit approval.

CraftLayer follows semantic versioning for future releases. The release
process is still planned; see the [roadmap](Docs/ROADMAP.md). No CLI
installation or plugin-publishing workflow is currently available.

## License

By submitting a contribution, you agree that your original contribution
will be distributed under the repository's [MIT License](LICENSE). You are
responsible for identifying third-party material and confirming that it may
be included.
