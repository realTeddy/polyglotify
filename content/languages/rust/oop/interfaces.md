---
title: "Interfaces & Traits"
language: "rust"
feature: "interfaces"
category: "oop"
applicable: true
---

Traits are Rust's primary abstraction mechanism, similar to interfaces but more powerful. A trait defines a set of method signatures (and optionally default implementations) that types must fulfill. Traits can also define associated types and constants. They are used for static dispatch (generics) and dynamic dispatch (trait objects with `dyn`).

## Example

```rust
use std::fmt;

trait Summary {
    fn summarize_author(&self) -> String;

    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}

struct Tweet {
    username: String,
    content: String,
}

impl Summary for Tweet {
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}

// impl Trait syntax for parameters
fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}

fn main() {
    let tweet = Tweet { username: "rustlang".into(), content: "Exciting!".into() };
    notify(&tweet);
}
```

## Gotchas

- A trait can only be implemented for a type if either the trait or the type is defined in the current crate (the orphan rule); this prevents conflicting implementations.
- `dyn Trait` must be object-safe — traits with methods that return `Self` or use generic parameters cannot be made into trait objects.
- The `impl Trait` return type syntax hides the concrete type from the caller; use `Box<dyn Trait>` when you need to return different concrete types from the same function.
