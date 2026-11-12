---
name: super-admin-panel
description: Design privileged platform-operator tools with strict authorization, auditability, safeguards, and operational clarity.
---

# Super-admin Panel

## When to use

Use only for explicitly privileged, platform-wide operational interfaces
that can affect tenants, security, billing, or availability.

## When not to use

Do not use for ordinary organization administration or to create an
unaudited shortcut around product permissions.

## Inputs and assumptions

Confirm operator roles, authorization policy, tenant boundaries, incident
procedures, approval requirements, sensitive data policy, and audit
retention.

## Workflow

1. Define the minimum operator tasks and least-privilege permission for each.
2. Require strong server-side authorization and appropriate re-authentication
   for sensitive operations.
3. Display tenant, environment, and target identity on every consequential
   action.
4. Add reason capture, preview, scoped confirmation, and approval or
   dual-control for high-impact changes as policy requires.
5. Log actor, reason, target, request ID, before/after state where safe, and
   result; protect logs from tampering.
6. Prevent cross-tenant exposure in search, exports, and detail routes.
7. Provide safe failure, rollback, and incident-response paths.

## Decision rules

- Privilege is explicit, narrow, time-bounded where feasible, and reviewed.
- Never display secrets or unrelated tenant data to simplify operations.
- Prefer reversible actions; require additional checks for irreversible
  operations.
- Do not treat hidden navigation or client flags as access control.

## Example

A tenant suspension flow should explain user impact, verify the selected
tenant and environment, capture the operator reason, enforce authorization
on the server, and create an audit event.

## Common failures

- “God mode” access without scoped roles or traceability.
- Cross-tenant search results leaking data.
- Confirmation dialogs that do not identify the target or consequences.

## Validation

Review threat scenarios, authorization tests, tenant isolation, audit
completeness, re-authentication, failure recovery, and permission review.
