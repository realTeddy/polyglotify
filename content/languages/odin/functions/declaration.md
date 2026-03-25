---
title: "Function Declaration"
language: "odin"
feature: "declaration"
category: "functions"
applicable: true
---

In Odin, functions (called **procedures**) are declared with `proc`. The syntax is `name :: proc(params) -> return_type { body }`. The `::` makes it a package-level constant binding. Procedures are first-class values. Odin also supports procedure overloading via explicit overload sets.

## Example

```odin
package main

import "core:fmt"

// Basic procedure
add :: proc(a, b: int) -> int {
    return a + b
}

// Multiple return values
min_max :: proc(a, b: int) -> (int, int) {
    if a < b {
        return a, b
    }
    return b, a
}

// Named return values
divide :: proc(a, b: f64) -> (result: f64, ok: bool) {
    if b == 0 {
        return 0, false
    }
    result = a / b
    ok = true
    return
}

// Procedure as a value
apply :: proc(f: proc(int) -> int, x: int) -> int {
    return f(x)
}

double :: proc(n: int) -> int { return n * 2 }

main :: proc() {
    fmt.println(add(3, 4))

    lo, hi := min_max(7, 3)
    fmt.println(lo, hi)

    r, ok := divide(10, 3)
    fmt.println(r, ok)

    fmt.println(apply(double, 5))
}
```

## Gotchas

- Procedures are values — you can assign them to variables, pass them around, and store them in structs.
- Calling conventions can be specified: `proc "c" (...)` for C ABI, `proc "std" (...)` for stdcall, etc.
- `proc` with no name is an anonymous procedure (lambda).
- Recursion is supported; tail-call optimization is not guaranteed.
