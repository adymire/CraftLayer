# CraftLayer --- Master Build Prompt

> **Project:** CraftLayer\
> **Repository:** `craftlayer-skills`\
> **Core engine:** Unslop Engine\
> **CLI:** `craftlayer`\
> **Tagline:** *Build with taste. Engineer with precision.*\
> **Category:** Open-source AI Design & Engineering Intelligence Toolkit

------------------------------------------------------------------------

## 1. Mission

Build **CraftLayer**, a high-quality, open-source repository of reusable
AI-agent skills that can be selectively installed into an existing
software project directly from GitHub.

CraftLayer should help AI coding agents produce polished,
production-minded digital products: premium websites, landing pages,
SaaS applications, dashboards, AI chat interfaces, admin panels, backend
systems, APIs, databases, authentication, animations, and complete
design systems.

The repository must work as a practical toolkit, not as a collection of
vague advice or empty folders. Every published skill must contain
actionable instructions, clear activation triggers, implementation
workflows, examples, quality checks, and relevant references.

The central principles are:

1.  **Design quality is intentional.** Do not default to generic
    AI-generated layouts.
2.  **Engineering quality is non-negotiable.** Recommendations must be
    technically sound, maintainable, accessible, and secure.
3.  **Selective installation is essential.** Users must be able to
    install only the skills they need without cloning the complete
    repository.
4.  **Agent compatibility matters.** Support OpenCode, Claude Code,
    Codex, Cursor, and other compatible agent environments through
    adapters where their conventions differ.
5.  **No fake completeness.** Do not create empty skills, placeholder
    documentation, fabricated references, or untested commands.
6.  **Respect the user's existing project.** Installation and skill
    execution must preserve existing code, configuration, and design
    decisions unless the user explicitly requests changes.

## 2. Product definition

CraftLayer has four connected layers:

-   **Skills:** Markdown-based expertise and workflows that AI agents
    can read and apply.
-   **Installer and CLI:** Selectively fetches and installs chosen
    skills from GitHub.
-   **Design intelligence:** Helps agents make deliberate visual, UX,
    and architecture decisions.
-   **Quality system:** Audits outputs for generic design, weak UX,
    implementation defects, accessibility, and maintainability.

CraftLayer is not intended to replace React, Next.js, Tailwind,
shadcn/ui, component libraries, or an agent's coding ability. It
provides structured expertise and repeatable quality standards that
guide those tools.

## 3. Repository identity and naming

Use these names consistently unless a real availability or trademark
conflict is discovered:

-   Project name: **CraftLayer**
-   GitHub repository: **craftlayer-skills**
-   CLI command: **craftlayer**
-   Design-quality subsystem: **Unslop Engine**
-   Tagline: **Build with taste. Engineer with precision.**

Before publishing, check GitHub repository-name availability, npm
package-name availability, and relevant trademark conflicts. Do not
claim that a name or domain is available without verification.

## 4. Core user journey

The intended workflow is:

1.  A developer opens an existing project in an AI coding agent.
2.  They install CraftLayer or use its CLI.
3.  They list available skills and select only the relevant ones.
4.  The installer downloads the selected skill directories from a pinned
    GitHub revision.
5.  Skills are placed in the correct agent-specific directory.
6.  The coding agent reads the installed skills when their activation
    conditions match the task.
7.  The agent follows the skill's workflow, references, examples, and
    acceptance checks.
8.  The agent audits the result and reports what it changed and what
    remains unresolved.

Example commands:

``` bash
npx craftlayer list
npx craftlayer add design-intelligence
npx craftlayer add design-intelligence unslop-engine dashboard-design
npx craftlayer add --category frontend-engineering
npx craftlayer add --all
npx craftlayer themes
npx craftlayer theme add dark
npx craftlayer update
npx craftlayer doctor
npx craftlayer remove design-intelligence
npx craftlayer info
```

Do not advertise a command until it is implemented and tested. If the
package is not yet published, document the correct development
invocation separately.

## 5. Selective GitHub installation --- critical requirement

Users must not need to clone the full CraftLayer repository to install
one skill.

Implement a selective downloader using GitHub's supported APIs:

-   Use the Git Trees API to discover files beneath a selected skill
    directory.
