---
name: ai-chat-interface
description: Design AI chat experiences with clear streaming, sources, tool activity, failure recovery, and user control.
---

# AI Chat Interface

## When to use

Use for conversational AI, assistants, support bots, or chat surfaces that
generate or retrieve responses.

## When not to use

Do not use chat as a universal interface when a form, table, or direct
workflow better supports the user's task.

## Inputs and assumptions

Identify user intent, model/provider, streaming behavior, available tools,
source grounding, privacy rules, conversation persistence, and failure
semantics.

## Workflow

1. Set expectations about capabilities, limitations, and data handling.
2. Distinguish user messages, assistant responses, citations, and tool
   activity.
3. Show generation progress and allow cancellation; do not imply completion
   before the stream ends.
4. Make citations inspectable and connect each source to the claims it
   supports.
5. Provide retry/edit/regenerate controls with clear consequences.
6. Preserve conversation context and label failures without discarding user
   input.
7. Support keyboard navigation, announced new output, and long-response
   reading.

## Decision rules

- Assistant output may be wrong; avoid trust signals that imply certainty.
- Show meaningful tool status without exposing secrets or unsafe internals.
- Make data retention and conversation deletion behavior clear.
- Do not silently drop partial output or user messages.

## Example

During a tool call, show a pending status, then a completed or failed result;
render the final answer as complete only after the operation finishes.

## Common failures

- A spinner with no cancellation or progress context.
- Sources shown but not tied to claims.
- Streaming UI that duplicates or loses content on retry.

## Validation

Test streaming, cancellation, retry, tool failure, source links, keyboard
and screen-reader announcements, long responses, and persistence rules.
