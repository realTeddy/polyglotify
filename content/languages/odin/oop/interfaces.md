---
title: "Interfaces & Traits"
language: "odin"
feature: "interfaces"
category: "oop"
applicable: false
---

Odin has no interfaces or traits. Polymorphism is achieved through tagged unions (closed set), procedure pointer structs (vtable pattern), or `any` (open but type-unsafe). These are explicit and zero-overhead abstractions rather than language-level virtual dispatch.

## Example

```odin
package main

import "core:fmt"

// Pattern 1: Tagged union (closed polymorphism)
Shape :: union {
    Circle,
    Rectangle,
    Triangle,
}

Circle    :: struct { radius: f64 }
Rectangle :: struct { w, h: f64 }
Triangle  :: struct { base, height: f64 }

area :: proc(s: Shape) -> f64 {
    switch v in s {
    case Circle:    return 3.14159 * v.radius * v.radius
    case Rectangle: return v.w * v.h
    case Triangle:  return 0.5 * v.base * v.height
    }
    return 0
}

// Pattern 2: Explicit vtable (open polymorphism)
Serializer :: struct {
    serialize:   proc(data: rawptr) -> string,
    deserialize: proc(s: string) -> rawptr,
    ctx:         rawptr,
}

main :: proc() {
    shapes: []Shape = {Circle{5}, Rectangle{3, 4}, Triangle{6, 8}}
    for s in shapes {
        fmt.printf("area: %.2f\n", area(s))
    }
}
```

## Gotchas

- Tagged union requires listing all variants upfront — adding a new variant requires updating all `switch` statements (exhaustiveness is checked by the compiler).
- The vtable pattern is powerful but verbose — there is no language help for implementing it.
- `any` is available for fully dynamic dispatch but gives up static type safety.
- Odin's approach trades convenience for predictability — no hidden vtable overhead.
