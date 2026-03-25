---
title: "Closures & Lambdas"
language: "rust"
feature: "closures"
category: "functions"
applicable: true
---

Rust closures are anonymous functions written with `|params| expression`. They can capture variables from the surrounding scope by reference (default), by mutable reference, or by value (with the `move` keyword). Closures implement one of the `Fn`, `FnMut`, or `FnOnce` traits depending on how they use captured variables. They are used extensively with iterators.

## Example

```rust
fn apply<F: Fn(i32) -> i32>(f: F, x: i32) -> i32 {
    f(x)
}

fn main() {
    let factor = 3;
    let multiply = |x| x * factor;  // captures factor by reference

    println!("{}", apply(multiply, 7)); // 21

    // move closure — takes ownership of captured vars
    let greeting = String::from("Hello");
    let greet = move || println!("{greeting}");
    greet();
    // println!("{greeting}"); // compile error: moved into closure

    // Iterator pipeline with closures
    let result: Vec<i32> = (1..=5)
        .filter(|x| x % 2 == 0)
        .map(|x| x * x)
        .collect();
    println!("{result:?}");
}
```

## Gotchas

- Closures that mutate captured variables must be `FnMut`; storing them in a struct field or returning them requires the appropriate trait bound.
- `move` closures are required when passing a closure to a new thread, because the thread may outlive the current scope.
- The compiler infers closure types but does not allow different call-site types for the same closure; each closure has a unique anonymous type.
