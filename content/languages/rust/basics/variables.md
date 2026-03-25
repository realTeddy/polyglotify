---
title: "Variables & Declaration"
language: "rust"
feature: "variables"
category: "basics"
applicable: true
---

Variables in Rust are declared with `let` and are immutable by default. Mutability is opt-in with `let mut`. Variable shadowing is allowed — redeclaring a variable with `let` in the same scope creates a new binding, allowing a type change. Constants are declared with `const` and require a type annotation and a compile-time-evaluable expression.

## Example

```rust
fn main() {
    let x = 5;           // immutable
    let mut y = 10;      // mutable
    y += 1;

    // Shadowing — can change type
    let spaces = "   ";
    let spaces = spaces.len(); // now usize, not &str

    const MAX_POINTS: u32 = 100_000;

    println!("{x} {y} {spaces} {MAX_POINTS}");
}
```

## Gotchas

- Attempting to assign to an immutable variable is a compile error, not a runtime panic.
- Shadowing with `let` is different from `mut`: a shadowed variable creates a new binding; the old one is gone (but its memory is freed when it goes out of scope).
- Unused variables produce a compiler warning; prefix the name with `_` (e.g., `_unused`) to suppress it.
