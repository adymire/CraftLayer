---
name: component-engineering
description: Design reusable UI components with clear contracts, semantic behavior, and only the flexibility real consumers need.
---

# Component Engineering

## When to use

Use when creating shared components or extracting a repeated, stable UI
pattern for multiple consumers.

## When not to use

Do not abstract a one-off element before its behavior is understood or
build a generic component framework for a single feature.

## Inputs and assumptions

Inspect consumers, accessibility semantics, styling conventions, state
ownership, composition patterns, and compatibility requirements.

## Workflow

1. Identify repeated structure and meaningful differences across consumers.
2. Define a small typed API around user-facing behavior, not implementation
   details.
3. Choose semantic HTML and predictable keyboard interactions.
4. Keep data fetching and domain policy outside presentational components
   unless repository conventions specify otherwise.
5. Support required states and content lengths without excessive boolean
   combinations.
6. Add tests for public behavior and document examples and limitations.
7. Migrate representative consumers and check for regressions.

## Decision rules

- Prefer composition for distinct content over many configuration flags.
- Avoid hidden global state and undocumented CSS coupling.
- Give controlled and uncontrolled modes only when consumers need both.
- Preserve a11y props and native browser behavior.

## Example

A dialog contract should define open/close control, title, description,
focus behavior, escape handling, and whether outside-click dismissal is
allowed; merely rendering a positioned panel is not a dialog.

## Common failures

- A component API that mirrors internal state instead of intent.
- Reuse that forces unrelated screens into identical markup.
- Missing disabled, error, and keyboard behaviors.

## Validation

Test semantic behavior, keyboard access, state transitions, long/empty
content, component API typing, and at least two representative consumers.