-   Use the Contents API or raw file endpoints to retrieve only the
    selected files.
-   Preserve relative paths and directory structure.
-   Support a pinned commit SHA or release tag for reproducible
    installs.
-   Support a configurable repository owner, repository name, ref, and
    destination.
-   Cache metadata where appropriate, with safe invalidation.
-   Handle public repository rate limits and optional authenticated
    requests.
-   Never expose or print a GitHub token.
-   Validate every remote path and reject path traversal.
-   Download into a temporary directory, validate the result, then
    install atomically.
-   Do not execute downloaded scripts during installation.
-   Detect existing files and ask before overwriting; provide a safe
    non-interactive policy.
-   Provide useful errors for missing skills, unavailable refs, API
    limits, network failures, and partial downloads.
-   Record the installed version or commit so `update` can determine
    what changed.
-   Provide a dry-run mode if practical.

The installer must never delete or rewrite unrelated project files. It
must not silently replace existing agent configuration.

## 6. Supported agent targets

Design an adapter layer so agent-specific paths and conventions are not
hardcoded throughout the installer.

Investigate and implement the correct current conventions for:

-   OpenCode
-   Claude Code
-   OpenAI Codex
-   Cursor
-   Generic Agent Skills-compatible tools

Candidate project-level destinations to verify include:

``` text
.agents/skills/
.claude/skills/
.opencode/skills/
.cursor/skills/
```

Do not assume these paths are universally correct. Verify each target's
current official documentation and skill-discovery behavior before
implementation.

Support, where feasible:

-   Project-level installation
-   User/global installation
-   Explicit destination override
-   `--agent` selection
-   `--scope project|global`
-   A generic output mode

An adapter should define its identifier, display name, supported skill
format, project path, global path, and any required metadata
transformation. Keep the canonical skill content agent-neutral wherever
possible.

## 7. Repository architecture

Start with a maintainable structure. Adapt it when implementation
evidence justifies a change; do not create folders merely to make the
tree look comprehensive.

