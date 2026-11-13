# Dashboard metric and state guide

Begin with a decision or recurring task, not the available chart library or
database columns. Every displayed metric should help a user answer a
question or take a next action.

## Define a metric contract

Record the following before presenting a KPI or chart:

```text
Name and user-facing meaning:
Formula / inclusion rules:
Unit and currency:
Time zone and period boundaries:
Comparison period:
Source and refresh cadence:
Freshness / completeness status:
Owner and known limitations:
```

Clarify gross versus net, booked versus settled, refunds, deduplication,
rounding, and cohort boundaries where they affect interpretation. Do not
give two different calculations the same label.

## Represent data quality honestly

- **Zero** means measured absence; **missing** means unknown or unavailable.
- Label delayed refreshes with the relevant timestamp or freshness state.
- Preserve partial-data status when only part of a source succeeded.
- Keep the last known value only if it is marked stale and safe to show.
- Do not interpolate, convert null to zero, or imply certainty without a
  documented rule.
- Use synthetic fixtures only when clearly labeled outside production data.

## Match representation to the decision

| User need | Suitable starting point | Check |
|---|---|---|
| Exact records or ranking | Table | Sort, units, pagination, row actions |
| Change over time | Time series | Period, gaps, aggregation, comparison |
| Parts of a whole | Stacked / composition view | Categories sum correctly and remain legible |
| Pending work | Queue | Priority, ownership, age, next action |
| Investigate one entity | Detail view | Provenance, related records, permission |

Choose another form if it better supports the actual task. A chart should
not replace an accessible exact-value table when users need precise lookup.

## Specify filter and drill-down behavior

For every filter, define its scope, default, applied state, reset behavior,
and effect on every connected panel. Keep filter state visible and shareable
when the product supports it. A drill-down should carry enough context
(such as period and category) for the destination to explain its results.

## Permissions and empty states

Enforce tenant and role boundaries in the server/API as well as the UI.
Do not reveal restricted totals through aggregate cards or error messages.
For empty data, distinguish not configured, no records in this period,
filtered to no results, and access denied; give a relevant next action.

## Review checklist

- [ ] Metric names, formulas, units, periods, and source are explicit.
- [ ] Missing, stale, partial, and zero data remain distinguishable.
- [ ] Charts and tables answer a defined user question.
- [ ] Filters and drill-downs have consistent, visible scope.
- [ ] Empty, error, and permission-denied states are distinct.
- [ ] Permissions are enforced at the data boundary.
- [ ] Text alternatives and exact values are available without visual-only cues.
