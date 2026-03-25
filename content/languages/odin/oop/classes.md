---
title: "Classes"
language: "odin"
feature: "classes"
category: "oop"
applicable: false
---

Odin has no classes. It is a procedural language where data and behaviour are intentionally separated. Structs hold data; procedures operating on those structs provide behaviour. This is similar to C's approach but with more ergonomics (procedure overloading, `using` for embedding, etc.).

## Example

```odin
package main

import "core:fmt"

// Data (the "class" equivalent)
Counter :: struct {
    value: int,
    step:  int,
}

// "Methods" are procedures
counter_new :: proc(step: int = 1) -> Counter {
    return Counter{value: 0, step: step}
}

counter_increment :: proc(c: ^Counter) {
    c.value += c.step
}

counter_reset :: proc(c: ^Counter) {
    c.value = 0
}

counter_get :: proc(c: Counter) -> int {
    return c.value
}

main :: proc() {
    c := counter_new(2)
    counter_increment(&c)
    counter_increment(&c)
    counter_increment(&c)
    fmt.println(counter_get(c))  // 6
    counter_reset(&c)
    fmt.println(counter_get(c))  // 0
}
```

## Gotchas

- The lack of methods means you use module namespacing to group related procedures (e.g., all `counter_` prefixed procedures live in a `counter` package).
- Odin's procedure overloading lets you have `counter.new`, `vector.new` etc. using explicit overload tables.
- There is no encapsulation via access modifiers — all struct fields are public within the package.
- This design is intentional: Odin's creator considers classes harmful to code clarity.
