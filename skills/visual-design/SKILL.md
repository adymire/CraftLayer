---
name: visual-design
description: Establish visual hierarchy, typography, color, composition, and imagery that support a product's purpose and brand.
---

# Visual Design

## When to use

Use when shaping the visual direction of a screen, resolving hierarchy
problems, or reviewing typography, color, spacing, imagery, and surfaces.

## When not to use

Do not treat personal taste as objective evidence or add visual effects to
compensate for unclear content and product positioning.

## Inputs and assumptions

Inspect the audience, purpose, content, brand, current tokens, viewport,
platform, and any existing visual conventions.

## Workflow

1. Identify the primary message and action, then order supporting content.
2. Set type roles and readable line lengths before styling individual
   elements.
3. Use a spacing and alignment rhythm appropriate to the content density.
4. Choose colors by semantic role and verify contrast in rendered states.
5. Select imagery and iconography that clarify the story or task.
6. Use surfaces, borders, shadows, and effects sparingly to separate
   meaningful layers.
7. Review hierarchy at realistic sizes and in high/low content cases.

## Decision rules

- One clear visual entry point is more useful than competing accents.
- Use a limited, intentional type system; avoid novelty at the expense of
  readability.
- Whitespace should group, separate, or focus content.
- Decorative graphics must not obscure content or imply unsupported facts.

## Example

For an editorial article, prioritize a readable text measure, clear title
and metadata hierarchy, and consistent image captions; a dense dashboard
layout is not a suitable default.

## Common failures

- Changing fonts and colors without improving hierarchy.
- Low-contrast muted text and tiny interactive targets.
- Random spacing and inconsistent icon weight.

## Validation

Review hierarchy, legibility, contrast, content alignment, visual consistency,
and behavior at target viewport widths.
