---
name: design-intelligence
description: Plan product interfaces from user needs, product constraints, and a deliberate visual direction before implementation.
---

# Design Intelligence

## When to use

Use before creating or substantially redesigning a marketing page, product
interface, dashboard, admin tool, or design system. Reuse it for a smaller
change when the user asks for visual direction or UX planning.

## When not to use

Do not invoke a full design process for a purely internal refactor, bug fix
with no interface impact, or a request that explicitly asks for a narrowly
scoped code change. Do not invent product strategy when the user has not
provided it.

## Inputs and assumptions

Identify the product and task, intended users, primary user action, existing
brand and UI, target platforms, content/assets, technical stack, constraints,
and what the user considers success. Mark missing facts as assumptions and
ask only questions that change the design or implementation materially.

## Workflow

1. Inspect the repository before proposing a solution: routes, entry points,
   components, tokens, dependencies, tests, and current responsive patterns.
2. Summarize the user problem, primary journey, important secondary tasks,
   content model, constraints, and unknowns.
3. Pick one visual direction that follows the product's audience and brand.
   State the hierarchy, type roles, color intent, layout, density, surfaces,
   and image or icon approach.
4. Sketch the page or workflow as information hierarchy and interaction
   states before choosing decorative details.
5. Reuse existing primitives and tokens; introduce only the smallest
   coherent extension needed.
6. Implement in the project's idioms, including loading, empty, error,
   success, disabled, hover, keyboard focus, and destructive states as
   relevant.
7. Review at narrow and wide viewport sizes, then fix the most important
   usability, accessibility, and visual inconsistencies.
8. Report decisions, files changed, checks run, unresolved assumptions, and
   trade-offs.

## Decision rules

- Product purpose and task clarity outrank novelty.
- Establish hierarchy with content, type, spacing, and layout before effects.
- Use a repeated pattern only when content structure justifies repetition.
- Keep design tokens semantic and consistent; ensure text and controls meet
  applicable contrast and focus requirements.
- Use real content and assets. Never fabricate trust signals, customers,
  metrics, or product capabilities.
- Ask before replacing a working design system or changing product flows.

## Example

For a finance dashboard, inspect the existing data and user roles first.
Prioritize balances, change over time, and the next required action; distinguish
estimated from settled values; provide a table for exact figures and a chart
for trends. Do not copy a generic marketing hero into the authenticated
workspace.

## Common failures

- Designing from a trend before understanding the task.
- Making every page a card grid or making every heading oversized.
- Treating a screenshot as proof that keyboard or mobile flows work.
- Replacing existing styles globally to fix one page.

## Validation

- Can a first-time user identify the page purpose and primary action?
- Are content hierarchy and important states understandable without color
  alone?
- Do navigation and controls work by keyboard and at realistic viewport
  widths?
- Do designs preserve the existing stack, brand, and functioning flows?
- Does the summary distinguish verified facts from assumptions?
