---
title: "Exceptions & Try/Catch"
language: "vlang"
feature: "exceptions"
category: "error-handling"
applicable: false
---

V does not have exceptions or try/catch. Error handling is done through result types (`!T`) and optional types (`?T`). Functions signal errors by returning `error('message')` or `none`. Callers handle errors with `or { }` blocks or propagate them with `!`. This is a deliberate design choice to make error handling explicit and visible at every call site.

## Example

```v
import os

// Result type — returns value or IError
fn read_config(path string) !string {
    contents := os.read_file(path) or {
        return error('failed to read config: $err')
    }
    return contents
}

fn parse_port(s string) !int {
    port := s.int()
    if port <= 0 || port > 65535 {
        return error('invalid port: $s')
    }
    return port
}

fn main() {
    // Handle with or
    config := read_config('app.conf') or {
        println('Warning: $err')
        'default config'
    }
    println(config)

    // Propagate with !
    // (only works inside a function returning !T)
    // port := parse_port('8080')!

    // Check and branch
    result := parse_port('abc')
    if result !is IError {
        println('port: $result')
    } else {
        println('error: $result')
    }
}
```

## Gotchas

- V's lack of exceptions means error handling is always local and explicit — there are no unhandled exceptions at runtime.
- `panic()` terminates the program immediately and should only be used for unrecoverable programmer errors.
- The `!` propagation operator works only inside functions that themselves return a result type.
