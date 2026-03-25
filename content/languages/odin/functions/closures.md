---
title: "Closures & Lambdas"
language: "odin"
feature: "closures"
category: "functions"
applicable: true
---

Odin supports anonymous procedures and closures. A closure captures variables from its enclosing scope by reference (via a pointer in the underlying implementation). The `proc(params) -> ret { body }` syntax creates an anonymous procedure. Closures are useful for callbacks and higher-order procedures.

## Example

```odin
package main

import "core:fmt"

// Higher-order procedure accepting a proc value
apply_twice :: proc(f: proc(int) -> int, x: int) -> int {
    return f(f(x))
}

make_adder :: proc(n: int) -> proc(int) -> int {
    // Returns a closure capturing n
    return proc(x: int) -> int {
        return x + n  // n captured from outer scope
    }
}

main :: proc() {
    // Inline anonymous procedure
    double := proc(x: int) -> int { return x * 2 }
    fmt.println(apply_twice(double, 3))  // 12

    // Closure that captures a variable
    add5 := make_adder(5)
    fmt.println(add5(10))   // 15
    fmt.println(add5(20))   // 25

    // Immediate invocation
    result := proc(a, b: int) -> int { return a + b }(3, 4)
    fmt.println(result)  // 7

    // Using a proc variable in a loop
    ops := [3]proc(int) -> int{
        proc(x: int) -> int { return x + 1 },
        proc(x: int) -> int { return x * 2 },
        proc(x: int) -> int { return x * x },
    }
    for op in ops {
        fmt.println(op(5))
    }
}
```

## Gotchas

- Closures in Odin capture by **reference** to variables on the enclosing stack frame. If the outer function returns while a goroutine-like callback still holds the closure, the reference may dangle. Odin does not have a garbage collector — be mindful of lifetimes.
- Procedure types include the calling convention — `proc(int) -> int` defaults to Odin calling convention.
- There is no syntax sugar like arrow functions — always use the full `proc(...) -> ... { ... }` form.
