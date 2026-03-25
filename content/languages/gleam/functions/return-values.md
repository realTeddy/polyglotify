---
title: "Return Values"
language: "gleam"
feature: "return-values"
category: "functions"
applicable: true
---

Gleam functions return the value of their last expression — there is no explicit `return` keyword. To return multiple values, use a tuple or a custom type. Errors are signalled via `Result(value, error)` rather than exceptions. The `?` operator (called the "try" operator) propagates `Error` values early from a function returning `Result`.

## Example

```gleam
import gleam/io
import gleam/int

// Returning a tuple
pub fn min_max(a: Int, b: Int) -> #(Int, Int) {
  case a < b {
    True -> #(a, b)
    False -> #(b, a)
  }
}

// Returning a Result
pub fn safe_divide(a: Int, b: Int) -> Result(Int, String) {
  case b {
    0 -> Error("division by zero")
    _ -> Ok(a / b)
  }
}

// Using the ? operator for early return on Error
pub fn compute(a: Int, b: Int, c: Int) -> Result(Int, String) {
  let x = safe_divide(a, b)?
  let y = safe_divide(x, c)?
  Ok(x + y)
}

pub fn main() {
  let #(lo, hi) = min_max(7, 3)
  io.debug(#(lo, hi))

  io.debug(safe_divide(10, 2))
  io.debug(safe_divide(10, 0))
  io.debug(compute(100, 5, 2))
}
```

## Gotchas

- There is no `return` keyword — the function body is a single expression (blocks with `let` bindings are sequences of expressions).
- The `?` operator can only be used inside a function whose return type is `Result`. It unwraps `Ok(v)` to `v` and short-circuits with `Error(e)` otherwise.
- Returning multiple values via tuple is common; destructure at the call site with `let #(a, b) = ...`.
