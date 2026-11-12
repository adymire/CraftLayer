---
name: performance-optimization
description: Diagnose and improve measured performance bottlenecks without sacrificing correctness, accessibility, or maintainability.
---

# Performance Optimization

## When to use

Use when user-perceived performance is poor, a measurable budget is missed,
or a change risks adding substantial work, bytes, or latency.

## When not to use

Do not optimize based only on intuition or microbenchmarks unrelated to
real user workloads.

## Inputs and assumptions

Identify target devices, network, workload, performance metric, baseline,
budget, user impact, and current profiling tools.

## Workflow

1. Reproduce the issue and capture a representative baseline.
2. Profile the relevant path and find the dominant cost.
3. Set a measurable target and choose the smallest change that addresses
   the bottleneck.
4. Preserve correctness, accessibility, and error handling; document any
   trade-off.
5. Compare before/after under the same conditions.
6. Add a regression budget or test only when it is stable and meaningful.

## Decision rules

- Optimize observed bottlenecks before speculative ones.
- Consider startup, memory, network, rendering, and server latency as
  appropriate.
- Caching requires clear invalidation, privacy, and staleness behavior.
- Avoid adding complex caching or concurrency that risks data correctness.

## Example

If a page ships a large unused chart package, confirm bundle analysis and
route usage before splitting or replacing it; compare real route load after
the change.

## Common failures

- Reporting synthetic benchmark gains as user impact.
- Caching user-specific data without safe cache keys.
- Trading correctness or accessibility for a marginal speedup.

## Validation

Repeat the baseline measurement, verify functional behavior, inspect
regressions across representative devices/workloads, and report exact
conditions and limits.
