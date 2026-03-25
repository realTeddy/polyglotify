---
title: "Variables & Declaration"
language: "gleam"
feature: "variables"
category: "basics"
applicable: true
---

Gleam uses `let` to bind values to names. All bindings are immutable by default — there is no mutation. Variables can be shadowed by re-binding the same name in the same or inner scope. Gleam infers types automatically, so explicit annotations are optional but supported.

## Example

```gleam
import gleam/io

pub fn main() {
  let name = "Alice"
  let age: Int = 30
  let greeting = "Hello, " <> name

  // Shadowing is allowed
  let age = age + 1

  io.println(greeting)
  io.debug(age)
}
```

## Gotchas

- There is no `var` or `mut` — all bindings are immutable. Gleam has no mutable variables.
- Shadowing (`let x = ...` after an existing `x`) is valid and common, but it creates a new binding rather than mutating the old one.
- Unused variables produce a compiler warning; prefix with `_` to silence it (e.g., `let _unused = ...`).
