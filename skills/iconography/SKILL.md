---
name: iconography
description: Use consistent, recognizable icons with accessible labels, predictable sizing, and verified licensing.
---

# Iconography

## When to use

Use when choosing, adding, or standardizing interface icons.

## When not to use

Do not use icons to replace clear labels for unfamiliar or high-impact
actions. Do not use emoji as production interface controls.

## Inputs and assumptions

Inspect the existing icon library, stroke/fill style, sizing grid, intended
meaning, accessibility label, and license.

## Workflow

1. Check whether text, an existing icon, or a native control already
   communicates the action.
2. Choose a recognizable icon from one consistent family.
3. Pair ambiguous icons with visible text; give icon-only controls an
   accessible name and adequate target size.
4. Keep decorative icons hidden from assistive technology.
5. Align stroke, optical size, baseline, and state color with the system.
6. Verify license and avoid bundling restricted assets.

## Decision rules

- The accessible name describes the action, not the artwork.
- A disabled or destructive action must not rely on icon color alone.
- Do not mix icon families without a clear design reason.

## Example

An icon-only “Delete project” control should expose that exact accessible
name and open a confirmation that identifies the project.

## Common failures

- Unlabeled icon buttons and ambiguous glyphs.
- Emoji whose appearance varies by platform.
- Inconsistent stroke weights and undocumented copies of icon assets.

## Validation

Check semantic name, keyboard target, visual consistency, state contrast,
license, and whether a text label is needed.
