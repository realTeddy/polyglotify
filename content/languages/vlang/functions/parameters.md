---
title: "Parameters & Arguments"
language: "vlang"
feature: "parameters"
category: "functions"
applicable: true
---

V function parameters are immutable by default. Mutable parameters are marked `mut` and the caller must also pass with `mut`. Variadic parameters use `...Type`. V does not have keyword arguments. Structs with default values serve as a flexible alternative for named/optional parameters. References are passed explicitly with `&`.

## Example

```v
// Basic parameters (immutable)
fn greet(name string, times int) {
    for _ in 0..times {
        println('Hello, $name!')
    }
}

// Mutable parameter
fn increment(mut n int) {
    n++
}

fn main() {
    mut x := 5
    increment(mut x)
    println(x)  // 6
}

// Variadic
fn sum(nums ...int) int {
    mut total := 0
    for n in nums {
        total += n
    }
    return total
}

// sum(1, 2, 3, 4)  => 10

// Struct as named-parameter alternative
struct ConnectOptions {
    host string = 'localhost'
    port int    = 80
    tls  bool   = false
}

fn connect(opts ConnectOptions) string {
    proto := if opts.tls { 'https' } else { 'http' }
    return '${proto}://${opts.host}:${opts.port}'
}

// connect(ConnectOptions{ host: 'example.com', port: 443, tls: true })
```

## Gotchas

- You must pass `mut variable` at the call site when the function takes a `mut` parameter — it is not implicit.
- Variadic parameters are passed as a slice (`[]int`) inside the function.
- V has no default parameter values in the function signature; use a struct with field defaults instead.
