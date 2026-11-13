# Roadmap

CraftLayer is delivered in usable, verifiable increments. A roadmap item is
not an implemented feature until it is present, tested, and documented.

## Foundation — complete

- [x] Define a versioned skill registry schema.
- [x] Validate skill metadata and registry consistency.
- [x] Add test and type-check commands.
- [x] Add continuous integration and baseline tests/type checks.
- [x] Document contribution and licensing policies.
- [x] Document the current repository structure and skill catalog.
- [x] Add Claude Code plugin and same-repository marketplace manifests for
  the initial eight core skills; validate their structure and paths.
- [ ] Define release and versioning policies.

## Skills catalog — authored; evaluation in progress

The first eight core skills and all skill areas listed in the master prompt
have draft content and registry entries. The initial eight now include
domain-specific playbooks and supporting checklists. JavaScript/TypeScript
and Python engineering guides are included as requested. Next, run the
human evaluation protocol in `Docs/SKILL-EVALUATION.md` against the cases in
`evals/` and revise based on evidence before marking skills as published.

1. Design Intelligence
2. Unslop Engine
3. Design Systems
4. Premium Landing Pages
5. Frontend Engineering
6. Dashboard Design
7. Backend Architecture
8. Animation and Motion

## Installer and agent compatibility — planned

- [x] Verify documented project and user skill paths for the five requested
  targets.
- [x] Implement tested destination resolution for the agent adapters.
- [x] Add native Claude Code plugin packaging for the eight core skills.
- [ ] Run Claude Code's native plugin validation and install it from a
  marketplace; test discovery and namespaced invocation.
- Build a selective GitHub installer and `craftlayer` CLI.
- Add safe staging, path validation, pinned versions, and overwrite controls.
- Test file installation and project/global scopes in fixture projects.

## Themes, catalog expansion, and release readiness — planned

- Add complete themes and expand skill families based on user needs.
- Maintain source and asset attribution metadata.
- Add installer security tests, usability evaluation, and release automation.
- Release only features that meet their documented acceptance criteria.
