# Motion specification and review guide

Motion is part of interaction behavior. Specify what it communicates and
what remains usable when it is skipped, interrupted, or disabled.

## Write a motion specification

For each transition, document:

```text
Trigger:
State before -> state after:
User-facing purpose:
Properties animated:
Duration / easing:
Reduced-motion behavior:
Interruption / repeated-input behavior:
Accessibility and performance checks:
```

If the purpose cannot be stated in one sentence, reconsider whether motion
is needed. Essential state should also be represented semantically and in
text.

## Implementation choices

- Prefer an existing animation system or simple CSS transition.
- Animate opacity and transform where suitable; avoid repeated layout and
  paint work on large regions.
- Keep controls and destination content available without waiting for motion.
- Avoid autoplay and continuous movement unless it is necessary and user
  controlled.
- Ensure animation does not cover focused controls or obscure a status
  message.
- Avoid flashing, rapid oscillation, or motion that can disorient.

Use `prefers-reduced-motion` to remove or substantially reduce nonessential
movement. Do not merely shorten a long animation if the remaining motion is
still unnecessary. Preserve the final visual and semantic state.

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

The timing is an example, not a universal design token. Follow the product's
existing motion system when one exists.

## Test the interaction

Check both states and the transition between them:

- Keyboard activation, focus placement, and repeated activation
- Touch interaction and interruption by navigation or dismissal
- Reduced-motion setting and a no-motion final state
- Slow or interrupted rendering, including content visibility
- Layout stability and performance on representative devices
- Accessible name, expanded/collapsed state, and status announcement

## Review checklist

- [ ] Every transition has a clear user-facing purpose.
- [ ] Content and controls work immediately without waiting for animation.
- [ ] Reduced motion removes nonessential movement.
- [ ] Focus, state semantics, and announcements remain clear.
- [ ] Timing matches related product interactions and remains interruptible.
- [ ] No avoidable layout jank, flashing, or unbounded motion is introduced.
