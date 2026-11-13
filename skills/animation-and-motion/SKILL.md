---
name: animation-and-motion
description: Use accessible, performant motion to communicate state, feedback, and spatial relationships in interfaces.
---

# Animation and Motion

## When to use

Use when motion clarifies a state transition, response, hierarchy, or
relationship, or when reviewing animation in a product interface.

## When not to use

Do not add motion merely to decorate a screen, delay access to content, or
make required information available only through animation.

## Inputs and assumptions

Inspect interaction purpose, platform, device performance, existing motion
tools, reduced-motion support, keyboard/touch use, and whether the animation
is essential to comprehension.

## Workflow

1. State what user action or system state the motion communicates.
2. Prefer small transitions on opacity or transform; avoid layout churn and
   long blocking sequences.
3. Keep timing and easing consistent with related interactions.
4. Make controls usable immediately and avoid preventing cancellation,
   navigation, or repeated input.
5. Respect `prefers-reduced-motion`; remove nonessential movement or replace
   it with a clear static state.
6. Test on touch, keyboard, reduced-motion settings, and representative
   lower-powered devices.
7. Verify animations do not obscure focus, content, or status announcements.

## Decision rules

- Motion communicates feedback or continuity; it is not a substitute for
  accessible state.
- Keep important content visible if animation fails or is disabled.
- Choose CSS or an existing motion library before adding another dependency.
- Avoid flashing, rapid repeated movement, parallax that disorients, and
  unbounded animation loops.

## Example

```css
.panel {
  transition: opacity 160ms ease, transform 160ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .panel {
    transition: none;
  }
}
```

Ensure the panel's state and content remain understandable without motion.

## Common failures

- Animating height or position in a way that causes layout jank.
- Ignoring reduced-motion preferences.
- Using motion to indicate success without accessible text or status.
- Overusing scroll effects that compete with reading.

## Validation

Check reduced-motion behavior, keyboard focus, touch input, timing,
performance, non-animated comprehension, and whether the motion supports a
specific user task.

## Supporting guide

Use the [motion specification and review guide](references/playbook.md) when
several transitions need consistent timing or when motion affects navigation,
feedback, or layout.
