---
title: "Types & Type Systems"
language: "rust"
feature: "types"
category: "basics"
applicable: true
---

Rust has a rich static type system with type inference. Scalar types include integers (`i8`–`i128`, `u8`–`u128`, `isize`, `usize`), floats (`f32`, `f64`), `bool`, and `char` (Unicode scalar value). Compound types include tuples and arrays. Custom types are built with `struct` and `enum`. The type system enforces ownership and lifetimes at compile time.

## Example

```rust
fn main() {
    let n: i32 = -42;
    let f: f64 = 3.14;
    let b: bool = true;
    let c: char = '🦀';

    // Type inference
    let inferred = 1_000_000u64;

    // Casting (explicit, no implicit coercion)
    let y = n as f64;

    println!("{n} {f} {b} {c} {inferred} {y}");

    // Overflow in debug mode panics; in release mode wraps
    let wrapped = i8::MAX.wrapping_add(1); // -128
    println!("{wrapped}");
}
```

## Gotchas

- There are no implicit numeric conversions; `as` performs a lossless or potentially lossy cast depending on types, without runtime checks — truncation or wrap-around can occur silently in release builds.
- `char` is a 4-byte Unicode scalar value, not a byte; a `String` is UTF-8 encoded and indexing by byte position can panic if it falls in the middle of a multi-byte character.
- Integer overflow panics in debug mode but wraps in release mode; use `checked_add`, `saturating_add`, or `wrapping_add` for explicit control.
