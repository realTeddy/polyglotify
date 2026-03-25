---
title: "Types & Type Systems"
language: "gleam"
feature: "types"
category: "basics"
applicable: true
---

Gleam has a strong, static, fully-inferred type system with no `null` or implicit coercions. Built-in types include `Int`, `Float`, `String`, `Bool`, `List(a)`, `Result(value, error)`, and `Option(a)` (via stdlib). Custom types are defined with `type` and can be record variants or simple enums. Gleam's type system is Hindley-Milner based and guarantees no runtime type errors.

## Example

```gleam
// Custom type with multiple variants
pub type Shape {
  Circle(radius: Float)
  Rectangle(width: Float, height: Float)
}

pub type Color {
  Red
  Green
  Blue
}

pub fn area(shape: Shape) -> Float {
  case shape {
    Circle(r) -> 3.14159 *. r *. r
    Rectangle(w, h) -> w *. h
  }
}

pub fn describe(c: Color) -> String {
  case c {
    Red -> "red"
    Green -> "green"
    Blue -> "blue"
  }
}
```

## Gotchas

- `Int` and `Float` are distinct — there is no implicit conversion. Use `int.to_float` from the stdlib.
- Integer arithmetic uses `+`, `-`, `*`; float arithmetic uses `+.`, `-.`, `*.`, `/.`.
- There is no `null` — use `Option(a)` (i.e., `Some(value)` / `None`) or `Result(a, e)` for absence.
- All custom type variants must be handled exhaustively in `case` expressions — the compiler enforces this.
