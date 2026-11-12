---
name: testing-and-quality
description: Choose focused automated tests and quality checks that verify user-visible behavior and protect important invariants.
---

# Testing and Quality

## When to use

Use for feature implementation, bug fixes, refactors, and test strategy.

## When not to use

Do not add brittle tests solely to increase coverage or duplicate tests that
assert the same behavior at every layer.

## Inputs and assumptions

Inspect the test runner, project conventions, critical user flows, existing
regressions, dependency boundaries, and CI constraints.

## Workflow

1. State the behavior or invariant that could fail.
2. Choose the narrowest test layer that gives reliable evidence; add
   integration or browser tests for real boundary behavior.
3. Cover success, important boundary cases, and meaningful failures.
4. Use fixtures that are realistic but deterministic; isolate filesystem,
   network, time, and external services where needed.
5. Avoid asserting private implementation details unless they are part of a
   supported contract.
6. Run targeted tests, then broader checks when shared behavior changes.
7. Report exact commands and limitations; do not claim unrun checks passed.

## Decision rules

- A passing test is evidence for its assertion, not proof of total
  correctness.
- Prefer regression tests that fail before the fix.
- Keep security and authorization boundaries directly tested.
- Do not weaken assertions to make a failing suite green.

## Example

For a retry fix, assert both that transient failures retry within the
configured bound and that a permanent validation error is not retried.

## Common failures

- Snapshot updates that conceal behavioral regressions.
- Tests that depend on order, wall-clock timing, or external network state.
- Testing only helper functions while skipping the integration boundary.

## Validation

Confirm the test fails for the relevant regression, passes after the change,
is deterministic, and the reported command actually ran.
