---
title: "Common Patterns"
language: "vlang"
feature: "common-patterns"
category: "idioms"
applicable: true
---

V idioms favor simplicity, explicit error handling, and avoiding hidden allocations. `or { }` chains for error propagation, struct literals with field names for clarity, `match` for exhaustive dispatch on sum types, and method chaining via `mut` receivers are all idiomatic. V discourages global state, complex abstractions, and hidden control flow.

## Example

```v
// Exhaustive match on sum type
type Shape = Circle | Rectangle

struct Circle    { radius f64 }
struct Rectangle { width f64; height f64 }

fn area(s Shape) f64 {
    return match s {
        Circle    { math.pi * s.radius * s.radius }
        Rectangle { s.width * s.height }
    }
}

// Builder pattern via method chaining
struct QueryBuilder {
mut:
    table      string
    conditions []string
    lim        int = -1
}

fn (mut q QueryBuilder) from(table string) &QueryBuilder {
    q.table = table
    return &q
}

fn (mut q QueryBuilder) where_clause(cond string) &QueryBuilder {
    q.conditions << cond
    return &q
}

fn (mut q QueryBuilder) limit(n int) &QueryBuilder {
    q.lim = n
    return &q
}

// Error chain with or
fn process() !string {
    raw  := os.read_file('data.txt')!
    data := json.decode(Config, raw)!
    return data.value
}

// Defer for cleanup (RAII-like)
fn with_file() ! {
    f := os.open('data.txt')!
    defer { f.close() }
    // use f...
}
```

## Gotchas

- `match` on a sum type must be exhaustive; the compiler rejects non-exhaustive matches without an `else` branch.
- `defer` executes in LIFO order when the function returns, making it ideal for resource cleanup.
- Avoid `unsafe` blocks; V's safety guarantees depend on the safe subset of the language.
