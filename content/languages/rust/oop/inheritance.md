---
title: "Inheritance"
language: "rust"
feature: "inheritance"
category: "oop"
applicable: false
---

Rust has no struct inheritance. Behavior reuse is achieved through traits (for shared contracts and default implementations) and composition (embedding a type as a field). Traits can have default method implementations that concrete types may override, providing a limited form of mixin-like reuse without the fragile base-class problem.

## Example

```rust
trait Animal {
    fn name(&self) -> &str;

    // Default implementation
    fn description(&self) -> String {
        format!("{} is an animal", self.name())
    }
}

struct Dog { name: String }
struct Cat { name: String }

impl Animal for Dog {
    fn name(&self) -> &str { &self.name }
    // Uses default description()
}

impl Animal for Cat {
    fn name(&self) -> &str { &self.name }
    fn description(&self) -> String {
        format!("{} is a mysterious cat", self.name())
    }
}

fn print_animal(a: &dyn Animal) {
    println!("{}", a.description());
}

fn main() {
    print_animal(&Dog { name: "Rex".into() });
    print_animal(&Cat { name: "Whiskers".into() });
}
```

## Gotchas

- Trait objects (`dyn Trait`) enable runtime polymorphism but incur a vtable lookup cost; generic bounds (`impl Trait` or `<T: Trait>`) are resolved at compile time with zero overhead.
- A type can implement any number of traits, but trait implementations must not overlap for the same type (no conflicting method sets).
