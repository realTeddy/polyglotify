---
title: "Parameters & Arguments"
language: "odin"
feature: "parameters"
category: "functions"
applicable: true
---

Odin supports positional parameters, default parameter values, and `#any_int` / `#c_vararg` for special cases. Parameters are passed by value by default; use pointers (`^T`) for mutation or large structs. Named parameters at call sites are not supported — arguments are positional. Variadic parameters use `..` syntax.

## Example

```odin
package main

import "core:fmt"

// Basic parameters
greet :: proc(name: string, times: int = 1) {
    for i in 0..<times {
        fmt.printf("Hello, %s!\n", name)
    }
}

// Pointer parameter (pass by reference)
increment :: proc(n: ^int) {
    n^ += 1
}

// Variadic parameters
sum :: proc(nums: ..int) -> int {
    total := 0
    for n in nums {
        total += n
    }
    return total
}

// Passing a slice where variadic expected
print_all :: proc(items: ..string) {
    for item in items {
        fmt.println(item)
    }
}

main :: proc() {
    greet("Alice")        // uses default times=1
    greet("Bob", 3)

    x := 10
    increment(&x)
    fmt.println(x)        // 11

    fmt.println(sum(1, 2, 3, 4, 5))  // 15

    words := []string{"hello", "world"}
    print_all(..words)    // expand slice into variadic
}
```

## Gotchas

- Parameters are **passed by value** — structs are copied. Use `^Struct` to avoid large copies or to mutate.
- Default values must be compile-time constants.
- To expand a slice into a variadic parameter, use the `..` spread operator: `f(..my_slice)`.
- Odin does not support named arguments at call sites; parameters are purely positional.
