---
name: design-systems
description: Define or extend a maintainable design-token and component system that fits an existing product and technology stack.
---

# Design Systems

## When to use

Use when establishing shared visual foundations, adding tokens or component
variants, aligning inconsistent screens, or integrating an existing UI
library with product-specific rules.

## When not to use

Do not create a system for a one-off experiment unless reuse is expected.
Do not replace an existing design system solely to match a preferred
framework or theme.

## Inputs and assumptions

Inspect current CSS, theme configuration, component library, typography,
brand rules, browser support, accessibility requirements, and number of
surfaces that need consistency.

## Workflow

1. Inventory tokens, repeated patterns, exceptions, and current component
   ownership.
2. Define semantic tokens for foreground/background, muted text, borders,
   focus, interactive states, and status colors before palette-specific
   values.
3. Define type roles, spacing, layout containers, breakpoints, radii,
   elevation, icon sizing, and motion duration only where they solve a real
   consistency problem.
4. Map tokens to the project's current technology: CSS custom properties,
   framework theme, or library configuration. Avoid competing sources of
   truth.
5. Define component contracts: purpose, variants, states, content rules,
   keyboard semantics, and responsive behavior.
6. Migrate one representative screen and check for regressions before
   expanding adoption.
7. Document exceptions, migration approach, and how to add a token or
   variant.

## Decision rules

- Prefer semantic names such as `--color-surface-danger` over names tied to
  a single visual shade.
- Keep tokens small and purposeful; do not generate a huge scale without
  consumers.
- Components own behavior; tokens own reusable values.
- Do not use color alone for meaning. Preserve visible focus and sufficient
  contrast.
- Make changes additive or scoped when a global migration would be risky.

## Example

```css
:root {
  --color-surface: #fff;
  --color-text: #20242b;
  --color-focus: #175cd3;
}

.button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}
```

Use project-approved tokens and contrast-test actual foreground/background
pairs; the values above are illustrative only.

## Common failures

- Copying another product's token names or values without mapping semantics.
- Making every component configurable through unrelated booleans.
- Updating tokens but leaving components with hardcoded overrides.
- Introducing global changes without a migration and regression check.

## Validation

Check token references, representative component states, dark/light modes
where supported, keyboard focus, contrast, responsive layout, and existing
consumer regressions. Confirm docs explain usage rather than listing values
alone.
