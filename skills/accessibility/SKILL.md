---
name: accessibility
description: Build and evaluate inclusive interfaces with semantic structure, keyboard support, clear feedback, and assistive-technology compatibility.
---

# Accessibility

## When to use

Use for any user-facing interface, interaction, content, form, navigation,
or media change.

## When not to use

Accessibility is not an optional add-on skill; do not skip it because a
task appears visual or because automated tooling reports no errors.

## Inputs and assumptions

Inspect semantic structure, input methods, assistive technology needs,
contrast, zoom, motion, language, and existing accessibility requirements.

## Workflow

1. Use semantic elements and a logical heading and landmark structure.
2. Ensure every interaction works by keyboard, with visible focus and
   predictable focus order.
3. Associate labels, instructions, errors, and status messages with
   controls.
4. Provide text alternatives for meaningful images and non-color cues for
   state.
5. Respect zoom, reflow, reduced motion, and user preferences.
6. Use ARIA only when native HTML cannot express the behavior; follow
   required roles, names, states, and keyboard patterns.
7. Test manually with keyboard and representative assistive technology in
   addition to automated checks.

## Decision rules

- Prefer native HTML controls over custom widgets.
- Do not use placeholder text as the only label.
- Avoid unexpected focus movement and status updates that are not announced.
- Meet the project's target standard; do not imply automated checks certify
  accessibility.

## Example

A custom tab interface must expose selected state, move focus using the
expected keyboard pattern, and keep tab order separate from panel content.
Use native links if the interaction is navigation rather than in-place
selection.

## Common failures

- Clickable `div` elements without keyboard behavior.
- Focus indicators removed for visual polish.
- Errors communicated only by color or transient toast.

## Validation

Test keyboard-only use, labels and names, focus, contrast, zoom/reflow,
reduced motion, status announcements, and automated accessibility checks.
