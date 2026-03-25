---
title: "Package Manager"
language: "nim"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Nim's package manager is **Nimble**. Packages are hosted on the Nimble package directory (packages.nim-lang.org) or directly from Git repositories. `nimble install` fetches and installs packages. Projects define their dependencies in a `.nimble` file. Nimble also acts as a task runner.

## Example

```nim
# my_project.nimble
version       = "0.1.0"
author        = "Alice"
description   = "A sample Nim project"
license       = "MIT"

# Dependencies
requires "nim >= 2.0.0"
requires "jester >= 0.6.0"
requires "results >= 0.5.0"

# Nimble tasks
task build, "Compile the project":
  exec "nim c -d:release src/main.nim"

task test, "Run the tests":
  exec "nim c -r tests/all.nim"
```

```bash
# Create a new project
nimble init my_project
cd my_project

# Install dependencies (from .nimble file)
nimble install

# Install a specific package globally
nimble install jester

# Search the package directory
nimble search json

# Run the project
nimble run

# Run tests
nimble test

# Build a release binary
nimble build -d:release
```

## Gotchas

- Nimble installs packages globally by default; use `nimble develop` for local development mode.
- Package versioning uses semantic versioning; `requires "pkg >= 1.2"` is a lower-bound constraint.
- The `.nimble` file is itself a Nim-like DSL; you can use Nim code for complex build logic.
