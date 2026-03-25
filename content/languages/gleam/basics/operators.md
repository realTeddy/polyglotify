---
title: "Operators"
language: "gleam"
feature: "operators"
category: "basics"
applicable: true
---

Gleam has separate operator sets for integers and floats to avoid implicit coercions. String concatenation uses `<>`. The pipe operator `|>` is central to idiomatic Gleam, passing the left-hand value as the first argument to the right-hand function. Comparison operators work on any type that implements equality.

## Example

```gleam
import gleam/io

pub fn main() {
  // Integer operators
  let sum = 10 + 3       // 13
  let product = 4 * 5    // 20
  let quotient = 10 / 3  // 3 (integer division)
  let remainder = 10 % 3 // 1

  // Float operators (note the trailing dot)
  let fsum = 1.5 +. 2.5  // 4.0
  let fdiv = 7.0 /. 2.0  // 3.5

  // String concatenation
  let greeting = "Hello" <> ", " <> "world!"

  // Pipe operator
  let result =
    [1, 2, 3, 4, 5]
    |> list.map(fn(x) { x * 2 })
    |> list.filter(fn(x) { x > 4 })

  // Boolean
  let t = True && False || True
  let f = !True

  io.debug(sum)
  io.debug(fsum)
  io.println(greeting)
}
```

## Gotchas

- Using `+` on floats is a compile error — you must use `+.`. This is intentional to prevent accidental precision loss.
- The pipe operator `|>` inserts the left value as the **first** argument, not the last (unlike Elixir's `|>` which also inserts first — same convention).
- There is no `++` increment operator. Gleam is expression-oriented and immutable.
- Equality `==` performs structural equality; there is no reference equality operator.
