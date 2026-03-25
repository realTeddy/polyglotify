---
title: "Inheritance"
language: "odin"
feature: "inheritance"
category: "oop"
applicable: false
---

Odin has no inheritance. Composition is achieved via struct embedding with `using`, which promotes fields and enables a form of structural reuse. For polymorphic behaviour, use tagged unions or procedure pointers stored in structs (vtable pattern).

## Example

```odin
package main

import "core:fmt"

// Base "class" via embedding with using
Transform :: struct {
    x, y: f64,
    rotation: f64,
}

transform_move :: proc(t: ^Transform, dx, dy: f64) {
    t.x += dx
    t.y += dy
}

// "Derived" type composes Transform
Sprite :: struct {
    using transform: Transform,
    texture_id: int,
    width, height: f64,
}

// Vtable-based polymorphism
Shape :: struct {
    area:      proc(self: rawptr) -> f64,
    perimeter: proc(self: rawptr) -> f64,
    data:      rawptr,
}

Circle :: struct { radius: f64 }
circle_area :: proc(self: rawptr) -> f64 {
    c := (^Circle)(self)
    return 3.14159 * c.radius * c.radius
}

main :: proc() {
    sprite := Sprite{
        transform  = {x: 10, y: 20, rotation: 0},
        texture_id = 5,
        width = 32, height = 32,
    }

    // Access embedded fields directly (promoted by using)
    fmt.println(sprite.x, sprite.y)

    // Call procedure with the embedded part
    transform_move(&sprite.transform, 5, 0)
    fmt.println(sprite.x)  // 15

    // Vtable polymorphism
    c := Circle{radius: 5.0}
    shape := Shape{
        area = circle_area,
        data = &c,
    }
    fmt.println(shape.area(shape.data))  // ~78.5
}
```

## Gotchas

- `using` embedding is composition, not inheritance — there is no "is-a" relationship and no virtual dispatch.
- Vtable patterns (proc pointer in struct) provide runtime polymorphism but require manual setup.
- Odin does not generate vtables automatically — this is intentional to keep the runtime overhead explicit.
- For type-safe polymorphism over a closed set of types, use a tagged `union`.