``` text
craftlayer-skills/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── CHANGELOG.md
├── AGENTS.md
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── .gitignore
├── .npmrc
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       ├── ci.yml
│       ├── validate-skills.yml
│       └── release.yml
│
├── apps/
│   ├── cli/
│   │   ├── package.json
│   │   └── src/
│   │       ├── commands/
│   │       ├── prompts/
│   │       ├── output/
│   │       └── index.ts
│   └── docs-site/
│       └── README.md
│
├── packages/
│   ├── core/
│   ├── github-installer/
│   ├── registry/
│   ├── agent-adapters/
│   ├── theme-engine/
│   ├── asset-registry/
│   ├── validator/
│   └── evaluator/
│
├── skills/
│   ├── design-intelligence/
│   ├── unslop-engine/
│   ├── design-systems/
│   ├── visual-design/
│   ├── ux-research/
│   ├── premium-landing-pages/
│   ├── website-architecture/
│   ├── frontend-engineering/
│   ├── responsive-design/
│   ├── dashboard-design/
│   ├── saas-dashboard/
│   ├── admin-panel/
│   ├── super-admin-panel/
│   ├── ai-dashboard/
│   ├── ai-chat-interface/
│   ├── ai-agent-interface/
│   ├── analytics-and-data-visualization/
│   ├── component-engineering/
│   ├── animation-and-motion/
│   ├── image-art-direction/
│   ├── iconography/
│   ├── backend-architecture/
│   ├── api-engineering/
│   ├── database-engineering/
│   ├── authentication-and-rbac/
│   ├── security-engineering/
│   ├── ai-engineering/
│   ├── rag-and-knowledge-systems/
│   ├── integrations-and-webhooks/
│   ├── testing-and-quality/
│   ├── accessibility/
│   ├── performance-optimization/
│   └── visual-regression/
│
├── themes/
│   ├── neutral/
│   ├── editorial/
│   ├── luxury/
│   ├── enterprise/
│   ├── minimal/
│   ├── monochrome/
│   ├── futuristic/
│   ├── creative-studio/
│   ├── fintech/
│   ├── ai-native/
│   ├── developer-tools/
│   ├── dashboard/
│   └── dark/
│
├── assets/
│   ├── images/
│   ├── illustrations/
│   ├── icons/
│   ├── logos/
│   ├── animations/
│   ├── textures/
│   ├── patterns/
│   ├── screenshots/
│   ├── previews/
│   └── licenses/
│
├── references/
│   ├── sources/
│   ├── design-systems/
│   ├── component-libraries/
│   ├── motion/
│   ├── ai-products/
│   ├── dashboards/
│   ├── backend/
│   └── source-registry.json
│
├── templates/
│   ├── skill-template/
│   ├── theme-template/
│   └── project-audit-template/
│
├── rules/
│   ├── global-quality.md
│   ├── design-quality.md
│   ├── engineering-quality.md
│   ├── security-quality.md
│   └── contribution-quality.md
│
├── evals/
│   ├── design/
│   ├── frontend/
│   ├── dashboard/
│   ├── backend/
│   └── fixtures/
│
├── docs/
│   ├── VISION.md
│   ├── ROADMAP.md
│   ├── ARCHITECTURE.md
│   ├── REPOSITORY-STRUCTURE.md
│   ├── SKILL-SYSTEM.md
│   ├── SKILL-AUTHORING.md
│   ├── DESIGN-INTELLIGENCE.md
│   ├── UNSLOP-ENGINE.md
│   ├── DESIGN-SYSTEM-ENGINE.md
│   ├── THEME-ENGINE.md
│   ├── ASSET-REGISTRY.md
│   ├── SOURCE-REFERENCES.md
│   ├── FRONTEND-ENGINEERING.md
│   ├── BACKEND-ARCHITECTURE.md
│   ├── DASHBOARD-SYSTEM.md
│   ├── AI-INTERFACES.md
│   ├── ANIMATION-SYSTEM.md
│   ├── INSTALLATION.md
│   ├── AGENT-COMPATIBILITY.md
│   ├── CLI-REFERENCE.md
│   ├── GITHUB-INSTALLER.md
│   ├── SECURITY.md
│   ├── LICENSING.md
│   ├── CONTRIBUTING.md
│   ├── TESTING.md
│   ├── EVALUATION.md
│   ├── VERSIONING-AND-RELEASES.md
│   ├── FAQ.md
│   └── adr/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── fixtures/
│   └── security/
│
└── scripts/
    ├── validate-repository.ts
    ├── validate-skills.ts
    └── build-registry.ts
```

**Structure rule:** The tree is a target architecture, not permission to
create empty files. Implement only directories and files that have a
defined purpose in the current phase. Keep the repository easy to
navigate.

## 8. Skill format and authoring standard

Every published skill must have a complete `SKILL.md`. A recommended
skill directory:

``` text
skill-name/
├── SKILL.md
├── README.md
├── references/
│   ├── principles.md
│   └── implementation-guide.md
├── examples/
│   └── example.md
├── checklists/
│   └── quality-checklist.md
├── assets/
└── scripts/
```

Only include subdirectories that the skill actually needs.

Each `SKILL.md` should contain:

1.  Valid metadata/frontmatter compatible with the chosen Agent Skills
    convention.
2.  Skill name and concise description.
3.  Activation triggers: when the agent should use it.
4.  Non-triggers: when it should not be activated.
5.  Required inputs and assumptions.
6.  A step-by-step workflow.
7.  Decision rules and implementation standards.
8.  Practical examples or patterns.
9.  Common failure modes.
10. Validation and acceptance criteria.
11. References to supporting files.
12. Safety and project-preservation rules where relevant.

Use progressive disclosure: keep the main skill file focused and move
detailed material into referenced documents. Do not duplicate large
sections across skills. Cross-link related skills and declare
dependencies where necessary.

Create a skill registry with fields such as:

-   `id`
-   `name`
-   `description`
-   `category`
-   `version`
-   `path`
-   `tags`
-   `agents`
-   `dependencies`
-   `relatedSkills`
-   `status`
-   `license`
-   `lastReviewed`

Validate the registry against a schema. Do not include a skill in the
public registry until its files pass validation.

## 9. Design Intelligence system

The Design Intelligence skill should guide an agent through a deliberate
design process before implementation.

### Required workflow

1.  Understand the product, business model, target audience, user
    intent, and primary conversion or task.
2.  Identify the interface type: marketing website, SaaS product,
    dashboard, admin panel, AI workspace, developer tool, or other.
