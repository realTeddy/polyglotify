---
title: "Package Manager"
language: "gleam"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Gleam uses **Hex** as its package registry (shared with Erlang/Elixir) and manages dependencies via the `gleam` CLI. The `gleam.toml` file declares project metadata and dependencies. `gleam add` adds packages; `gleam update` updates them. The lockfile (`manifest.toml`) pins exact versions for reproducibility.

## Example

```toml
# gleam.toml
name = "my_app"
version = "1.0.0"
target = "erlang"

[dependencies]
gleam_stdlib = ">= 0.34.0 and < 2.0.0"
gleam_otp   = ">= 0.10.0 and < 2.0.0"
gleam_http  = ">= 3.6.0 and < 4.0.0"

[dev-dependencies]
gleeunit = ">= 1.0.0 and < 2.0.0"
```

```sh
# CLI commands
gleam new my_app          # Create a new project
gleam add gleam_json      # Add a dependency
gleam add --dev gleeunit  # Add a dev dependency
gleam update              # Update all dependencies
gleam deps download       # Download dependencies
gleam build               # Build the project
gleam run                 # Run the project
gleam test                # Run tests
```

## Gotchas

- Gleam shares the Hex registry with Erlang and Elixir packages, but pure Erlang/Elixir packages require FFI to use from Gleam.
- Version constraints use `and` instead of commas: `">= 1.0.0 and < 2.0.0"` not `"~> 1.0"`.
- The `manifest.toml` lockfile should be committed to version control.
- `gleam add` automatically updates `gleam.toml` and downloads the package.
