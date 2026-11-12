---
name: frontend-engineering
description: Implement frontend features reliably within the existing application architecture, conventions, and accessibility requirements.
---

# Frontend Engineering

## When to use

Use for user-facing web changes involving UI architecture, routing, state,
forms, data loading, API integration, or frontend reliability.

## When not to use

Do not introduce a new framework or state library for a small feature when
the current stack already solves the problem. Do not broaden a visual task
into an unrelated application rewrite.

## Inputs and assumptions

Read package scripts and lockfile, app entry points, routes, components,
state/data patterns, API contracts, test setup, styling, and accessibility
conventions before editing.

## Workflow

1. Trace the existing feature flow and define expected input, output,
   loading, empty, error, and success behavior.
2. Choose the narrowest module boundary and use existing typed contracts.
3. Keep view rendering separate from side effects where the codebase does
   so; centralize repeated business rules in an established domain layer.
4. Handle async cancellation, stale results, errors, and duplicate submits
   according to existing patterns.
5. Use semantic HTML, labels, keyboard behavior, and visible focus.
6. Preserve responsive behavior; test long text, empty data, and narrow
   screens when the UI is affected.
7. Add or update focused tests for behavior, not implementation details.
8. Run the project's relevant lint, type-check, tests, and build.

## Decision rules

- Respect the existing framework and package manager.
- Avoid `any`, unsafe casts, duplicated source-of-truth state, and
  success-shaped error fallbacks.
- Validate untrusted data at system boundaries.
- Do not silently swallow exceptions or hide failed actions.
- Do not add a dependency without a concrete capability gap.

## JavaScript and TypeScript example

Use typed results and explicit error handling at an API boundary:

```ts
type UserSummary = { id: string; displayName: string };

async function loadUser(id: string): Promise<UserSummary> {
  const response = await fetch(`/api/users/${encodeURIComponent(id)}`);
  if (!response.ok) throw new Error(`User request failed: ${response.status}`);
  return (await response.json()) as UserSummary;
}
```

In production, validate the response shape rather than trusting a TypeScript
assertion; the snippet only illustrates an explicit failure path.

## Common failures

- Fetching the same data in multiple components with conflicting state.
- Ignoring rejected promises or returning fake defaults.
- Adding interaction handlers to non-semantic elements.
- Testing only the happy path or only snapshots.

## Validation

Check correct behavior for success and failure, request races where
applicable, keyboard and screen-reader semantics, responsive states, type
safety, and project-standard tests/build.
