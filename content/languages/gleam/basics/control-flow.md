---
title: "Control Flow"
language: "gleam"
feature: "control-flow"
category: "basics"
applicable: true
---

Gleam's primary control flow construct is `case`, which performs exhaustive pattern matching. There is no `if/else` in the traditional imperative sense — instead, `case` on a `Bool` is used. The `use` expression (since Gleam 0.25) provides a syntactic shortcut for callback-heavy code. All control flow expressions produce values.

## Example

```gleam
import gleam/io
import gleam/int

pub type Direction { North South East West }

pub fn describe_direction(d: Direction) -> String {
  case d {
    North -> "Going north"
    South -> "Going south"
    East | West -> "Going sideways"
  }
}

pub fn classify(n: Int) -> String {
  case n {
    0 -> "zero"
    n if n > 0 -> "positive"
    _ -> "negative"
  }
}

pub fn main() {
  // Boolean branching via case
  let x = 42
  let label = case x > 0 {
    True -> "positive"
    False -> "non-positive"
  }

  io.println(describe_direction(North))
  io.println(classify(-5))
  io.println(label)
}
```

## Gotchas

- `case` must be exhaustive — the compiler rejects non-exhaustive matches. Use `_` as a catch-all.
- Guards (`if condition`) in `case` arms are supported but can reduce exhaustiveness checking. Be careful not to leave unhandled cases.
- There are no `while` or `for` loops — iteration is done via recursion or standard library functions like `list.map`, `list.fold`, `list.each`.
- The `use` expression desugars callback functions into linear-looking code; it does not add new runtime semantics.
