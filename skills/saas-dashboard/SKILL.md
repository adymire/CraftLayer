---
name: saas-dashboard
description: Design SaaS workspaces for onboarding, recurring work, account context, and clear paths to product value.
---

# SaaS Dashboard

## When to use

Use for authenticated SaaS landing dashboards, organization workspaces,
onboarding, or recurring product workflows.

## When not to use

Do not assume every SaaS home needs KPI cards, a sales funnel, or a
marketing-style hero. Follow the actual product task.

## Inputs and assumptions

Identify roles, organization and project context, first-session state,
recurring actions, entitlements, and available real data.

## Workflow

1. Establish which workspace or account the user is in and how to switch it.
2. Prioritize the next useful action and recent relevant activity.
3. For new accounts, provide a concrete first-run path with progress and
   optional setup steps.
4. Reflect permissions and plan entitlements accurately; explain unavailable
   actions and upgrade paths without blocking unrelated work.
5. Include loading, no-data, failure, stale-data, and completed onboarding
   states.
6. Keep global navigation and page-level actions predictable.
7. Test role changes, multiple workspaces, narrow screens, and returning
   sessions.

## Decision rules

- Show metrics only when they help the user's next decision.
- Do not use onboarding to force unnecessary data collection.
- Preserve access to core tasks when optional setup is incomplete.
- Clearly distinguish account-level from project-level data.

## Example

For a design collaboration product, a first visit can guide workspace
creation, importing a project, or joining an invitation; an empty KPI grid
does not help the user reach value.

## Common failures

- The same dashboard for every role and lifecycle stage.
- Unclear organization context or inaccessible workspace switching.
- Empty states that merely say “No data”.

## Validation

Verify workspace/role context, first-run and return flows, entitlements,
empty/loading/error states, and clear access to recurring tasks.
