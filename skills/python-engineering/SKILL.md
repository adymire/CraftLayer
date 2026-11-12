---
name: python-engineering
description: Implement maintainable Python features using the project's supported versions, packaging, typing, tests, and runtime conventions.
---

# Python Engineering

## When to use

Use for Python application, library, CLI, automation, data, or backend code.
It is also useful when a repository contains Python tooling alongside
TypeScript/JavaScript.

## When not to use

Do not add Python as a second runtime to a TypeScript-only product without
an explicit need. Do not change the supported Python range or package
manager as unrelated cleanup.

## Inputs and assumptions

Inspect `pyproject.toml`, lockfiles, supported Python range, virtual
environment, package layout, formatter/linter/type checker, test runner,
and neighboring code. Confirm whether the module is public API or internal.

## Workflow

1. Follow the existing package and import structure; avoid implicit
   dependencies on the current working directory.
2. Type public functions and domain boundaries. Use precise built-in or
   project-defined types; model invalid/optional states explicitly.
3. Validate external data and configuration at entry points.
4. Keep side effects (filesystem, network, subprocess, database) explicit
   and injectable where project tests require it.
5. Use context managers for resources and structured exceptions that
   callers can handle; do not catch broadly and suppress failures.
6. Add tests for normal, boundary, and failure behavior with isolated
   temporary resources.
7. Run the configured formatter, linter, type checker, and tests under the
   project's supported interpreter.

## Decision rules

- Preserve the project's minimum and maximum tested Python versions.
- Avoid mutable default arguments, broad `except Exception`, and hidden
  module-level I/O.
- Use standard library facilities unless a dependency has a clear purpose.
- Do not build shell commands by concatenating untrusted values; pass
  argument arrays and validate paths.
- Document when a function mutates data or performs I/O.

## Example

```python
from pathlib import Path

def read_config(path: Path) -> str:
    if not path.is_file():
        raise FileNotFoundError(f"Configuration file not found: {path}")
    return path.read_text(encoding="utf-8")
```

## Common failures

- Testing only on the developer's interpreter instead of the declared range.
- Returning `None` for unrelated failures without documenting it.
- Assuming strings, decoded JSON, or environment values have valid shapes.
- Adding a global cache that leaks test state or tenant data.

## Validation

Run the repository's formatter, linter, type checker, and test suite.
Exercise missing/invalid input and filesystem/network failures. Confirm
packaging and imports work from outside the repository root.
