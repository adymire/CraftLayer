---
name: admin-panel
description: Design administrative interfaces for safe, permission-aware management of users, settings, and operational data.
---

# Admin Panel

## When to use

Use for organization or product administration such as managing members,
settings, policies, and operational records.

## When not to use

Do not expose global platform controls in an organization admin experience
or build controls without an authorization requirement.

## Inputs and assumptions

Identify admin roles, scope (organization/project), permissions, high-risk
actions, audit needs, data volume, and current access-control model.

## Workflow

1. State the active organization and admin scope prominently.
2. Group controls by task and risk; distinguish routine settings from
   destructive actions.
3. Show role and permission consequences before changing access.
4. For destructive or security-sensitive actions, explain impact, require
   appropriate confirmation, and provide recovery information where possible.
5. Record actor, target, time, and outcome in the backend audit trail.
6. Handle partial failure and stale data explicitly.
7. Verify UI gating is backed by server-side authorization.

## Decision rules

- Least privilege is the default.
- Do not rely on obscured buttons as authorization.
- Avoid destructive bulk actions without a preview and scope confirmation.
- Keep audit history read-only and filterable by meaningful fields.

## Example

Removing a member should show which organization is affected and what access
ends; if ownership transfer is required, resolve it before removal.

## Common failures

- Ambiguous scope, especially in multi-organization products.
- Dangerous actions next to routine controls without distinction.
- UI-only role checks or unaudited privilege changes.

## Validation

Test authorized and unauthorized roles, scope boundaries, confirmation,
audit events, partial errors, and accessible keyboard operation.
