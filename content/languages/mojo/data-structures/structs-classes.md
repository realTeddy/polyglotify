---
title: "Structs & Classes"
language: "mojo"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Mojo uses `struct` for high-performance, value-semantic types with static dispatch. Structs have fields and methods, support operator overloading via dunder methods, and conform to traits. Mojo also has `class` (Python-compatible, reference semantics, dynamic dispatch), but `struct` is the idiomatic choice for performance-critical code.

## Example

```mojo
struct Vector2D:
    var x: Float64
    var y: Float64

    fn __init__(inout self, x: Float64, y: Float64):
        self.x = x
        self.y = y

    fn __add__(self, other: Self) -> Self:
        return Vector2D(self.x + other.x, self.y + other.y)

    fn __mul__(self, scalar: Float64) -> Self:
        return Vector2D(self.x * scalar, self.y * scalar)

    fn magnitude(self) -> Float64:
        return (self.x * self.x + self.y * self.y) ** 0.5

    fn __str__(self) -> String:
        return "(" + str(self.x) + ", " + str(self.y) + ")"

    fn __copyinit__(inout self, other: Self):
        self.x = other.x
        self.y = other.y

fn main():
    var v1 = Vector2D(3.0, 4.0)
    var v2 = Vector2D(1.0, 2.0)
    var v3 = v1 + v2           # calls __add__
    var v4 = v1 * 2.0          # calls __mul__
    print(v1.magnitude())      # 5.0
    print(v3)                  # (4.0, 6.0)
```

## Gotchas

- Mojo `struct` has value semantics (copy by default); implement `__copyinit__` to control copying.
- `__init__` must take `inout self` because it is initializing a new instance.
- Mojo's `class` exists for Python compatibility but lacks the performance characteristics of `struct`; prefer `struct` for new Mojo code.
