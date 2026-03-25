---
title: "Structs & Classes"
language: "odin"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Odin's primary data grouping mechanism is the `struct`. Structs are value types (copied on assignment) unless accessed through a pointer. There are no classes or methods — procedures that take a struct pointer as the first argument are the idiomatic equivalent. Odin supports struct embedding via `using`.

## Example

```odin
package main

import "core:fmt"
import "core:math"

Vector2 :: struct {
    x, y: f64,
}

// "Methods" are just procedures with the struct as first param
vector2_length :: proc(v: Vector2) -> f64 {
    return math.sqrt(v.x*v.x + v.y*v.y)
}

vector2_add :: proc(a, b: Vector2) -> Vector2 {
    return {a.x + b.x, a.y + b.y}
}

// Struct embedding with using
Entity :: struct {
    using position: Vector2,   // fields x, y promoted
    name: string,
    health: int,
}

main :: proc() {
    v1 := Vector2{3.0, 4.0}
    v2 := Vector2{1.0, 2.0}

    fmt.println(vector2_length(v1))       // 5.0
    fmt.println(vector2_add(v1, v2))      // {4, 6}

    // Struct literal
    player := Entity{
        position = {10.0, 20.0},
        name     = "Hero",
        health   = 100,
    }

    // Access promoted fields directly
    fmt.println(player.x, player.y)  // 10 20 (from position)
    fmt.println(player.name)

    // Pointer to struct for mutation
    move :: proc(e: ^Entity, dx, dy: f64) {
        e.x += dx
        e.y += dy
    }
    move(&player, 5.0, 0.0)
    fmt.println(player.x)  // 15.0
}
```

## Gotchas

- Structs are **value types** — assigning `b := a` makes a full copy. Use `^Struct` pointers to share or mutate.
- `using` promotes embedded struct fields to the outer scope — useful for composition but can cause name conflicts.
- There is no constructor syntax — use regular procedures like `new_vector2(x, y: f64) -> Vector2`.
- Default field values in struct declarations are not supported — fields are zero-initialized by default.
