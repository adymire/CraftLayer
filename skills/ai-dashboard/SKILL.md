---
name: ai-dashboard
description: Make AI-system health, usage, cost, quality, and operational status understandable to the people responsible for it.
---

# AI Dashboard

## When to use

Use for monitoring AI applications, model providers, agents, evaluations,
usage, or operational quality.

## When not to use

Do not present invented model metrics, imply quality from token volume, or
expose prompts and user data without an approved privacy design.

## Inputs and assumptions

Identify operators, decisions, telemetry sources, metric definitions,
sampling, retention, privacy constraints, and alert actions.

## Workflow

1. Define the operator questions: availability, latency, errors, spend,
   quality, safety, and workload.
2. Name each metric's source, unit, period, aggregation, and known gaps.
3. Separate system status from model-evaluation quality and human feedback.
4. Provide filters and drill-downs to traces with redaction and access
   controls.
5. Explain thresholds and alerts; show when data is delayed or sampled.
6. Offer actionable next steps for common incidents.
7. Test aggregation boundaries, missing telemetry, and permission controls.

## Decision rules

- Token count or user rating alone does not establish model quality.
- Never expose secrets, private prompts, or customer data by default.
- Distinguish estimated cost from billed cost and indicate currency.
- Show time zone and aggregation windows.

## Example

An error-rate chart should define which requests count as errors and link to
redacted failure traces; a raw model label is not an explanation.

## Common failures

- Unlabeled usage totals and misleading time comparisons.
- Treating model/provider availability as end-to-end product availability.
- Alert panels without ownership or response guidance.

## Validation

Verify metric math, time ranges, sampling/retention disclosure, redaction,
drill-down permissions, and behavior when telemetry is absent or delayed.