3.  Inspect the existing project, stack, routes, components, tokens, and
    constraints.
4.  Choose a coherent visual direction based on the product---not on
    random aesthetic trends.
5.  Define typography, color, spacing, grid, layout, surfaces, borders,
    shadows, iconography, and motion.
6.  Map the main user journeys and important interaction states.
7.  Define reusable components and responsive behavior.
8.  Implement the interface using the existing stack and conventions.
9.  Review the result at realistic viewport sizes.
10. Run an accessibility, usability, and visual-quality audit.
11. Fix the highest-impact defects and report remaining trade-offs.

### Design decision principles

-   Use a clear visual hierarchy and intentional composition.
-   Typography must have a defined role hierarchy and readable line
    lengths.
-   Color must support brand, hierarchy, state, and accessibility.
-   Spacing must follow a coherent system.
-   Components must behave consistently across the product.
-   Every important interaction needs relevant states: default, hover,
    focus, active, disabled, loading, empty, error, and success as
    applicable.
-   Responsive design must be planned, not added as a last-minute CSS
    patch.
-   Use real content and realistic data structures in examples.
-   Avoid visual decoration that does not support meaning or usability.

Do not force one design style on every product. A fintech platform,
editorial website, developer tool, healthcare application, and creative
studio should not look identical.

## 10. Unslop Engine --- anti-generic design quality

Build Unslop Engine as a practical quality framework with three modes:

-   **Create Mode:** Generate a deliberate visual direction and
    implementation plan.
-   **Audit Mode:** Inspect an existing interface and identify quality
    issues.
-   **Unslop Mode:** Improve a generic or weak interface while
    preserving its intended functionality and brand constraints.

### Common patterns to challenge

The engine should flag these when they are unmotivated or overused:

-   Default blue-to-purple gradients.
-   Generic centered hero sections with predictable copy and buttons.
-   Repeated three-card feature sections used without a content reason.
-   Excessive glassmorphism, blur, glow, and gradient decoration.
-   Random font combinations or oversized typography without hierarchy.
-   Emoji used as production interface icons.
-   Fake charts, fake metrics, fabricated testimonials, and invented
    customer logos.
-   Dashboards that look identical regardless of domain.
-   Decorative animations that slow down the interface.
-   Inconsistent radii, spacing, shadows, and component states.
-   Large empty areas that do not improve focus or comprehension.
-   Generic stock imagery that does not support the product story.

These are quality signals, not absolute prohibitions. A gradient, card
grid, glass surface, or centered hero can be appropriate when the
product's brand and user needs justify it.

### Audit output

Every audit should report:

-   Finding and affected page/component.
-   Severity: critical, high, medium, or low.
-   Why it harms usability, clarity, trust, or visual quality.
-   Recommended correction.
-   Whether the issue is objective or subjective.
-   Relevant acceptance check.

Never change a working product flow merely to make a screenshot look
attractive. Preserve functionality, accessibility, responsive behavior,
and brand constraints.

## 11. Design System Engine

Provide a repeatable system for defining and implementing:

-   Color tokens and semantic colors.
-   Typography scale, weights, and line heights.
-   Spacing scale.
-   Layout grids and container widths.
-   Breakpoints.
-   Radius, border, shadow, and elevation tokens.
-   Icon sizes and stroke conventions.
-   Motion durations and easing.
-   Component variants and states.
-   Focus visibility and accessible contrast.

Support integration with common stacks such as CSS variables, Tailwind
CSS, shadcn/ui, React, Next.js, and other project-specific systems. Do
not force a stack when the project already has a suitable one.

A design system must include usage rules and examples, not only a list
of hex codes.

## 12. Theme Engine

Each theme should be independently installable and should define:

``` text
theme-name/
├── README.md
├── theme.json
├── tokens.css
├── typography.json
├── components.md
├── usage.md
└── preview/
```

A theme should specify:

-   Design intent and suitable product types.
-   Color tokens, including semantic states.
-   Typography choices and fallback stacks.
-   Spacing, radius, borders, and elevation.
-   Component guidance.
-   Accessibility considerations.
-   Light/dark behavior where applicable.
-   Preview examples.

Initial theme directions:

