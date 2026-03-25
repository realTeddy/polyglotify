---
title: "Result Types"
language: "go"
feature: "result-types"
category: "error-handling"
applicable: true
---

Go's idiomatic error handling is effectively a manual result type: functions return `(T, error)` and callers check the error before using the value. Go 1.13 introduced error wrapping with `%w` and the `errors.Is`/`errors.As` helpers for structured error inspection across call chains.

## Example

```go
package main

import (
    "errors"
    "fmt"
    "strconv"
)

type ParseError struct {
    Input string
    Err   error
}

func (e *ParseError) Error() string {
    return fmt.Sprintf("cannot parse %q: %v", e.Input, e.Err)
}
func (e *ParseError) Unwrap() error { return e.Err }

func parsePositive(s string) (int, error) {
    n, err := strconv.Atoi(s)
    if err != nil {
        return 0, &ParseError{Input: s, Err: err}
    }
    if n <= 0 {
        return 0, &ParseError{Input: s, Err: errors.New("must be positive")}
    }
    return n, nil
}

func main() {
    if n, err := parsePositive("42"); err == nil {
        fmt.Println(n)
    }

    _, err := parsePositive("abc")
    var pe *ParseError
    if errors.As(err, &pe) {
        fmt.Println("Parse error on:", pe.Input)
    }
}
```

## Gotchas

- Unlike Rust's `Result`, Go's `(T, error)` is not enforced by the compiler; it is entirely possible (and dangerous) to ignore the error value.
- Custom error types must implement the `error` interface (`Error() string`) and optionally `Unwrap() error` for chain inspection.
- Using `errors.As` instead of a direct type assertion is important because it traverses the error chain, not just the top-level error.
