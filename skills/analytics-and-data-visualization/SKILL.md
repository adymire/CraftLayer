---
name: analytics-and-data-visualization
description: Select and implement data representations that accurately answer user questions and communicate uncertainty.
---

# Analytics and Data Visualization

## When to use

Use for charts, reporting, analytics, data exploration, or visualization
components.

## When not to use

Do not use a chart when a concise number, explanation, or accessible table
communicates the result better.

## Inputs and assumptions

Establish the question, data source, units, aggregation, time zone, missing
data, audience, and actions the visualization should enable.

## Workflow

1. Define the question and comparison before choosing a chart type.
2. Verify data shape, units, time bounds, aggregation, and missing values.
3. Choose a visual encoding that matches the data: position for precise
   comparison, line for ordered trends, bars for categories, and tables for
   exact records.
4. Label axes, units, periods, and relevant baselines; disclose normalized,
   sampled, or estimated data.
5. Provide keyboard-accessible interaction and a text/table equivalent for
   essential information.
6. Avoid misleading scales, decorative 3D, and color-only distinctions.
7. Test edge cases such as zero, negative, missing, and extreme values.

## Decision rules

- Never imply causation from a visual correlation.
- Preserve the data's meaning when filtering and aggregating.
- Use color palettes with adequate contrast and non-color cues.
- State when values are illustrative or synthetic.

## Example

A time-series comparison should use the same time zone and interval for both
periods; explain gaps where telemetry is missing instead of drawing a
continuous line.

## Common failures

- Truncated axes that exaggerate small differences.
- Unlabeled percentages and inconsistent time ranges.
- Tooltips as the only source of exact values.

## Validation

Check source and calculation, labels, scale, missing-data behavior,
keyboard/screen-reader alternative, and small-screen legibility.