-   Neutral
-   Editorial
-   Luxury
-   Enterprise
-   Minimal
-   Monochrome
-   Futuristic
-   Creative Studio
-   Fintech
-   AI-native
-   Developer Tools
-   Dashboard
-   Dark

Themes are optional starting points, not automatic global overrides.
Never replace an existing project's design system without explicit user
approval.

## 13. Landing page and website skills

The landing-page skill should help agents create pages based on
positioning, audience, offer, and conversion intent.

Cover:

-   Product positioning and value proposition.
-   Hero messaging and CTA hierarchy.
-   Navigation and information architecture.
-   Problem, solution, benefits, and feature explanation.
-   Product screenshots and demonstrations.
-   Use cases and industry pages.
-   Social proof only when verified.
-   Pricing and plan comparison.
-   FAQs and objection handling.
-   Lead forms and contact flows.
-   Footer, legal links, and trust information.
-   SEO metadata and semantic structure.
-   Responsive behavior and performance.

Do not force every page into the same section sequence. Choose sections
according to the user's intent and the product's sales process.

## 14. Dashboard, SaaS, admin, and super-admin skills

Create specialized guidance for distinct dashboard types:

-   SaaS product dashboard.
-   User and client dashboard.
-   Analytics dashboard.
-   Finance dashboard.
-   CRM dashboard.
-   Project-management dashboard.
-   E-commerce dashboard.
-   Marketing dashboard.
-   Enterprise operations dashboard.
-   Admin panel.
-   Super-admin panel.
-   Organization admin.
-   Role and permission management.
-   Billing and subscription management.
-   Audit logs and activity history.
-   API keys and integration management.
-   Notification and system settings.

Each skill should cover information architecture, navigation, density,
table behavior, filters, search, sorting, pagination, charts, empty
states, loading states, error states, permissions, responsive behavior,
and accessibility.

Admin and super-admin experiences must emphasize operational clarity,
safe destructive actions, permissions, traceability, and auditability.
Do not expose privileged controls to ordinary users.

## 15. AI product interface skills

Cover the interface patterns needed for modern AI applications:

-   AI chat interfaces.
-   AI agent dashboards.
-   Agent builder and configuration.
-   Workflow and automation builders.
-   Model and provider management.
-   Token and cost analytics.
-   Prompt management and versioning.
-   Tool-call visibility.
-   RAG and knowledge-base management.
-   File ingestion and retrieval status.
-   Vector search configuration.
-   Playground and testing.
-   Evaluation and feedback.
-   Monitoring and traces.
-   Multi-agent orchestration.
-   Human approval and intervention.

Make AI behavior understandable. Show relevant progress, source
references, tool activity, errors, cancellation, retry, and user
control. Do not imply that an operation succeeded when it is still
running or failed.

## 16. Frontend engineering skills

Provide practical standards for:

-   Project and feature architecture.
-   Component composition.
-   Routing and navigation.
-   State management.
-   Forms and validation.
-   API integration.
-   Data fetching and caching.
-   Error boundaries and error handling.
-   Responsive implementation.
-   Accessibility.
-   Performance and bundle size.
-   Reusable component contracts.
-   Testing and maintainability.

Respect the project's existing framework, package manager, naming
conventions, lint rules, and architectural patterns. Inspect before
changing.

## 17. Backend and platform engineering skills

Cover:

-   Backend architecture and service boundaries.
-   API design and versioning.
-   Database schema and migrations.
-   Authentication and authorization.
-   RBAC and permission modeling.
-   Multi-tenancy and organization isolation.
-   Validation and error contracts.
-   File storage and uploads.
-   Webhooks and third-party integrations.
-   Background jobs and queues.
-   Caching and rate limiting.
-   Logging, monitoring, and observability.
-   Secrets and environment configuration.
-   Backup, recovery, and data retention.
-   Security reviews and threat modeling.
-   Automated tests and deployment readiness.

Do not prescribe a database, framework, or infrastructure without
considering project requirements. Avoid destructive migrations and data
changes without explicit approval and a recovery plan.

## 18. Animation and motion system

Support appropriate use of:

-   CSS transitions and keyframes.
-   Motion / Framer Motion.
-   Lottie and dotLottie.
-   Rive.
-   SVG animation.
-   WebGL and Three.js where justified.
-   Scroll-based animation.
-   Page transitions.
-   Microinteractions.
-   Loading and progress feedback.

