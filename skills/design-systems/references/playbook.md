# Token and component contract guide

Treat a design system as a maintained interface between product design and
implementation. Add a primitive when it solves a repeated need; do not
create a token or component just to complete a scale.

## Inventory before adding

Search the current source of truth for:

- Theme files, CSS variables, utility configuration, and library defaults
- Repeated component patterns and local overrides
- Supported themes, contrast modes, breakpoints, and browser targets
- Owners, consumers, and existing migration conventions

Record which values are canonical and which are accidental duplicates.

## Define token layers

Prefer a clear mapping:

```text
semantic token  -> product meaning, such as surface-danger
theme value     -> a color or measurement for the active theme
component usage -> where and how the token is applied
```

Use semantic names for roles and state. A palette may exist underneath, but
components should not depend on names like `blue-600` when the product means
"focus indicator." Do not introduce redundant aliases unless they preserve
a documented compatibility boundary.

## Define component contracts

For each shared component, document only the behavior consumers need:

- Purpose and appropriate / inappropriate use
- Required and optional content
- Variants that represent real semantic differences
- States, including disabled, loading, invalid, and focus as applicable
- Keyboard and screen-reader behavior
- Responsive constraints and overflow behavior
- Token ownership and extension points

Avoid unrelated boolean props that allow contradictory states. Prefer a
small set of named variants with explicit contracts.

## Migrate in a controlled slice

1. Add or adapt the semantic token in the current theme mechanism.
2. Update one representative component or screen.
3. Check all supported themes and interactive states.
4. Search for direct overrides and duplicate definitions.
5. Add a focused test or visual check for the changed contract.
6. Expand adoption in bounded batches; retain compatibility until consumers
   are migrated and verified.
7. Remove superseded values only after a repository-wide usage check.

For a breaking token or API change, state the migration path and timing. Do
not silently change global meaning to fix one screen.

## Contrast and state checks

Test actual foreground/background pairs, including hover, focus, disabled,
and status states in each supported theme. Color is not the only signal:
include text, shape, iconography, or another cue where state affects
comprehension. Make keyboard focus visible and unobscured.

## Review checklist

- [ ] A real repeated need justifies each new token or component.
- [ ] There is one documented source of truth for values and behavior.
- [ ] Semantics are separated from theme-specific values.
- [ ] Component states and keyboard behavior are described and tested.
- [ ] A representative consumer was migrated before wider adoption.
- [ ] Existing themes and consumers have a safe migration path.
- [ ] Documentation explains decisions and extension rules, not just values.
