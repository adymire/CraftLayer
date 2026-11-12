# Security quality rules

- Treat user input, remote files, API responses, and model output as
  untrusted.
- Enforce authentication, authorization, and tenant boundaries server-side.
- Protect secrets and sensitive data in logs, output, and persisted files.
- Validate paths and data before writing; stage risky changes and support
  safe recovery.
- Do not execute downloaded content during installation.
- Require approval for destructive, external, or privileged actions when
  scope or consequences are significant.
- Test security boundaries and report evidence without overstating certainty.
