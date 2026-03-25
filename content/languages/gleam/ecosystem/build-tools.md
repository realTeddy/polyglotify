---
title: "Build Tools"
language: "gleam"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Gleam's build tool is the `gleam` CLI itself — there is no separate build system. It handles compilation, dependency management, running, testing, and formatting. The compiler targets both the BEAM (Erlang) and JavaScript (Node.js / Deno / browser). Gleam compiles to readable Erlang or JavaScript source code.

## Example

```sh
# Project lifecycle
gleam new my_project     # Scaffold a new project
gleam build              # Compile the project
gleam run                # Build and run src/{name}.gleam main()
gleam test               # Build and run tests
gleam clean              # Remove build artefacts

# Targeting
gleam build --target erlang      # Compile to Erlang (default)
gleam build --target javascript  # Compile to JavaScript

# Code quality
gleam format             # Format all .gleam files (in place)
gleam format --check     # Check formatting without writing

# Dependency management
gleam deps download      # Fetch all dependencies
gleam add gleam_json     # Add a package

# Publishing
gleam publish            # Publish to Hex (requires auth)
gleam hex retire ...     # Retire a published version
```

```toml
# gleam.toml — target can be set per-project
[gleam]
target = "erlang"  # or "javascript"
```

## Gotchas

- `gleam run` requires a `pub fn main()` in `src/{project_name}.gleam`.
- The generated Erlang/JavaScript output is in `build/` and is human-readable.
- Gleam does not have a watch mode built-in; use `watchexec` or `entr` from the shell.
- `gleam format` is opinionated and not configurable — this is intentional for consistency.
