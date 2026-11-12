---
name: javascript-typescript
description: Build reliable JavaScript and TypeScript features using the existing runtime, module system, types, and project tooling.
---

# JavaScript and TypeScript Engineering

## When to use

Use when implementing or reviewing JavaScript/TypeScript application,
library, CLI, or browser code.

## When not to use

Do not migrate JavaScript to TypeScript as incidental cleanup. Do not add a
framework, transpiler, or runtime dependency if the project does not need it.

## Inputs and assumptions

Read `package.json`, lockfile, runtime and compiler versions, module format,
tsconfig, lint rules, tests, and nearby patterns. Determine whether code
runs in Node.js, a browser, or multiple environments.

## Workflow

1. Match the repository's ESM/CommonJS conventions and supported runtime.
2. Define types at public boundaries and use inference for obvious local
   values; avoid `any` and unsafe casts.
3. Validate external input (HTTP, files, environment, JSON) at runtime.
   Static TypeScript types do not validate untrusted data.
4. Use `async`/`await` with explicit rejection handling, cancellation, and
   timeouts where appropriate.
5. Prefer immutable transformations and explicit data ownership; avoid
   hidden global mutable state.
6. Preserve stable API contracts and document intentional breaking changes.
7. Add behavior-focused unit/integration tests and run repository checks.

## Decision rules

- Use native platform APIs unless a dependency provides necessary behavior.
- Treat `JSON.parse`, network responses, and environment values as untrusted.
- Avoid `!`, `as`, or `any` when a guard or schema can express the contract.
- Keep browser-only APIs out of server modules and Node-only APIs out of
  browser bundles.
- Do not silence errors or return success-shaped fallbacks.

## Example

```ts
type Result<T> = { ok: true; value: T } | { ok: false; error: Error };

function parsePort(value: string | undefined): Result<number> {
  const port = Number(value);
  return Number.isInteger(port) && port > 0 && port <= 65535
    ? { ok: true, value: port }
    : { ok: false, error: new Error("PORT must be an integer from 1 to 65535") };
}
```

## Common failures

- Assuming TypeScript declarations validate runtime inputs.
- Mixing module formats or relying on an unsupported Node feature.
- Catching errors and continuing with invalid or fabricated data.
- Writing brittle tests that assert private implementation details.

## Validation

Run the project's formatter/linter, type-check, targeted tests, and build.
Check supported runtime compatibility, malformed inputs, and error paths.
