---
title: "Return Values"
language: "odin"
feature: "return-values"
category: "functions"
applicable: true
---

Odin natively supports multiple return values from procedures, which is the idiomatic way to return both a result and an error/status. Return values can be named, which initializes them to zero and allows a bare `return`. The common convention is `(value, ok)` or `(value, err)` pairs.

## Example

```odin
package main

import "core:fmt"

// Multiple return values
parse_int :: proc(s: string) -> (int, bool) {
    // Simplified example
    if len(s) == 0 {
        return 0, false
    }
    // ... real parsing logic
    return 42, true
}

// Named return values
open_file :: proc(path: string) -> (handle: int, err: string) {
    if path == "" {
        err = "empty path"
        return  // bare return: uses named values
    }
    handle = 1  // simulated file handle
    return
}

// Error union pattern (alternative using Maybe)
Error :: enum { None, DivisionByZero, Overflow }

safe_div :: proc(a, b: int) -> (int, Error) {
    if b == 0 {
        return 0, .DivisionByZero
    }
    return a / b, .None
}

main :: proc() {
    val, ok := parse_int("123")
    if !ok {
        fmt.println("parse failed")
    } else {
        fmt.println(val)
    }

    h, err := open_file("")
    fmt.println(h, err)

    result, e := safe_div(10, 0)
    if e != .None {
        fmt.println("error:", e)
    } else {
        fmt.println(result)
    }
}
```

## Gotchas

- Named return values are zero-initialized at function entry — useful for early returns.
- A bare `return` only works when all return values are named.
- Multiple return values are NOT tuples — you cannot store them in a single variable without destructuring.
- The `or_return` operator (available in newer Odin) propagates an error value: `val := might_fail() or_return`.
