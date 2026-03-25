---
title: "Tuples"
language: "gleam"
feature: "tuples"
category: "data-structures"
applicable: true
---

Gleam supports anonymous tuples with the `#(...)` syntax. Tuples are fixed-length, heterogeneous, and immutable. They are commonly used to return multiple values from a function or to group data without defining a named type. Element access is via `element.0`, `element.1`, etc., or through destructuring.

## Example

```gleam
import gleam/io

pub fn divmod(a: Int, b: Int) -> #(Int, Int) {
  #(a / b, a % b)
}

pub fn main() {
  let pair: #(String, Int) = #("Alice", 30)
  let triple = #(1, 2.0, "three")

  // Access by index
  io.debug(pair.0)   // "Alice"
  io.debug(pair.1)   // 30

  // Destructuring
  let #(name, age) = pair
  io.println(name)

  // From a function returning a tuple
  let #(quotient, remainder) = divmod(17, 5)
  io.debug(quotient)
  io.debug(remainder)

  // Tuples in case
  let coords = #(0, 1)
  case coords {
    #(0, 0) -> io.println("origin")
    #(x, 0) -> io.println("on x-axis")
    #(0, y) -> io.println("on y-axis")
    #(x, y) -> io.println("somewhere else")
  }
}
```

## Gotchas

- Tuples use `#(...)` syntax (not `(...)`) to avoid ambiguity with parenthesised expressions.
- Tuple element access via `.0`, `.1` etc. is available but destructuring in `let` or `case` is more idiomatic.
- For anything beyond 2–3 elements, prefer a named custom type with labelled fields for clarity.
- Tuples of different lengths or types are distinct types and cannot be mixed.
