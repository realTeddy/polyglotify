---
title: "Generics"
language: "odin"
feature: "generics"
category: "oop"
applicable: true
---

Odin supports parametric polymorphism via **polymorphic procedures** using `$T` syntax. Type parameters are prefixed with `$`. Odin also supports `where` clauses to constrain type parameters. Polymorphic procedures are specialized (monomorphized) at compile time — no runtime overhead.

## Example

```odin
package main

import "core:fmt"

// Generic procedure with $T
identity :: proc(x: $T) -> T {
    return x
}

// Generic with constraint (where clause)
add :: proc(a, b: $T) -> T where intrinsics.type_is_numeric(T) {
    return a + b
}

// Generic container
Stack :: struct($T: typeid) {
    data: [dynamic]T,
}

stack_push :: proc(s: ^Stack($T), val: T) {
    append(&s.data, val)
}

stack_pop :: proc(s: ^Stack($T)) -> (T, bool) {
    if len(s.data) == 0 {
        return {}, false
    }
    val := pop(&s.data)
    return val, true
}

// Generic procedure over slice
map_slice :: proc(input: []$T, f: proc(T) -> $R) -> []R {
    result := make([]R, len(input))
    for v, i in input {
        result[i] = f(v)
    }
    return result
}

main :: proc() {
    fmt.println(identity(42))
    fmt.println(identity("hello"))
    fmt.println(add(3, 4))
    fmt.println(add(1.5, 2.5))

    s: Stack(int)
    stack_push(&s, 10)
    stack_push(&s, 20)
    val, ok := stack_pop(&s)
    fmt.println(val, ok)  // 20 true
}
```

## Gotchas

- `$T` in a procedure parameter means "infer this type from the argument at the call site" — it is not a type variable you declare separately.
- Generic specialization happens at compile time (monomorphization) — each distinct type gets its own compiled version.
- `where` constraints can reference `intrinsics` package predicates like `type_is_numeric`, `type_is_comparable`, etc.
- Odin's generics are less powerful than Rust traits or Haskell typeclasses but cover most practical cases.
