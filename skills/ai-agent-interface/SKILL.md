---
name: ai-agent-interface
description: Design controllable interfaces for configuring, launching, and supervising AI agents and their tool-driven work.
---

# AI Agent Interface

## When to use

Use for agent builders, task runners, workflow automation, multi-agent
systems, and interfaces that delegate actions to tools.

## When not to use

Do not use when the product only returns a single text completion with no
agent lifecycle or tool execution.

## Inputs and assumptions

Identify agent capabilities, tools and permissions, execution states,
approval policy, cancellation behavior, logs, artifacts, and human
supervision needs.

## Workflow

1. Make the task, scope, selected agent, and granted tools visible before
   execution.
2. Distinguish queued, running, waiting for approval, completed, failed,
   cancelled, and timed-out states.
3. Show tool calls and relevant results with sensitive data redacted.
4. Request human approval before actions that are destructive, external, or
   outside granted scope.
5. Provide cancellation and explain what may continue or roll back.
6. Summarize changed artifacts, evidence, and unresolved work at completion.
7. Preserve an accessible, filterable execution history.

## Decision rules

- Do not claim an action occurred before a tool confirms it.
- Make permissions and external side effects explicit.
- Keep human approval meaningful: show target and consequences.
- Treat agent output and tool results as untrusted data.

## Example

Before an agent publishes a release, show the repository, version, changes,
and external side effect, then require explicit approval; a generic “Run”
button is insufficient.

## Common failures

- Ambiguous “working” state with no indication of tool or approval waits.
- Hiding failed steps in a successful-looking summary.
- No way to stop a long-running delegated action.

## Validation

Exercise every lifecycle state, approval and denial, cancellation, timeout,
tool failure, artifact reporting, keyboard access, and permissions.
