---
title: "Result Types"
language: "odin"
feature: "result-types"
category: "error-handling"
applicable: true
---

Odin uses multiple return values with an error/bool as the idiomatic result type pattern. Common conventions are `(T, bool)` for simple present/absent, `(T, Error)` for typed errors where `Error` is an enum, and `(T, string)` for error messages. The `or_return` and `or_else` operators reduce boilerplate.

## Example

```odin
package main

import "core:fmt"
import "core:strconv"

IOError :: enum { None, NotFound, PermissionDenied, EOF }

read_config :: proc(path: string) -> (string, IOError) {
    if path == "" {
        return "", .NotFound
    }
    return "config_data", .None
}

parse_port :: proc(s: string) -> (int, string) {
    n, ok := strconv.parse_int(s)
    if !ok {
        return 0, "invalid port number"
    }
    if n < 1 || n > 65535 {
        return 0, "port out of range"
    }
    return n, ""
}

// Chaining with or_return
startup :: proc() -> (bool, IOError) {
    cfg := read_config("/etc/app.conf") or_return
    fmt.println("Config:", cfg)
    return true, .None
}

main :: proc() {
    // Two-value result check
    cfg, err := read_config("app.conf")
    if err != .None {
        fmt.println("Failed:", err)
    } else {
        fmt.println("Config:", cfg)
    }

    // or_else for fallback
    port_str := "8080"
    port, port_err := parse_port(port_str)
    if port_err != "" {
        fmt.println("Error:", port_err)
    } else {
        fmt.println("Port:", port)
    }

    ok, startup_err := startup()
    fmt.println(ok, startup_err)
}
```

## Gotchas

- There is no generic `Result(T, E)` type — you use multiple returns directly. This avoids boxing overhead.
- `or_return` works when the error value is the **last** return value and the calling procedure returns a compatible type.
- `or_else` provides a fallback value: `val := might_fail() or_else default_val`.
- Enums for errors are idiomatic — they are cheap (single integer) and easy to `switch` on.
