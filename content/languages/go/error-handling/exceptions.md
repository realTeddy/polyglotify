---
title: "Exceptions & Try/Catch"
language: "go"
feature: "exceptions"
category: "error-handling"
applicable: false
---

Go has no exceptions or try/catch. Errors are returned as ordinary values — typically as the last return value of type `error`. The `panic`/`recover` mechanism exists but is reserved for truly unrecoverable situations or as an internal mechanism within a package (not as a substitute for exceptions in APIs).

## Example

```go
package main

import (
    "errors"
    "fmt"
)

var ErrNotFound = errors.New("not found")

func findUser(id int) (string, error) {
    users := map[int]string{1: "Alice", 2: "Bob"}
    name, ok := users[id]
    if !ok {
        return "", fmt.Errorf("findUser %d: %w", id, ErrNotFound)
    }
    return name, nil
}

func main() {
    name, err := findUser(3)
    if err != nil {
        if errors.Is(err, ErrNotFound) {
            fmt.Println("User does not exist")
        } else {
            fmt.Println("Unexpected error:", err)
        }
        return
    }
    fmt.Println("Found:", name)
}
```

## Gotchas

- `panic` unwinds the stack and cannot be caught in a different goroutine; a panic in one goroutine that is not recovered crashes the entire program.
- `recover` only works when called directly inside a deferred function; calling it from a helper function has no effect.
- Wrapping errors with `%w` in `fmt.Errorf` enables `errors.Is` and `errors.As` for structured error inspection without breaking the error chain.
