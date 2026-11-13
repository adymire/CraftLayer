# Evidence-led interface audit

The goal is to improve the interface's fit for its product and users. This
is not a style blacklist or a mandate to replace familiar conventions.

## Audit one task at a time

Name the screen, user, and task being reviewed. Inspect the implementation
and, when available, a rendered state at the target viewport. Trace the
important action through its destination or resulting state. Do not infer
that a control is broken from appearance alone.

## Record actionable findings

Use one row per finding:

| Field | Guidance |
|---|---|
| Severity | Critical, high, medium, or low; based on task impact |
| Classification | Objective defect, evidence-backed concern, or subjective preference |
| Evidence | Observable behavior, code, content, or reproducible viewport |
| User impact | What task, comprehension, trust, or access is affected? |
| Recommendation | Smallest change that addresses the evidence |
| Acceptance check | How will the team verify the correction? |

Severity is not visual loudness. A broken primary action, inaccessible
control, or misleading metric can be high severity; a palette preference
usually is not.

### Suggested severity anchors

- **Critical:** blocks a core task, exposes or misrepresents sensitive data,
  or creates a dangerous irreversible action without an adequate guard.
- **High:** a primary workflow is unreliable, inaccessible, or materially
  misleading, with no reasonable workaround.
- **Medium:** a common task is slower or error-prone, or an important state
  is unclear.
- **Low:** a contained inconsistency or polish issue with limited task impact.

Adjust the labels to the project's own triage conventions.

## Distinguish observation from taste

Examples:

- **Objective:** the mobile layout clips the save button at 320 CSS pixels.
- **Evidence-backed concern:** the only primary action appears after a long
  unrelated table, contrary to the stated task sequence.
- **Subjective preference:** the reviewer prefers left alignment to the
  current centered composition, with no usability evidence.

Only the first two justify a corrective recommendation. Record the third as
a preference, not a defect or release blocker.

## Repair without replacing identity

1. Fix functional and access barriers before aesthetic refinements.
2. Preserve useful content, workflows, and established brand choices.
3. Change a coherent system—hierarchy, spacing, type, color, or surfaces—
   rather than adding isolated decoration.
4. Keep familiar patterns when they help users predict behavior.
5. Use realistic data and authentic assets; label prototypes and fixtures.
6. Re-test the exact journey and affected states after the change.

## Report template

```text
Screen / task:
Scope inspected:

1. [Severity] [Classification] Finding
   Evidence:
   User impact:
   Recommended change:
   Acceptance check:

Preserved behavior:
Remaining trade-offs:
Viewports and states checked:
```

## Review checklist

- [ ] Findings cite observable evidence, not just visual taste.
- [ ] The severity reflects task impact and available workarounds.
- [ ] Useful product-specific patterns and behavior are preserved.
- [ ] Recommendations have verifiable acceptance checks.
- [ ] The revised view is checked at narrow and wide sizes and with keyboard input.
