---
name: ai-engineering
description: Integrate AI capabilities with explicit model boundaries, evaluation, privacy controls, and observable failure behavior.
---

# AI Engineering

## When to use

Use for model/API integration, prompt construction, structured generation,
tool use, evaluation, or AI-backed product features.

## When not to use

Do not introduce a model where deterministic software solves the task more
reliably, cheaply, or safely.

## Inputs and assumptions

Define user task, quality target, data classification, model/provider
constraints, latency and cost budgets, fallback behavior, and human review
needs.

## Workflow

1. Define measurable success and unacceptable failure cases.
2. Minimize data sent to providers and document retention/processing
   assumptions.
3. Version prompts and model configuration; validate structured output at
   runtime.
4. Treat model responses as untrusted input; authorize tools independently
   of model intent.
5. Add timeouts, cancellation, bounded retries, and clear partial/failure
   states.
6. Build a representative evaluation set and inspect regressions before
   changing prompts or models.
7. Monitor quality, latency, cost, and safety with privacy-aware logging.

## Decision rules

- A model must not grant itself permissions.
- Do not claim deterministic or verified output where generation is
  probabilistic.
- Use human approval for consequential external or destructive actions.
- Separate model failure from application failure in user-facing reporting.

## Example

Parse a generated response against a schema, then apply business validation
and authorization before saving it; successful JSON parsing is not proof of
correctness.

## Common failures

- Prompt-only security controls for tool access.
- No baseline evaluation or version tracking.
- Silent fallback to a different model with different behavior.

## Validation

Test representative, adversarial, malformed, timeout, provider-failure,
privacy, cost, and authorization cases; report evaluation limitations.
