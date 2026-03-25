---
title: "Result Types"
language: "vlang"
feature: "result-types"
category: "error-handling"
applicable: true
---

V has two built-in result-like types: `?T` (optional — value or `none`) and `!T` (result — value or an `IError`). These are the primary error handling mechanism. `or { }` provides a fallback or error handler. `!` propagates the error to the caller. Custom error types implement the `IError` interface.

## Example

```v
// Optional — value or none
fn find_user(id int) ?string {
    users := {1: 'Alice', 2: 'Bob'}
    return users[id] or { return none }
}

// Result — value or IError
fn divide(a f64, b f64) !f64 {
    if b == 0.0 {
        return error('division by zero')
    }
    return a / b
}

fn main() {
    // Optional handling
    user := find_user(1) or { 'anonymous' }
    println(user)  // Alice

    name := find_user(99) or { 'not found' }
    println(name)  // not found

    // Result handling
    result := divide(10.0, 2.0) or {
        println('Error: $err')
        0.0
    }
    println(result)  // 5.0

    divide(1.0, 0.0) or {
        println('Caught: $err')  // Caught: division by zero
    }
}

// Custom error type
struct ValidationError {
    field   string
    message string
}

fn (e ValidationError) msg() string {
    return 'Validation error on ${e.field}: ${e.message}'
}

fn validate_age(age int) ! {
    if age < 0 || age > 150 {
        return IError(ValidationError{field: 'age', message: 'out of range'})
    }
}
```

## Gotchas

- `!` (propagation) can only be used inside a function that returns `?T` or `!T`.
- In `or { }` blocks, `err` is automatically bound to the error value when the result type is `!T`.
- `?T` and `!T` are distinct: `?T` communicates "absence", `!T` communicates "failure with a reason".
