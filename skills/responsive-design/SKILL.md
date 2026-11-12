---
name: responsive-design
description: Adapt layouts and interactions to available space and input modes without hiding essential content or functionality.
---

# Responsive Design

## When to use

Use for new or changed web layouts, navigation, tables, dialogs, forms, and
other interfaces that must work across viewport sizes.

## When not to use

Do not equate responsive design with shrinking desktop content or adding
breakpoints without testing actual content and task behavior.

## Inputs and assumptions

Identify supported viewport ranges, touch and keyboard use, content
variation, existing breakpoints, and browser support.

## Workflow

1. Start with content order and priority; decide what may wrap, reflow,
   scroll, collapse, or move.
2. Use fluid sizing and existing breakpoints before adding arbitrary
   device-specific rules.
3. Preserve action visibility, readable text, and adequate targets.
4. For wide data tables, choose a deliberate strategy such as prioritized
   columns, horizontal scrolling with cues, or a detail view.
5. Check menus, dialogs, forms, charts, and long labels, not just the hero.
6. Test keyboard and touch interactions at narrow, medium, and wide widths.

## Decision rules

- Do not remove essential information on small screens without an
  alternative.
- Avoid fixed heights for content that can wrap or localize.
- Focus order must follow the visual and task order.
- Ensure zoom and text resizing do not clip controls.

## Example

A dense table may retain a few decision-critical columns on mobile and open
the full record in a detail page; hiding arbitrary columns without telling
the user is not acceptable.

## Common failures

- Horizontal page overflow from fixed widths.
- Desktop-only hover controls.
- Mobile navigation that traps focus or obscures the current location.

## Validation

Test real content at narrow and wide sizes, zoom, keyboard, touch, overflow,
focus order, and all essential actions.
