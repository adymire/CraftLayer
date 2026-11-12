---
name: integrations-and-webhooks
description: Connect external services with verified signatures, bounded retries, idempotency, timeouts, and observable delivery.
---

# Integrations and Webhooks

## When to use

Use for third-party APIs, inbound webhooks, outbound event delivery, or
background synchronization.

## When not to use

Do not build a custom integration layer before identifying the external
contract, supported use cases, and operational needs.

## Inputs and assumptions

Inspect provider docs, authentication model, rate limits, event ordering,
retry policy, idempotency, privacy, and failure ownership.

## Workflow

1. Pin and document the provider contract and supported event/API version.
2. Verify inbound webhook authenticity using the provider's recommended
   signature method and constant-time comparison where applicable.
3. Validate payload structure and reject or quarantine unsupported events.
4. Make processing idempotent and safe under duplicate or out-of-order
   delivery.
5. Use timeouts, bounded retries with backoff, and provider rate limits.
6. Store delivery state and correlation IDs without logging secrets.
7. Provide replay/recovery controls with permission checks and audit.
8. Test invalid signatures, duplicates, timeouts, rate limits, and partial
   provider failures.

## Decision rules

- Never trust a webhook because it arrived over HTTPS alone.
- Acknowledge only according to the provider's delivery contract.
- Do not retry non-idempotent side effects blindly.
- Keep provider credentials in managed secret configuration.

## Example

For an order-created webhook, verify signature, persist an idempotency key,
then enqueue processing; a duplicate delivery should not create a second
order.

## Common failures

- Accepting spoofed events or replayed payloads.
- Unbounded retries and queue growth.
- Returning success before required durable acceptance.

## Validation

Exercise signature verification, deduplication, ordering, retry limits,
timeouts, secret redaction, and operational replay.
