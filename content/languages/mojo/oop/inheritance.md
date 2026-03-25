---
title: "Inheritance"
language: "mojo"
feature: "inheritance"
category: "oop"
applicable: true
---

Mojo supports inheritance for `class` types (Python-compatible, reference semantics). `struct` types do not support inheritance — instead, they use **traits** for polymorphism. `class` inheritance uses the same syntax as Python: `class Child(Parent)`. `super()` calls the parent's method.

## Example

```mojo
# Class-based inheritance (Python-compatible)
class Shape:
    def area(self) -> Float64:
        return 0.0

    def describe(self) -> String:
        return "Shape with area " + str(self.area())

class Circle(Shape):
    var radius: Float64

    def __init__(self, radius: Float64):
        self.radius = radius

    def area(self) -> Float64:
        return 3.14159 * self.radius * self.radius

class Rectangle(Shape):
    var width: Float64
    var height: Float64

    def __init__(self, width: Float64, height: Float64):
        self.width  = width
        self.height = height

    def area(self) -> Float64:
        return self.width * self.height

fn main():
    var shapes: List = [Circle(5.0), Rectangle(3.0, 4.0)]
    for s in shapes:
        print(s.describe())

# Struct-based "inheritance" via traits (preferred in Mojo)
trait Drawable:
    fn draw(self): ...

struct Line:
    var length: Float64
    fn draw(self): print("Line of length", self.length)

struct Box:
    var side: Float64
    fn draw(self): print("Box of side", self.side)
```

## Gotchas

- `struct` types cannot inherit from other structs; compose structs or use traits instead.
- `class` inheritance in Mojo mirrors Python; be aware of Python's MRO (Method Resolution Order) for multiple inheritance.
- Traits (not inheritance) are the idiomatic Mojo way to express polymorphism for `struct` types.
