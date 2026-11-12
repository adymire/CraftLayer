---
name: database-engineering
description: Evolve data models and queries safely with explicit constraints, indexes, migrations, and recovery planning.
---

# Database Engineering

## When to use

Use for schema, query, indexing, transaction, migration, or data-retention
changes.

## When not to use

Do not choose or replace a database without workload and operational
evidence. Do not perform destructive data changes without explicit approval.

## Inputs and assumptions

Inspect the current database, data volume, ownership, query patterns,
consistency needs, migration tooling, backups, and deployment process.

## Workflow

1. Model entities, invariants, ownership, nullability, and lifecycle.
2. Define constraints in the database as well as application validation
   where appropriate.
3. Inspect real query patterns before adding indexes; consider write and
   storage cost.
4. Plan an additive migration, backfill, compatibility window, verification,
   and rollback or forward-recovery strategy.
5. Use transactions for multi-step invariants and bound long-running work.
6. Test against representative data and query plans.
7. Document retention, deletion, and backup implications.

## Decision rules

- Never assume a migration is reversible merely because a down script
  exists.
- Avoid locking table rewrites during critical traffic without analysis.
- Scope queries by tenant/owner where data is isolated.
- Do not log sensitive records for debugging.

## Example

For a required column, add it nullable, deploy code that writes it, backfill
and verify values, then enforce non-null in a later migration if the database
and deployment topology require staged rollout.

## Common failures

- Applying a schema change incompatible with the currently running app.
- Adding indexes without checking query plans or write load.
- Deleting records before retention and recovery requirements are known.

## Validation

Test migration on representative data, correctness and constraints, query
performance, deployment compatibility, backups, and recovery.
