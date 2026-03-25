---
title: "Control Flow"
language: "odin"
feature: "control-flow"
category: "basics"
applicable: true
---

Odin provides `if`, `for` (the only loop construct, serving as while and for-each too), `switch`, and `when` (compile-time conditional). The `defer` statement schedules cleanup at scope exit. `break`, `continue`, and labelled breaks work inside loops. There is no `do/while` — use `for { ... ; if cond { break } }`.

## Example

```odin
package main

import "core:fmt"

main :: proc() {
    // if/else (no parens required)
    x := 42
    if x > 0 {
        fmt.println("positive")
    } else if x < 0 {
        fmt.println("negative")
    } else {
        fmt.println("zero")
    }

    // for as a while loop
    i := 0
    for i < 5 {
        fmt.println(i)
        i += 1
    }

    // for with index (C-style)
    for j := 0; j < 3; j += 1 {
        fmt.println(j)
    }

    // for range over slice
    nums := []int{10, 20, 30}
    for n, idx in nums {
        fmt.println(idx, n)
    }

    // switch
    day := "Monday"
    switch day {
    case "Monday", "Tuesday":
        fmt.println("early week")
    case "Friday":
        fmt.println("TGIF")
    case:
        fmt.println("other")
    }

    // defer (runs at scope exit, LIFO order)
    defer fmt.println("cleanup 1")
    defer fmt.println("cleanup 2")  // prints first (LIFO)
    fmt.println("main body")
}
```

## Gotchas

- `switch` cases do NOT fall through by default (unlike C). Use `fallthrough` to opt in.
- `for {}` is an infinite loop (no condition needed).
- `defer` captures the values of variables at the point of the `defer` statement, not at execution time — use a closure (`proc() { ... }()`) if you need current values.
- `when` is a compile-time `if` for conditional compilation — the non-matching branch is not parsed.
