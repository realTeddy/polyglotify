---
title: "Variables & Declaration"
language: "vlang"
feature: "variables"
category: "basics"
applicable: true
---

V uses `mut` to declare mutable variables and plain assignment (`:=`) for immutable ones. All variables are immutable by default, requiring explicit `mut` for mutation. V is statically typed with type inference — you rarely need to annotate types explicitly. Unused variables are a compile error. Global variables require the `-g` flag (discouraged); prefer module-level `const` or function-local variables.

## Example

```v
fn main() {
    // Immutable variable (inferred type)
    x := 42
    name := 'Alice'

    // Mutable variable
    mut count := 0
    count++
    count += 10

    // Explicit type annotation
    score := f64(3.14)
    // or:
    mut value := 0.0

    // Constants (module-level)
    // const max_size = 100

    // Multiple assignment
    a, b := 1, 2
    mut c, mut d := 10, 20
    c, d = d, c   // swap

    println('$x $name $count $a $b $c $d')
}
```

## Gotchas

- Using an immutable variable in a context that requires mutation is a compile error; you must declare with `mut`.
- V prohibits unused variables — remove or rename to `_` to suppress.
- `_` is a blank identifier that discards a value: `_, err := risky_fn()`.
