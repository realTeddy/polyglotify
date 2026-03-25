---
title: "Variables & Declaration"
language: "odin"
feature: "variables"
category: "basics"
applicable: true
---

Odin uses `:=` for declaration-with-inference, `:` followed by type for typed declaration, and `=` for assignment to an existing variable. The `const` declaration creates compile-time constants. Variables are zero-initialized by default. Odin also supports multiple assignment and the explicit `uninit` marker to skip zero-initialization for performance.

## Example

```odin
package main

import "core:fmt"

GRAVITY :: 9.81  // compile-time constant

main :: proc() {
    // Inferred type
    x := 42
    name := "Alice"

    // Explicit type
    y: int = 10
    z: f64 = 3.14

    // Multiple declaration
    a, b := 1, 2

    // Zero-initialized (default)
    var count: int  // = 0

    // Swap
    a, b = b, a

    fmt.println(x, name, y, z, a, b)
}
```

## Gotchas

- Variables declared but never used are a **compile error** in Odin.
- `:=` declares AND assigns; `=` is assignment only (variable must already exist).
- `---` (three dashes) initializes to undefined/garbage — use only when you immediately overwrite the value.
- Constants declared with `::` are evaluated at compile time and can be used in type expressions.
