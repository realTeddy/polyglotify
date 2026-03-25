---
title: "Closures & Lambdas"
language: "vlang"
feature: "closures"
category: "functions"
applicable: true
---

V supports anonymous functions and closures. Closures capture variables by reference by default when marked `mut`, or by value for immutable captures. Function values have types like `fn(int) int`. Higher-order functions such as `map`, `filter`, and `sort_with_compare` accept function parameters. V closures are limited compared to some languages — captured mutable state requires care.

## Example

```v
fn main() {
    // Anonymous function
    double := fn(x int) int { return x * 2 }
    println(double(5))  // 10

    // Closure capturing immutable variable
    factor := 3
    triple := fn [factor](x int) int { return x * factor }
    println(triple(4))  // 12

    // Closure capturing mutable variable
    mut count := 0
    increment := fn [mut count]() {
        count++
    }
    increment()
    increment()
    println(count)  // 2

    // Higher-order function
    nums := [1, 2, 3, 4, 5]
    doubled := nums.map(fn(x int) int { return x * 2 })
    evens   := nums.filter(fn(x int) bool { return x % 2 == 0 })
    println(doubled)  // [2, 4, 6, 8, 10]
    println(evens)    // [2, 4]

    // Returning a closure
    make_adder := fn(n int) fn(int) int {
        return fn [n](x int) int { return x + n }
    }
    add10 := make_adder(10)
    println(add10(5))  // 15
}
```

## Gotchas

- Captured variables must be listed explicitly in `[var1, var2]` between `fn` and `(`: `fn [x, mut y](a int) int { ... }`.
- Mutable captures require `mut` in the capture list; without it, captured variables are copied by value.
- V closures cannot outlive their parent stack frame in unsafe code; the compiler enforces lifetime constraints.
