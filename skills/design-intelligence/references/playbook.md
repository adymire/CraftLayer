# Design brief and decision guide

Use this guide to turn an interface request into a small, reviewable design
decision—not a speculative redesign.

## 1. Separate evidence from assumptions

Create a short inventory before selecting a direction:

| Topic | Record |
|---|---|
| User and role | Who is doing the task, and with what permissions? |
| Trigger | What brought the user to this screen or flow? |
| Primary outcome | What should be possible when the task is complete? |
| Current behavior | What does the product already do? Link to code or evidence. |
| Constraints | Existing components, stack, brand, content, platform, deadline |
| Unknowns | Only questions that could change the interaction or scope |

Label each statement as **observed**, **provided**, or **assumed**. Do not
convert missing information into invented product rules. If an unknown is
blocking, ask a concise question; otherwise state a reversible assumption.

## 2. Map the task before styling it

Write the shortest useful journey:

1. Entry point and context
2. Information the user needs to act
3. Decision or input
4. Confirmation or consequence
5. Result, recovery, or next step

For each step, identify permission checks, validation, and interruption or
failure behavior. A journey with no meaningful choices may need a simpler
screen, not a wizard.

## 3. Choose direction through constraints

Select one direction that is consistent with the product and task. Record:

- Information hierarchy and reading order
- Density and content grouping
- Type roles and semantic color intent
- Existing tokens and components to reuse
- Responsive transformation, not just a smaller screenshot
- Image, icon, or illustration source and its purpose

Prefer the existing product's established language. A new pattern is
justified only when the old one fails a defined user need or constraint.

## 4. Define states and boundaries

For each interactive region, note which states apply:

| State | Design question |
|---|---|
| Initial | What is already known, and what is the next useful action? |
| Loading | Is progress real, and can the user continue or cancel? |
| Empty | Is this genuinely no data, not a failed request? |
| Error | What failed, what was preserved, and how can the user recover? |
| Success | Is completion explicit, and is another action available? |
| Disabled | Why is the action unavailable, and is that reason perceivable? |
| Permission denied | Is restricted data or action still protected server-side? |

Do not add every state to every component; include the states the actual
flow can reach.

## 5. Produce a reviewable handoff

Before implementation or approval, summarize:

```text
Problem and primary user:
Primary journey:
Visual and interaction direction:
Existing patterns to reuse:
Verified facts:
Assumptions / open questions:
Out of scope:
Acceptance checks:
```

Keep the handoff tied to repository evidence. A screenshot or mockup does
not prove keyboard access, responsive behavior, or correct data handling.

## Review checklist

- [ ] The primary task and user are explicit.
- [ ] Existing routes, components, tokens, and responsive patterns were inspected.
- [ ] Assumptions are labeled; blocking unknowns are surfaced.
- [ ] States and failure recovery match the real product flow.
- [ ] The proposal changes only the scope needed to solve the task.
- [ ] Acceptance checks cover keyboard use, content hierarchy, and narrow layouts.
