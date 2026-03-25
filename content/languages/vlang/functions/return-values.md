---
title: "Return Values"
language: "vlang"
feature: "return-values"
category: "functions"
applicable: true
---

V functions return values with the `return` keyword. Multiple values are returned as a tuple: `(T1, T2)`. Optional results use `?T` (value or `none`). Error results use `!T` (value or an `IError`). Callers handle optionals and results with `or { }` blocks or the `!` propagation operator.

## Example

```v
// Single return
fn double(n int) int {
    return n * 2
}

// Multiple return
fn min_max(arr []int) (int, int) {
    mut lo := arr[0]
    mut hi := arr[0]
    for v in arr {
        if v < lo { lo = v }
        if v > hi { hi = v }
    }
    return lo, hi
}

lo, hi := min_max([3, 1, 4, 1, 5, 9])
println('$lo $hi')  // 1 9

// Optional return
fn safe_div(a int, b int) ?f64 {
    if b == 0 { return none }
    return f64(a) / f64(b)
}

result := safe_div(10, 2) or { 0.0 }
println(result)  // 5.0

// Result / error return
fn read_file(path string) !string {
    // returns error if file not found
    return os.read_file(path)!
}

content := read_file('data.txt') or {
    println('Error: $err')
    ''
}
```

## Gotchas

- `!` after an optional/result expression propagates the error/none to the calling function (like Rust's `?`); the caller must also return `?T` or `!T`.
- Multiple return values are destructured with `:=` at the call site.
- Named return values are not supported in V; use explicit `return`.
