---
name: authentication-and-rbac
description: Design identity and authorization flows that enforce least privilege, tenant isolation, and safe session handling.
---

# Authentication and RBAC

## When to use

Use for login, sessions, invitations, organization membership, roles,
permissions, API credentials, or authorization changes.

## When not to use

Do not invent a custom cryptographic protocol or treat frontend hiding as
authorization.

## Inputs and assumptions

Identify identity provider, account lifecycle, tenant model, roles,
resources, session requirements, recovery, audit, and regulatory constraints.

## Workflow

1. Separate authentication (who) from authorization (may do what).
2. Define resource/action permissions and inheritance explicitly.
3. Enforce checks server-side at every access path, including APIs, jobs,
   exports, and nested resources.
4. Prevent cross-tenant access by deriving scope from trusted identity and
   membership, not user-supplied tenant IDs alone.
5. Use secure session/token storage, expiration, rotation, revocation, and
   CSRF protections as applicable.
6. Make invitation, role change, recovery, and account deletion flows
   resistant to enumeration and unauthorized takeover.
7. Audit security-sensitive changes and test both allowed and denied
   behavior.

## Decision rules

- Default to least privilege and deny by default.
- Never store plaintext passwords or expose credentials in logs.
- Use established identity libraries/providers where suitable.
- Re-check permission when asynchronous work executes.

## Example

An organization admin can change a member role only after the backend
confirms both the actor's current organization-admin permission and the
target's membership in that same organization.

## Common failures

- Checking roles only in client routes.
- Trusting client-supplied tenant identity.
- Long-lived credentials without rotation/revocation.

## Validation

Test anonymous, ordinary, admin, revoked, cross-tenant, expired-session,
and background-job access paths; review audit and recovery behavior.
