---
name: dashboard-design
description: Design data-dense dashboards around real decisions, domain workflows, permissions, and accessible data presentation.
---

# Dashboard Design

## When to use

Use for analytics, operations, finance, CRM, project, commerce, marketing,
or other data-oriented product workspaces.

## When not to use

Do not use dashboard conventions for a simple content page or force charts
into a workflow that is better represented by a list, detail view, or
action queue.

## Inputs and assumptions

Identify user roles, recurring tasks, decision frequency, source and
freshness of data, metrics definitions, data volume, filters, permissions,
device context, and operational risk.

## Workflow

1. Map user questions and actions, not just available database fields.
2. Prioritize a small set of decision-relevant summaries; define units,
   time ranges, comparison periods, and metric provenance.
3. Choose visual forms by task: table for exact comparison, chart for trend
   or distribution, queue for pending work, detail view for investigation.
4. Design navigation, filters, search, sorting, pagination, and drill-down
   relationships explicitly.
5. Define loading, empty, error, stale, partial-data, and permission-denied
   states.
6. Use data with realistic variation; clearly label fixture or synthetic
   values.
7. Make dense interfaces responsive without hiding essential actions or
   relying on hover alone.
8. Validate chart text alternatives, table semantics, contrast, keyboard
   behavior, and the underlying calculations.

## Decision rules

- Every KPI needs a definition, unit, period, and source.
- Do not imply causal meaning from a correlation chart.
- Never fabricate business metrics or silently substitute missing values.
- Use consistent filters across connected views and expose applied filter
  state.
- Respect role and tenant boundaries in both UI and API.

## Example

A revenue dashboard might pair a period-filtered total and comparison with
a trend chart, then a transaction table for exact records. Define gross vs.
net, currency, timezone, and whether refunds are included before labeling
the metric.

## Common failures

- Generic KPI cards without user decisions or clear definitions.
- Unlabeled axes, truncated units, or charts that conceal data gaps.
- Filters that appear global but apply only to one panel.
- Empty states that provide no next step.

## Validation

Check metric definitions and calculations, filters, table controls, data
freshness, permission states, keyboard and screen-reader descriptions,
responsive density, and realistic empty/error cases.
