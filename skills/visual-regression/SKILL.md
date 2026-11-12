---
name: visual-regression
description: Detect unintended visual changes with stable, representative screenshots and human review of meaningful differences.
---

# Visual Regression

## When to use

Use for shared components, design-system changes, high-value pages, or
layouts where unintended visual shifts are costly.

## When not to use

Do not add screenshot tests for every page when they create noisy,
expensive maintenance without meaningful coverage.

## Inputs and assumptions

Identify representative routes, viewports, states, fonts, data fixtures,
browser environment, and acceptable dynamic differences.

## Workflow

1. Select high-risk pages and states with a reason for inclusion.
2. Make test data, fonts, viewport, browser, and animation behavior
   deterministic.
3. Capture baseline and candidate screenshots under matching conditions.
4. Review diffs in context; distinguish intentional design changes from
   clipping, missing content, font shifts, and state regressions.
5. Update snapshots only with an explained, reviewed product change.
6. Pair screenshots with behavior, accessibility, and responsive tests.

## Decision rules

- Pixel diffs are signals, not proof of a defect.
- Do not mask broad regions to make tests pass.
- Keep dynamic content deterministic and masks narrow.
- Preserve keyboard and interaction checks; a screenshot cannot test them.

## Example

For a navigation redesign, capture desktop and mobile layouts plus open-menu
state; test focus order and Escape behavior separately.

## Common failures

- Unreviewed snapshot refreshes.
- Flaky fonts, time, data, or animation.
- Testing only one viewport or static state.

## Validation

Confirm determinism, representative coverage, intentional diff review,
separate interaction/accessibility checks, and actionable failure output.
