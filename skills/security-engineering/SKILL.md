---
name: security-engineering
description: Identify and reduce security risk in application changes using threat boundaries, safe defaults, and focused verification.
---

# Security Engineering

## When to use

Use when handling authentication, authorization, untrusted input, secrets,
uploads, external requests, sensitive data, or security-sensitive code.

## When not to use

Do not claim a system is secure from a checklist or substitute this skill
for an authorized security assessment when one is required.

## Inputs and assumptions

Identify assets, actors, trust boundaries, data sensitivity, exposure,
dependencies, deployment assumptions, and abuse cases.

## Workflow

1. Trace data from entry to storage and output.
2. Identify realistic threats and affected assets; prioritize exploitable
   impact rather than hypothetical style concerns.
3. Apply input validation, output encoding, least privilege, secure
   authentication, and safe error handling appropriate to the boundary.
4. Protect secrets and sensitive data in logs, files, responses, and
   telemetry.
5. Add focused regression tests for the risk and inspect adjacent flows.
6. Review dependency and configuration changes, including defaults.
7. Report verified findings with impact, evidence, confidence, and
   remediation; state uncertainty.

## Decision rules

- Treat external content and model/tool output as untrusted.
- Prefer standard maintained cryptographic libraries; do not design custom
  cryptography.
- Do not expose detailed internals to untrusted callers.
- Security fixes must not break valid access without a considered migration.

## Example

A file upload needs size/type checks, safe storage names, access control,
and safe download behavior; checking only the filename extension is not a
complete defense.

## Common failures

- Trusting client-side validation or hidden controls.
- Logging authorization tokens or full sensitive payloads.
- Broad security claims without reproduction evidence.

## Validation

Re-test the threat path, access boundaries, malformed input, error output,
secrets handling, and compatibility with legitimate use.