Motion must communicate state, hierarchy, continuity, or feedback. It
should not obstruct tasks or reduce performance. Respect
`prefers-reduced-motion`, keyboard interaction, touch behavior, and
device constraints.

## 19. Image, icon, and asset intelligence

Help agents select and implement:

-   Product screenshots.
-   Photography and art direction.
-   Illustrations.
-   Icons.
-   Logos.
-   Textures and patterns.
-   Lottie/Rive animations.
-   Empty-state visuals.
-   Charts and data visuals.

Use consistent icon families and sizing. Prefer accessible, recognizable
icons over emoji in production UI. Use real assets when available; do
not invent customer logos, product screenshots, or proof.

Maintain an asset registry containing:

-   Asset ID and filename.
-   Asset type.
-   Source URL or creator.
-   License and attribution requirements.
-   Allowed use and restrictions.
-   File format and dimensions.
-   Theme or skill compatibility.
-   Review status.

Do not bundle third-party assets unless their license permits
redistribution. When uncertain, link to the source and explain the
license status instead of copying the asset.

## 20. Reference repository and research registry

Use established projects as research references. Treat them as sources
of ideas, patterns, documentation, and integration options---not as
permission to copy code or assets.

### Agent skills and design quality

-   https://github.com/Nutlope/hallmark
-   https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
-   https://github.com/vercel-labs/agent-skills
-   https://github.com/anthropics/skills
-   https://github.com/pbakaus/impeccable
-   https://github.com/supabase/agent-skills
-   https://github.com/expo/skills

### UI systems and components

-   https://github.com/shadcn-ui/ui
-   https://github.com/radix-ui/primitives
-   https://github.com/magicuidesign/magicui
-   https://github.com/DavidHDev/react-bits
-   https://github.com/tremorlabs/tremor
-   https://github.com/ant-design/ant-design-pro
-   https://github.com/refinedev/refine

### AI interfaces and AI platforms

-   https://github.com/assistant-ui/assistant-ui
-   https://github.com/lobehub/lobehub
-   https://github.com/langgenius/dify
-   https://github.com/open-webui/open-webui
-   https://github.com/vercel/ai

### Motion, visualization, and icons

-   https://github.com/motiondivision/motion
-   https://github.com/recharts/recharts
-   https://github.com/airbnb/visx
-   https://github.com/lucide-icons/lucide
-   https://github.com/phosphor-icons/core
-   https://github.com/tabler/tabler-icons
-   https://github.com/iconify/iconify
-   https://github.com/rive-app/rive-react
-   https://github.com/LottieFiles/dotlottie-web
-   https://github.com/pmndrs/react-three-fiber

### Engineering architecture and APIs

-   https://github.com/storybookjs/storybook
-   https://github.com/alan2207/bulletproof-react
-   https://github.com/fastapi/full-stack-fastapi-template
-   https://github.com/OAI/OpenAPI-Specification
-   https://github.com/prisma/prisma
-   https://github.com/drizzle-team/drizzle-orm

For each source, record its category, official URL, purpose,
last-reviewed date, license, and whether it is a skill pack, framework,
component library, documentation source, or product reference. Verify
current repository status and license before relying on it. Do not state
that every listed repository is an agent-skill repository.

## 21. Documentation requirements

Write documentation for actual implemented behavior. The docs set should
include:

-   Project vision and roadmap.
-   Architecture and repository structure.
-   Skill system and skill-authoring guide.
-   Design Intelligence and Unslop Engine.
-   Design System and Theme Engine.
-   Asset registry and source references.
-   Frontend and backend engineering.
-   Dashboard and AI interface patterns.
-   Animation and motion.
-   Installation and agent compatibility.
-   CLI reference and GitHub installer.
-   Security and privacy.
-   Licensing and third-party notices.
-   Contribution guide.
-   Testing and evaluation.
-   Versioning and release process.
-   FAQ and architecture decision records.

Every command, path, configuration key, and feature described in
documentation must match the implementation. Clearly label planned
features as planned; never describe them as already available.

## 22. Technology choices

Use a pragmatic TypeScript-first stack:

