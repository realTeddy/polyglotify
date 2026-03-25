---
title: "Inheritance"
language: "nim"
feature: "inheritance"
category: "oop"
applicable: true
---

Nim supports single inheritance for `ref object` types using `of`. A subtype inherits all fields of its parent. `method` provides virtual dispatch; `proc` is statically resolved. The `of` operator tests the runtime type. `procCall` explicitly bypasses dynamic dispatch to call the parent method.

## Example

```nim
type
  Shape = ref object of RootObj
    color*: string

  Circle = ref object of Shape
    radius*: float

  Rectangle = ref object of Shape
    width*, height*: float

# Base "method"
method area(s: Shape): float {.base.} =
  raise newException(ValueError, "area not implemented")

method area(c: Circle): float =
  3.14159 * c.radius * c.radius

method area(r: Rectangle): float =
  r.width * r.height

# Shared behavior on base type
method describe(s: Shape): string {.base.} =
  "A " & s.color & " shape with area " & $s.area()

# Usage
let shapes: seq[Shape] = @[
  Circle(color: "red",  radius: 5.0),
  Rectangle(color: "blue", width: 4.0, height: 3.0)
]

for s in shapes:
  echo s.describe()
  echo "  is Circle: ", s of Circle

# Calling a base method explicitly
method greet(s: Shape) {.base.} =
  echo "I am a shape"

method greet(c: Circle) =
  procCall greet(Shape(c))   # call parent
  echo "...and a circle"
```

## Gotchas

- Only `ref object` types support inheritance; value `object` types cannot inherit.
- Mark base methods with `{.base.}` pragma; the compiler warns if an override lacks a matching base.
- `s of Circle` performs a runtime type check (like `instanceof` in Java).
