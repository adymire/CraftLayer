---
name: api-engineering
description: Design stable, validated, secure APIs with explicit contracts, errors, pagination, and compatibility behavior.
---

# API Engineering

## When to use

Use when adding or changing HTTP, RPC, webhook, or internal service
contracts.

## When not to use

Do not introduce a new API style or versioning scheme without compatibility
or consumer requirements.

## Inputs and assumptions

Identify callers, authentication, authorization, data ownership, expected
volume, latency, compatibility guarantees, and existing schemas.

## Workflow

1. Define resources and operations around domain behavior.
2. Specify request/response schemas, validation, status/error contract, and
   examples.
3. Enforce authorization and tenant scope on the server for every
   operation.
4. Add pagination and bounds for collection endpoints; avoid unbounded
   responses.
5. Define idempotency, concurrency, and retry behavior for writes.
6. Add timeouts and rate limits appropriate to the existing platform.
7. Version or evolve contracts compatibly; deprecate with a migration path.
8. Test malformed input, permission boundaries, conflicts, and failures.

## Decision rules

- Do not leak stack traces, secrets, or existence-sensitive data in errors.
- Return stable machine-readable error codes where clients depend on them.
- Validate inputs at runtime even when generated types exist.
- Encode identifiers in URLs and enforce request-size limits.

## Example

An update endpoint should distinguish invalid input from a stale revision,
so clients can correct data or reload rather than showing a generic success.

## Common failures

- Breaking response shapes without versioning or tests.
- Missing authorization on nested resources.
- No pagination or idempotency plan.

## Validation

Check contract examples, schema validation, authorization, error mapping,
pagination bounds, compatibility tests, and generated documentation.
