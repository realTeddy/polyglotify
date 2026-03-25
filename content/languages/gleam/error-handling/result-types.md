---
title: "Result Types"
language: "gleam"
feature: "result-types"
category: "error-handling"
applicable: true
---

`Result(value, error)` is Gleam's universal error-handling mechanism. A `Result` is either `Ok(value)` for success or `Error(reason)` for failure. The `gleam/result` module provides combinators (`map`, `try`, `unwrap`, etc.) and the `?` operator provides syntactic sugar for early return on error inside functions that return `Result`.

## Example

```gleam
import gleam/io
import gleam/result
import gleam/int

pub fn parse_positive(s: String) -> Result(Int, String) {
  use n <- result.try(int.parse(s) |> result.map_error(fn(_) { "not a number" }))
  case n > 0 {
    True  -> Ok(n)
    False -> Error("must be positive")
  }
}

pub fn double_positive(s: String) -> Result(Int, String) {
  let n = parse_positive(s)?   // early return on Error
  Ok(n * 2)
}

pub fn main() {
  // Basic usage
  io.debug(parse_positive("42"))    // Ok(42)
  io.debug(parse_positive("-1"))    // Error("must be positive")
  io.debug(parse_positive("abc"))   // Error("not a number")

  // Combinators
  let r = Ok(10)
  let mapped = result.map(r, fn(x) { x + 5 })     // Ok(15)
  let fallback = result.unwrap(Error("oops"), 0)   // 0
  io.debug(mapped)
  io.debug(fallback)

  io.debug(double_positive("5"))    // Ok(10)
  io.debug(double_positive("bad"))  // Error("not a number")
}
```

## Gotchas

- The `?` operator can only be used inside a function that returns `Result`. Using it elsewhere is a compile error.
- The error type in a chain of `?` operations must be the same — use `result.map_error` to normalise error types.
- `result.unwrap(result, default)` silently swallows errors — prefer explicit `case` when the error matters.
- `result.try` (callback form) and `use ... <- result.try(...)` are two ways to chain fallible operations without nesting `case`.
