# Frontend feature execution guide

Follow the repository's existing architecture. This guide is a checklist
for tracing behavior, not a prescription to add layers or libraries.

## Trace the feature

Before editing, locate:

- Route / entry point and the component that owns the interaction
- Existing state and data-fetching patterns
- API request and response contracts
- Validation, error display, and notification conventions
- Styling tokens and responsive behavior
- Test commands and nearby tests that establish project idioms

Write down the user-visible result and the boundary that owns each
responsibility. Reuse an existing helper if it already handles the case.

## Model async work explicitly

For a data-driven view, define the states the flow can actually reach:

| State | Expected behavior |
|---|---|
| Initial | Avoid implying a request has completed when it has not. |
| Loading | Communicate progress without hiding required context. |
| Empty | Offer a next step when the absence is actionable. |
| Success | Render validated data and preserve user-visible ordering. |
| Error | Explain the failure at the right level and offer recovery if safe. |
| Stale / replaced | Prevent an obsolete request from overwriting newer intent. |

Use the project's cancellation or request-key pattern. If a request cannot
be cancelled, guard state updates with the current query or request identity.
Do not silently map failure to an empty success state. Keep duplicate
submits and retries aligned with the operation's semantics.

At network and storage boundaries, treat values as untrusted. Type
assertions alone do not validate JSON; use the repository's runtime schema
or a narrow explicit guard where one already exists.

## Interaction and accessibility

- Prefer native controls with labels and correct input types.
- Keep keyboard focus visible and in a logical order after updates.
- Expose validation and async status to assistive technology where needed.
- Do not communicate errors or status by color alone.
- Preserve focus and context when dialogs, routes, or result lists change.
- Ensure actions remain available at narrow widths and with long content.

## Test behavior, not component internals

Write focused tests for the changed contract:

1. Successful response updates the expected visible result.
2. Empty and invalid inputs follow the product's rules.
3. Failure is visible and does not masquerade as success.
4. A stale response cannot replace newer user intent.
5. Keyboard or form behavior works where the interaction changes.

Use deferred promises or controlled fixtures for race tests instead of
timing sleeps. Avoid tests that only assert private state or markup snapshots.

## Completion record

Record the user-visible behavior changed, files / boundaries touched,
commands run, and any unverified assumption. If the task requested only a
plan, stop before editing and present the checks that would prove it.

## Review checklist

- [ ] Existing route, state, API, styling, and test patterns were inspected.
- [ ] Loading, empty, error, success, and stale states are handled when relevant.
- [ ] Untrusted boundary data is validated without unsafe assumptions.
- [ ] Keyboard and assistive-technology behavior is preserved.
- [ ] Tests cover the regression and meaningful failure path.
- [ ] No unrelated framework, dependency, or architecture migration was added.