-   TypeScript for executable packages.
-   Node.js for CLI and installer.
-   pnpm workspaces for monorepo management.
-   A maintained CLI framework or a small custom command layer.
-   GitHub REST API for selective downloads.
-   Zod or an equivalent schema validator for registry and
    configuration.
-   Vitest for unit and integration tests.
-   Markdown/frontmatter validation for skills.
-   Playwright only where browser-level tests provide real value.
-   GitHub Actions for CI and release automation.

Choose stable, maintained dependencies. Avoid unnecessary frameworks,
services, databases, and runtime dependencies. The docs website is
optional and should not delay the core repository and CLI.

## 23. Security, privacy, and reliability

Treat repository content and downloaded files as untrusted input.

Required safeguards:

-   Validate remote paths and prevent directory traversal.
-   Never execute remote scripts during installation.
-   Keep credentials out of logs and error messages.
-   Do not collect project source code or user data.
-   Avoid telemetry by default; if introduced, make it explicit,
    documented, and opt-in.
-   Validate registry and metadata before writing files.
-   Use atomic writes and safe rollback where practical.
-   Avoid overwriting user files without consent.
-   Handle network failures and rate limits gracefully.
-   Pin versions for reproducible installation.
-   Document threat assumptions and security reporting.
-   Test malicious paths, malformed metadata, and partial downloads.

## 24. Licensing and attribution

Use an appropriate open-source license for original CraftLayer code and
original skill content. MIT may be suitable for original material,
subject to the project's final licensing decision.

Do not assume that a referenced project's license permits copying its
content or assets. Keep third-party notices and attribution where
required. Maintain `THIRD-PARTY-NOTICES.md` when third-party material is
included. Preserve original license files and copyright notices when
redistribution is permitted.

Before release, review all bundled code, documentation, examples,
images, fonts, icons, and other assets for license compatibility.

## 25. Quality evaluation

Build validation that checks:

### Repository and skill validation

-   Required metadata exists and is valid.
-   Skill IDs and paths are unique.
-   Referenced files exist.
-   Markdown links are valid where practical.
-   No empty or placeholder skill is published.
-   Registry entries match real skill directories.
-   Required license and attribution metadata exists.

### CLI and installer validation

-   List and info commands work.
-   Single-skill install works.
-   Multi-skill install works.
-   Category install works.
-   Agent adapters resolve correct destinations.
-   Project/global scopes behave correctly.
-   Existing files are protected.
-   Update and remove commands behave safely.
-   API failures and malformed responses are handled.
-   Security tests cover path traversal and unsafe writes.

### Design and engineering evaluation

-   Design hierarchy and consistency.
-   Responsive behavior.
-   Keyboard and screen-reader accessibility.
-   Interaction-state completeness.
-   Performance considerations.
-   Data and content realism.
-   Maintainability and code quality.
-   Security and permission boundaries.

Automated checks cannot fully judge visual quality. Use human review and
screenshot-based evaluation for representative pages. Keep evaluation
criteria explicit and repeatable.

## 26. Implementation phases

Deliver the repository incrementally. Each phase must leave the project
in a working, testable state.

### Phase 1 --- Foundation

-   Confirm project identity and license.
-   Set up monorepo and TypeScript tooling.
-   Create core documentation and contribution rules.
-   Define skill metadata and registry schema.
-   Implement repository and skill validation.

### Phase 2 --- Core skills

Complete these eight skills first:

1.  Design Intelligence.
2.  Unslop Engine.
3.  Design Systems.
4.  Premium Landing Pages.
5.  Frontend Engineering.
6.  Dashboard Design.
7.  Backend Architecture.
8.  Animation and Motion.

Each must be genuinely useful, tested against examples, and linked to
relevant references.

### Phase 3 --- Theme Engine

-   Define theme schema.
-   Create a small set of complete, differentiated themes.
-   Validate theme metadata and tokens.
-   Document safe theme adoption.

### Phase 4 --- Installer and CLI

-   Implement GitHub selective download.
-   Implement agent adapters.
-   Add list, info, add, update, remove, themes, and doctor commands as
    supported.
-   Add project/global installation and safe overwrite behavior.
-   Test against temporary fixture projects.

### Phase 5 --- Additional skill families

