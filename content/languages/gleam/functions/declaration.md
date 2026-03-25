---
title: "Function Declaration"
language: "gleam"
feature: "declaration"
category: "functions"
applicable: true
---

Functions in Gleam are declared with the `fn` keyword. Public functions are marked `pub`. Functions are first-class values and can be passed around like any other value. Gleam functions always require explicit parameter names (no positional-only anonymous args). The return type can be annotated or inferred.

## Example

```gleam
import gleam/io

// Public function with type annotations
pub fn add(a: Int, b: Int) -> Int {
  a + b
}

// Private function (no pub)
fn double(n: Int) -> Int {
  n * 2
}

// Function as a value
pub fn apply(f: fn(Int) -> Int, x: Int) -> Int {
  f(x)
}

pub fn main() {
  let result = add(3, 4)
  let doubled = apply(double, 10)
  io.debug(result)
  io.debug(doubled)

  // Anonymous function
  let triple = fn(n: Int) { n * 3 }
  io.debug(triple(7))
}
```

## Gotchas

- The last expression in a function body is its return value — there is no `return` keyword.
- Gleam does not support default parameter values.
- Functions can be recursive, but Gleam does not guarantee tail-call optimization for all recursive calls — use `list.fold` and similar library functions for iteration where possible.
- All functions in a module share the same flat namespace; there are no nested named functions (only anonymous `fn` expressions inside other functions).
