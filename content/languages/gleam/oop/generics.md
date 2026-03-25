---
title: "Generics"
language: "gleam"
feature: "generics"
category: "oop"
applicable: true
---

Gleam supports parametric polymorphism (generics) via lowercase type variables. Generic types and functions are written with type parameters like `a`, `b`. The standard library uses this extensively — `List(a)`, `Result(value, error)`, `Dict(key, value)`. There are no bounds or constraints on type variables (no typeclasses).

## Example

```gleam
import gleam/io
import gleam/option.{Option, Some, None}

// Generic function
pub fn identity(x: a) -> a {
  x
}

// Generic type
pub type Pair(a, b) {
  Pair(first: a, second: b)
}

pub fn swap(pair: Pair(a, b)) -> Pair(b, a) {
  Pair(first: pair.second, second: pair.first)
}

// Generic with Result
pub fn map_ok(result: Result(a, e), f: fn(a) -> b) -> Result(b, e) {
  case result {
    Ok(value) -> Ok(f(value))
    Error(e)  -> Error(e)
  }
}

pub fn main() {
  let p = Pair(first: "hello", second: 42)
  let swapped = swap(p)
  io.debug(swapped.first)   // 42
  io.debug(swapped.second)  // "hello"

  let r = Ok(5)
  io.debug(map_ok(r, fn(x) { x * 2 }))  // Ok(10)
}
```

## Gotchas

- Type variables are unconstrained — you cannot require that `a` supports addition or comparison. Use higher-order functions to pass those operations explicitly.
- Gleam infers type arguments automatically; you rarely write them explicitly at call sites.
- Type variables must be lowercase single letters or short names like `value`, `error`, `key`.
