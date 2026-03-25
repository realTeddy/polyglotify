---
title: "Structs & Classes"
language: "rust"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Rust uses `struct` as its primary composite data type. Behavior is added via `impl` blocks, which define methods and associated functions (including constructors). There are three kinds of structs: named-field structs, tuple structs, and unit structs. Rust has no classes; data and behavior are explicitly separated.

## Example

```rust
#[derive(Debug)]
struct Rectangle {
    width: f64,
    height: f64,
}

impl Rectangle {
    // Associated function (constructor)
    fn new(width: f64, height: f64) -> Self {
        Rectangle { width, height }
    }

    // Method — takes &self (immutable borrow)
    fn area(&self) -> f64 {
        self.width * self.height
    }

    // Method — takes &mut self
    fn scale(&mut self, factor: f64) {
        self.width *= factor;
        self.height *= factor;
    }
}

fn main() {
    let mut r = Rectangle::new(4.0, 6.0);
    println!("Area: {}", r.area());
    r.scale(2.0);
    println!("{r:?}");
}
```

## Gotchas

- `Self` in an `impl` block refers to the type being implemented, providing a convenient way to avoid repeating the type name.
- Struct fields are private by default to the module; use `pub` to expose them, or provide getter/setter methods.
- The `#[derive(Debug, Clone, PartialEq)]` attribute auto-generates common trait implementations — always derive `Debug` for types you intend to print.
