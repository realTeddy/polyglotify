---
title: "Structs & Classes"
language: "gleam"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Gleam uses **custom types** with labelled fields as its struct equivalent. There are no classes. A single-variant custom type with named fields is effectively a record/struct. Fields are accessed with dot notation, and record update syntax creates a modified copy without mutation.

## Example

```gleam
import gleam/io

pub type Point {
  Point(x: Float, y: Float)
}

pub type User {
  User(name: String, age: Int, email: String)
}

pub fn distance(p1: Point, p2: Point) -> Float {
  let dx = p2.x -. p1.x
  let dy = p2.y -. p1.y
  // Simplified: not using sqrt for brevity
  dx *. dx +. dy *. dy
}

pub fn birthday(user: User) -> User {
  User(..user, age: user.age + 1)
}

pub fn main() {
  let p1 = Point(x: 0.0, y: 0.0)
  let p2 = Point(x: 3.0, y: 4.0)

  io.debug(distance(p1, p2))  // 25.0

  let alice = User(name: "Alice", age: 29, email: "alice@example.com")
  let older = birthday(alice)
  io.debug(older.age)         // 30
  io.println(alice.name)      // "Alice" (unchanged)
}
```

## Gotchas

- There are no classes, methods, or `self`. Functions that operate on a type are just regular functions that take it as a parameter.
- Record update syntax `Type(..existing, field: new_value)` creates a new value — the original is unchanged.
- Field names are part of the constructor — `Point(x: 1.0, y: 2.0)` and `Point(1.0, 2.0)` (positional) are both valid.
- A custom type with multiple variants is an algebraic data type (sum type), not a struct.
