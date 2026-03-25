---
title: "Tuples"
language: "rust"
feature: "tuples"
category: "data-structures"
applicable: true
---

Rust has built-in tuple types: fixed-length, ordered collections of values that may have different types. Tuples are accessed by index using `.0`, `.1`, etc. They can be destructured in `let` bindings and function parameters. The unit type `()` is the zero-element tuple and is Rust's "no value" type.

## Example

```rust
fn min_max(nums: &[i32]) -> (i32, i32) {
    let min = *nums.iter().min().unwrap();
    let max = *nums.iter().max().unwrap();
    (min, max)
}

fn main() {
    let t: (i32, f64, &str) = (1, 2.5, "hello");

    // Index access
    println!("{} {} {}", t.0, t.1, t.2);

    // Destructuring
    let (a, b, c) = t;
    println!("{a} {b} {c}");

    // Return multiple values
    let (lo, hi) = min_max(&[3, 1, 4, 1, 5, 9]);
    println!("min={lo}, max={hi}");

    // Tuple struct (newtype pattern)
    struct Meters(f64);
    let distance = Meters(42.0);
    println!("{}", distance.0);
}
```

## Gotchas

- Tuple indices must be integer literals at compile time; you cannot index a tuple with a variable.
- Tuples with more than a handful of elements are awkward to use; prefer named structs for readability once the element count grows.
- The unit type `()` is both a type and its only value; functions with no explicit return type implicitly return `()`.
