---
title: "Operators"
language: "odin"
feature: "operators"
category: "basics"
applicable: true
---

Odin provides standard arithmetic, bitwise, comparison, and logical operators. It does not support operator overloading. Integer and float arithmetic is type-specific; mixing requires explicit casts. The `in` operator checks membership in sets and maps. `~` is bitwise NOT (not `!` for booleans).

## Example

```odin
package main

import "core:fmt"

main :: proc() {
    // Arithmetic
    a, b := 10, 3
    fmt.println(a + b)   // 13
    fmt.println(a - b)   // 7
    fmt.println(a * b)   // 30
    fmt.println(a / b)   // 3 (integer division)
    fmt.println(a % b)   // 1

    // Float arithmetic
    x, y := 10.0, 3.0
    fmt.println(x / y)   // 3.333...

    // Bitwise
    fmt.println(0b1010 & 0b1100)  // 8 (AND)
    fmt.println(0b1010 | 0b1100)  // 14 (OR)
    fmt.println(0b1010 ~ 0b1100)  // 6 (XOR) — note: ~ is XOR, not NOT
    fmt.println(~0b1010)          // bitwise NOT
    fmt.println(1 << 3)           // 8
    fmt.println(16 >> 2)          // 4

    // Comparison
    fmt.println(a == b, a != b, a < b, a >= b)

    // Boolean
    fmt.println(true && false)
    fmt.println(true || false)
    fmt.println(!true)

    // in operator (map/bit_set membership)
    m := map[string]int{"a" = 1}
    fmt.println("a" in m)   // true
}
```

## Gotchas

- `~` is XOR for binary (two operands) and bitwise NOT for unary. This differs from many languages.
- There is **no** operator overloading — you cannot redefine `+` for custom types.
- Integer overflow is well-defined (wrapping) in Odin — no undefined behavior.
- The `or_else` operator provides a nil/error fallback: `value or_else default`.
