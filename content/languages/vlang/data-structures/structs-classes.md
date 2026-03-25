---
title: "Structs & Classes"
language: "vlang"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

V has structs but no classes. Structs bundle data fields and methods are defined separately as functions with a receiver (`fn (s MyStruct) method()`). Structs are value types by default. Fields can have default values. `pub` controls visibility. Embedding (anonymous fields) enables composition.

## Example

```v
struct Point {
    x f64
    y f64
}

fn (p Point) distance_to(other Point) f64 {
    return math.sqrt((p.x - other.x) * (p.x - other.x) +
                     (p.y - other.y) * (p.y - other.y))
}

fn (p Point) str() string {
    return '(${p.x}, ${p.y})'
}

struct Rectangle {
    origin Point
    width  f64
    height f64 = 1.0  // default value
}

fn (r Rectangle) area() f64 {
    return r.width * r.height
}

fn main() {
    p1 := Point{x: 0, y: 0}
    p2 := Point{x: 3, y: 4}
    println(p1.distance_to(p2))  // 5.0
    println(p1)                  // (0.0, 0.0)

    rect := Rectangle{
        origin: p1
        width:  10
        // height uses default: 1.0
    }
    println(rect.area())  // 10.0

    // Struct update syntax
    p3 := Point{...p1, x: 5}
    println(p3)  // (5.0, 0.0)
}
```

## Gotchas

- Structs are value types; passing to a function copies the struct. Use `mut` receiver or pointer for mutation.
- Methods with value receivers `fn (s Struct)` receive a copy; use `fn (mut s Struct)` to modify fields.
- V does not have classes, inheritance, or constructors; use factory functions (e.g., `fn new_point(x f64, y f64) Point`) as a convention.
