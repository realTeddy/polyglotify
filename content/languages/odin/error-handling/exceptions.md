---
title: "Exceptions & Try/Catch"
language: "odin"
feature: "exceptions"
category: "error-handling"
applicable: false
---

Odin has no exceptions or try/catch. Error handling is explicit via multiple return values, typically `(value, ok)` or `(value, Error)` pairs. Unrecoverable errors use `panic` or `assert`. The `or_return` and `or_else` operators provide ergonomic error propagation.

## Example

```odin
package main

import "core:fmt"
import "core:os"

// Errors as enum values
ParseError :: enum {
    None,
    InvalidInput,
    OutOfRange,
}

parse_positive :: proc(s: string) -> (int, ParseError) {
    // Simplified
    if len(s) == 0 {
        return 0, .InvalidInput
    }
    n := 42  // pretend we parsed it
    if n < 0 {
        return 0, .OutOfRange
    }
    return n, .None
}

// or_return: propagate errors automatically
process :: proc(s: string) -> (int, ParseError) {
    n := parse_positive(s) or_return  // returns error if not .None
    return n * 2, .None
}

main :: proc() {
    // Explicit check
    val, err := parse_positive("42")
    if err != .None {
        fmt.println("Error:", err)
        return
    }
    fmt.println(val)

    // or_else provides a default
    result, _ := parse_positive("")
    safe := result if result != 0 else -1

    // assert / panic for unrecoverable
    data, ok := os.read_entire_file("config.txt")
    assert(ok, "Failed to read config file")  // panics with message if false

    fmt.println(safe)
}
```

## Gotchas

- `panic` terminates the program (or the current thread in some contexts) — there is no recovery mechanism unlike Go's `recover`.
- `assert` is disabled in `-no-bounds-check` / optimized builds unless you use `assert` specifically (not `when`).
- The `or_return` operator requires the enclosing procedure to return a compatible error type.
- There is no stack unwinding — resources must be cleaned up via `defer` before an error return.
