---
title: "Tuples"
language: "odin"
feature: "tuples"
category: "data-structures"
applicable: false
---

Odin does not have a first-class tuple type as a stored value. Multiple return values from procedures look like tuples at the call site but cannot be stored as a single variable — they must be immediately destructured. For grouping heterogeneous values, use an anonymous struct or a named struct.

## Example

```odin
package main

import "core:fmt"

// No tuples — use structs to group values
Point :: struct { x, y: f64 }
Result :: struct { value: int, ok: bool }

// Multiple returns (NOT a tuple — cannot be stored as one value)
get_pair :: proc() -> (int, string) {
    return 42, "hello"
}

main :: proc() {
    // Must destructure immediately
    n, s := get_pair()
    fmt.println(n, s)

    // Store grouped data using a struct
    p := Point{x: 1.0, y: 2.0}
    fmt.println(p.x, p.y)

    // Anonymous struct fields (inline)
    data := struct { name: string; age: int }{"Alice", 30}
    fmt.println(data.name, data.age)
}
```

## Gotchas

- You cannot write `t := get_pair()` and then use `t.0` — there are no tuple values in Odin.
- Multiple return values are a calling convention feature, not a runtime type.
- For a lightweight pair, use `[2]T` (array of same type) or a small named/anonymous struct.
- Anonymous structs (`struct { ... }{ ... }`) can serve as ad-hoc tuples in some contexts.
