---
title: "Operators"
language: "rust"
feature: "operators"
category: "basics"
applicable: true
---

Rust supports standard arithmetic, comparison, logical, and bitwise operators. Operators can be overloaded by implementing traits from `std::ops` (e.g., `Add`, `Sub`, `Mul`). Rust also has the range operators `..` (exclusive end) and `..=` (inclusive end) used in slices and `for` loops.

## Example

```rust
fn main() {
    let (a, b) = (10i32, 3i32);
    println!("{} {} {} {} {}", a + b, a - b, a * b, a / b, a % b);

    // Bitwise
    println!("{} {} {} {}", a & b, a | b, a ^ b, !a);

    // Range operators
    let sum: i32 = (1..=100).sum();
    println!("Sum 1..=100 = {sum}");

    // Comparison yields bool
    println!("{}", (a > b) && (b != 0));
}
```

## Gotchas

- Integer division truncates toward zero; use floating-point types for true division.
- The `!` operator is bitwise NOT for integers (not logical NOT); logical NOT is also `!` for booleans — context determines the meaning.
- Rust does not have `++` or `--` operators; use `+= 1` and `-= 1` instead.