Add AI interfaces, admin/super-admin, API, database,
authentication/RBAC, security, accessibility, performance, testing, and
integrations.

### Phase 6 --- Asset and reference registry

-   Add source metadata.
-   Verify licenses and attribution.
-   Add only assets that may legally be redistributed.
-   Document external resources that should be linked rather than
    copied.

### Phase 7 --- Quality and evaluation

-   Expand automated validation.
-   Add representative fixtures and visual review cases.
-   Add security and installer regression tests.
-   Publish evaluation criteria.

### Phase 8 --- Release preparation

-   Verify package metadata and CLI behavior.
-   Complete installation and compatibility docs.
-   Run full CI.
-   Review licenses and third-party notices.
-   Prepare changelog and release notes.
-   Publish only features that pass the Definition of Done.

## 27. Version strategy

Use semantic versioning:

-   `0.x`: public preview and evolving skill/CLI contracts.
-   `1.0.0`: stable registry schema, documented installer behavior,
    tested adapters, complete core skills, and reliable release process.

Version skills and executable packages deliberately. Document breaking
changes and migration steps. A skill update should not silently change
unrelated project files.

## 28. Definition of Done

CraftLayer is ready for its first public release only when:

-   The repository has a clear README, license, contribution guide, and
    architecture docs.
-   The initial eight core skills are complete and validated.
-   Skills have correct metadata, activation triggers, workflows,
    references, and acceptance criteria.
-   The registry contains only real, validated skills.
-   Selective GitHub installation works without cloning the entire
    repository.
-   At least the initially claimed agent adapters are verified and
    tested.
-   Installation preserves existing project files and configuration.
-   Theme installation works for the themes marked as released.
-   Unslop Engine has actionable create, audit, and improvement
    workflows.
-   Security, path validation, and overwrite protections are tested.
-   References and bundled assets have verified license information.
-   CI passes and documentation matches actual behavior.

## 29. Instructions to the coding agent

You are the lead open-source maintainer and implementation engineer for
CraftLayer.

Before writing code:

1.  Inspect the current working directory and existing repository.
2.  Identify existing files, package manager, stack, and conventions.
3.  Read existing instructions such as `AGENTS.md`, if present.
4.  Check the current official documentation for target agent skill
    formats and GitHub API behavior.
5.  Verify the licenses and current status of reference repositories.
6.  Propose a short implementation sequence based on the actual
    workspace.

During implementation:

-   Build working features, not just plans or folder structures.
-   Do not overwrite or delete existing user work.
-   Do not create empty directories or placeholder documents to imitate
    progress.
-   Keep skill content practical, specific, and readable by coding
    agents.
-   Use small, maintainable modules and clear TypeScript types.
-   Add tests alongside meaningful functionality.
-   Validate every CLI command before documenting it.
-   Do not fabricate repository capabilities, benchmark results,
    references, stars, or license permissions.
-   Do not copy third-party skill content wholesale.
-   Keep a current `docs/IMPLEMENTATION-STATUS.md` with completed work,
    in-progress work, decisions, tests, and known limitations.
-   If a requirement cannot be completed safely, document the blocker
    and provide the smallest safe alternative.
-   Ask for user approval before publishing, creating external
    resources, or performing destructive actions.

At the end of each phase:

1.  Run relevant tests and validation.
2.  Fix failures caused by the implementation.
3.  Update documentation and implementation status.
4.  Summarize files and capabilities added.
5.  State exact commands run and their outcomes.
6.  List known limitations and the next phase.

**Do not stop after generating a plan. Implement the highest-priority
complete vertical slice, verify it, and then continue phase by phase.**

------------------------------------------------------------------------

## 30. First task

Start with **Phase 1 --- Foundation**, but first inspect the actual
workspace. Then:

1.  Confirm whether this is a new or existing repository.
2.  Create a concise implementation plan.
3.  Establish the minimal monorepo and validation foundation.
4.  Define and validate the skill metadata schema.
5.  Write the project README, architecture, skill-authoring guide,
    licensing policy, and implementation status.
6.  Implement the repository/skill validator.
7.  Add tests and run them.
8.  Report the exact result before proceeding to Phase 2.

The objective is a real, maintainable open-source product---not a
visually impressive but incomplete repository.
