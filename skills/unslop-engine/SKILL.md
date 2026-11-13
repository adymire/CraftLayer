---
name: unslop-engine
description: Create, audit, or improve interfaces while challenging generic visual choices without treating any style as automatically wrong.
---

# Unslop Engine

## When to use

Use when creating a user-facing interface that needs a distinct product-led
visual direction, auditing a weak or generic screen, or improving an existing
design without changing its intended behavior.

## When not to use

Do not use as a mandate to add visual novelty, remove familiar patterns, or
rewrite a functional interface. Do not treat gradients, cards, centered
layouts, glass, or animation as defects by themselves.

## Inputs and assumptions

Inspect the actual page, its purpose, audience, brand constraints, user
journey, data, and existing implementation. Separate observable defects
(for example, clipped content) from subjective choices (for example, a
quiet palette).

## Workflow

1. Select **Create**, **Audit**, or **Unslop** mode and name the affected
   screen and primary task.
2. Inspect real code and rendered states; note the intended hierarchy,
   content, layout, responsive behavior, and available design tokens.
3. Look for unmotivated defaults: template-like hero copy, repeated feature
   cards, arbitrary gradients/glows, decorative empty space, random type,
   emoji as production icons, fake metrics, invented social proof, and
   generic domain-neutral dashboard patterns.
4. For each finding, record evidence, severity, objective/subjective status,
   user impact, and a correction that preserves the user's goal.
5. Rank work by task failure and clarity before aesthetic preference.
6. Improve one coherent visual system: hierarchy, layout, typography, color,
   surfaces, content, and purposeful motion.
7. Check the same flow and important states at mobile and desktop sizes.
8. Re-audit changed areas and report remaining trade-offs.

## Decision rules

- A familiar pattern is acceptable when it makes the task easier and fits
  users' expectations.
- A visual choice needs a product or usability reason, not just novelty.
- Use realistic domain data; label illustrative or synthetic examples.
- Never invent proof, screenshots, logos, capabilities, or chart data.
- Preserve workflows, semantics, keyboard access, and brand constraints.

## Example audit finding

**Medium, objective:** the primary action is visually indistinguishable from
secondary links and falls below the data table. Users scanning the page may
miss the next step. Move it beside the relevant heading and provide a clear
focus style. Check that the action remains discoverable on narrow screens.

## Common failures

- Replacing one generic template with a different fashionable template.
- Treating every audit observation as a blocker.
- Removing useful cards or whitespace without understanding their purpose.
- Improving screenshots while breaking responsive or keyboard behavior.

## Validation

Report findings with affected component, severity, evidence, impact,
objective/subjective classification, recommendation, and acceptance check.
Verify that improvements retain functionality, responsive behavior,
accessibility, product identity, and realistic content.

## Supporting guide

Use the [evidence-led audit guide](references/playbook.md) to structure a
multi-screen review or to agree on severity and acceptance criteria before
making visual changes.
