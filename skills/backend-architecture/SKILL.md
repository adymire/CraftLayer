---
name: backend-architecture
description: Shape backend changes around explicit boundaries, data ownership, reliability, security, and the project's actual scale.
---

# Backend Architecture

## When to use

Use for new backend services, major domain features, service boundaries,
data flows, or production-readiness review.

## When not to use

Do not split a small application into services without an operational
reason. Do not prescribe a database, cloud, queue, or framework before
understanding requirements.

## Inputs and assumptions

Inspect the existing runtime, deployment model, data stores, domain
boundaries, traffic and latency needs, failure tolerance, tenancy, privacy,
team operations, and migration constraints.

## Workflow

1. Describe actors, business invariants, trust boundaries, request/data
   flows, and failure cases.
2. Keep domain rules in the existing appropriate layer; separate transport,
   persistence, and external-service concerns using local conventions.
3. Define API contracts, validation, authorization, error semantics,
   idempotency, and pagination before implementation.
4. Plan schema changes and backfills for compatibility, rollback, and
   existing data.
5. Add timeouts, bounded retries, rate limits, and observability at
   external boundaries.
6. Avoid secrets in logs; define data retention and sensitive-field
   handling.
7. Test invariants, permissions, failure paths, migrations, and integration
   contracts.
8. Document operational assumptions, monitoring, recovery, and known
   limitations.

## Decision rules

- Start with the simplest architecture that meets verified requirements.
- Every resource read or write must enforce the correct owner/tenant access.
- Retry only operations that are safe to retry; use idempotency for
  externally retried writes.
- Do not log full credentials, tokens, or sensitive payloads.
- Treat migration and deletion as user-impacting operations requiring an
  explicit plan.

## Python example

Keep request parsing and domain validation explicit:

```python
def require_non_empty(value: str, field: str) -> str:
    normalized = value.strip()
    if not normalized:
        raise ValueError(f"{field} must not be empty")
    return normalized
```

Translate validation failures into the service's established error contract;
do not expose internal stack traces to clients.

## Common failures

- Premature microservices or unbounded background work.
- Authorization checked only in the UI.
- Retrying non-idempotent operations after timeouts.
- Destructive schema changes without a recovery strategy.

## Validation

Review data ownership, authorization, input boundaries, error behavior,
timeouts, retry/idempotency, migration safety, tests, and operational
visibility.

## Supporting guide

Use the [backend boundary and reliability guide](references/playbook.md)
when the change crosses persistence, tenant boundaries, external services,
or asynchronous work.
