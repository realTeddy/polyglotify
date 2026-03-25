---
title: "Parameters & Arguments"
language: "rust"
feature: "parameters"
category: "functions"
applicable: true
---

Rust passes primitive types by value (copy semantics) and heap-allocated types by move (ownership transfer) unless a reference is taken. To borrow without transferring ownership, pass a reference (`&T`) or mutable reference (`&mut T`). There are no variadic functions in stable Rust (macros handle variadic-like use cases); however, slices are used to pass a variable number of items.

## Example

```rust
fn sum(nums: &[i32]) -> i32 {
    nums.iter().sum()
}

fn append_one(v: &mut Vec<i32>) {
    v.push(1);
}

fn takes_ownership(s: String) -> String {
    format!("{s} world")
}

fn main() {
    let nums = vec![1, 2, 3, 4, 5];
    println!("{}", sum(&nums)); // borrow
    println!("{:?}", nums);     // still valid

    let mut v = vec![10, 20];
    append_one(&mut v);
    println!("{:?}", v);

    let s = String::from("hello");
    let result = takes_ownership(s);
    // println!("{s}"); // compile error: s was moved
    println!("{result}");
}
```

## Gotchas

- Passing a `String` to a function moves it; the caller can no longer use the variable unless the function returns it or the caller passes `&str`/`&String` instead.
- The borrow checker enforces that at most one mutable reference OR any number of immutable references exist at a time — mixing them is a compile error.
- There are no default parameter values; use the builder pattern or `Option<T>` parameters as alternatives.
