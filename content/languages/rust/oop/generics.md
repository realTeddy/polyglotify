---
title: "Generics"
language: "rust"
feature: "generics"
category: "oop"
applicable: true
---

Rust generics are monomorphized at compile time — the compiler generates a concrete version of each generic function or type for every type it's called with, resulting in zero-overhead abstractions. Type parameters are constrained with trait bounds using the `where` clause or inline `<T: Bound>` syntax. Lifetimes are a separate kind of generic parameter.

## Example

```rust
use std::fmt::Display;

fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest { largest = item; }
    }
    largest
}

#[derive(Debug)]
struct Pair<T> {
    first: T,
    second: T,
}

impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.first >= self.second {
            println!("first={}", self.first);
        } else {
            println!("second={}", self.second);
        }
    }
}

fn main() {
    println!("{}", largest(&[34, 50, 25, 100, 65]));
    println!("{}", largest(&['y', 'm', 'a', 'q']));

    Pair { first: 5, second: 10 }.cmp_display();
}
```

## Gotchas

- Monomorphization increases binary size when a generic is instantiated with many different types; use `dyn Trait` for type erasure if binary size is a concern.
- Lifetime parameters are generics too; `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str` tells the compiler the return reference lives as long as the shorter of x and y.
- Trait bounds must be fully satisfied at the call site; a missing `Clone` or `Display` bound is a common compile error when first writing generic code.
