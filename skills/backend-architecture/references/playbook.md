# Backend boundary and reliability guide

Make architecture decisions from verified domain and operational needs.
Record the smallest design that meets them, including the failures it must
survive and the controls that protect data.

## Map actors, ownership, and trust

Before designing endpoints or jobs, identify:

- Actor, role, and authenticated identity source
- Resource owner / tenant and how membership is verified
- Trusted service-to-service principals
- User-controlled fields, IDs, files, and callback payloads
- Data classification, retention, and deletion needs
- External systems and the failures they can return

Derive tenant scope from trusted authentication and membership data; do not
trust a caller-supplied tenant ID by itself. Re-check ownership when a
background job executes, not only when it is enqueued.

## Define the contract

For each operation, specify:

```text
Actor and authorization:
Input shape and validation:
Resource scope:
Success result:
Expected errors:
Pagination / size bounds:
Idempotency and concurrency:
Audit / observability:
```

Keep transport, domain invariants, and persistence responsibilities aligned
with the existing codebase. Validate untrusted input at the boundary and
return stable, non-sensitive client errors.

## Plan asynchronous reliability

- Set explicit deadlines for network and storage operations.
- Bound retries by count and elapsed time; use backoff with jitter where
  appropriate.
- Retry only transient failures and only when repeated execution is safe.
- Give retried writes an idempotency key or a naturally idempotent design.
- Define duplicate, partial completion, poison-message, and cancellation
  behavior.
- Make job ownership and authorization verifiable at execution time.
- Keep payloads and logs free of credentials and unnecessary personal data.

Do not claim "exactly once" without a mechanism and evidence; most job
systems provide at-least-once delivery.

## Make schema changes deployable

For a populated database or rolling deployment, prefer a staged rollout:

1. Add a backward-compatible field or structure.
2. Deploy readers/writers that tolerate old and new representations.
3. Backfill in bounded, observable batches.
4. Verify completeness and invariants.
5. Switch reads and writes to the new representation.
6. Remove old storage only after all supported versions are migrated.

Check lock duration, indexes, data volume, rollback or forward-recovery,
and backups. Do not run irreversible migration or delete data without
approval and a recovery plan.

## Operational readiness

Expose useful request/job identifiers, duration, retry count, and
failure category without logging secrets or entire sensitive payloads.
Define alert thresholds, retry exhaustion handling, retention, access
expiry, and recovery ownership. Add timeouts rather than allowing unbounded
work.

## Review checklist

- [ ] Actor, tenant/resource owner, and trust boundaries are explicit.
- [ ] Authorization is enforced server-side for reads, writes, and jobs.
- [ ] Inputs, errors, pagination, and idempotency have defined contracts.
- [ ] Retries and timeouts are bounded and safe for the operation.
- [ ] Migration and deletion have compatibility and recovery plans.
- [ ] Logs and exports minimize sensitive data and access duration.
- [ ] Tests cover invariants, cross-tenant access, and failure paths.
