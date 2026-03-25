---
title: "Style Conventions"
language: "gleam"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Gleam has an official formatter (`gleam format`) that enforces a single canonical style, eliminating debates. Naming conventions: `snake_case` for functions and variables, `PascalCase` for types and constructors, `SCREAMING_SNAKE_CASE` for module-level constants. Modules use `snake_case` file names.

## Example

```gleam
// snake_case for functions and variables
pub fn calculate_area(width: Float, height: Float) -> Float {
  width *. height
}

// PascalCase for types and constructors
pub type HttpMethod {
  Get
  Post
  Put
  Delete
}

// PascalCase for type aliases
pub type UserId = Int

// Constants (gleam uses let at module level)
pub const max_retries: Int = 3
pub const default_timeout_ms: Int = 5000

// Modules: one concept per file, snake_case filename
// src/my_app/http_client.gleam  -> import my_app/http_client

// Prefer labelled arguments for clarity when function takes 2+ same-type args
pub fn create_rect(width w: Float, height h: Float) -> Rect {
  Rect(width: w, height: h)
}

// Use _ prefix for intentionally unused bindings
pub fn process(items: List(a)) -> Int {
  list.fold(items, 0, fn(acc, _item) { acc + 1 })
}
```

## Gotchas

- `gleam format` is not configurable — run it and commit the result. CI should check formatting with `gleam format --check`.
- There are no semicolons, and indentation is 2 spaces (enforced by formatter).
- `pub` functions are the public API; omit `pub` to keep things module-private. Use `pub(internal)` for package-internal exposure.
- Trailing commas in multi-line lists, function args, and type definitions are idiomatic and preserved by the formatter.
