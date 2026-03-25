---
title: "Arrays & Lists"
language: "rust"
feature: "arrays"
category: "data-structures"
applicable: true
---

Rust has fixed-size arrays (`[T; N]`) stored on the stack, and `Vec<T>` as the growable heap-allocated list. Arrays are value types copied on assignment for types that implement `Copy`. Slices (`&[T]`) are borrowed views into arrays or `Vec`s. `Vec` is the go-to collection for dynamic lists and is backed by a heap allocation that doubles in capacity when grown.

## Example

```rust
fn sum(slice: &[i32]) -> i32 {
    slice.iter().sum()
}

fn main() {
    // Fixed array
    let arr: [i32; 5] = [1, 2, 3, 4, 5];
    println!("{}", sum(&arr));

    // Vec — dynamic list
    let mut v: Vec<i32> = Vec::new();
    v.push(10);
    v.push(20);
    v.extend([30, 40, 50]);
    println!("{:?}", v);
    println!("len={}, cap={}", v.len(), v.capacity());

    // Slice of a vec
    let middle = &v[1..4];
    println!("{:?}", middle);
}
```

## Gotchas

- Array indexing panics at runtime on out-of-bounds access; use `.get(i)` to get an `Option<&T>` for safe access.
- `Vec::with_capacity(n)` pre-allocates space, avoiding repeated reallocations when the final size is known.
- Slices do not own their data; the underlying `Vec` or array must remain alive for at least as long as the slice.
