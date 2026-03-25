---
title: "Style Conventions"
language: "rust"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Rust enforces style via `rustfmt` and enforces correctness via `clippy`. Naming conventions: `snake_case` for variables, functions, and modules; `PascalCase` for types and traits; `SCREAMING_SNAKE_CASE` for constants. Lines are typically wrapped at 100 characters. The `#[allow(dead_code)]` and `#[allow(unused)]` attributes suppress warnings during prototyping.

## Example

```rust
// Idiomatic Rust style
use std::collections::HashMap;

const MAX_CONNECTIONS: usize = 100;

#[derive(Debug, Clone)]
pub struct ConnectionPool {
    connections: HashMap<String, Vec<u8>>,
    max_size: usize,
}

impl ConnectionPool {
    pub fn new(max_size: usize) -> Self {
        Self {
            connections: HashMap::new(),
            max_size,
        }
    }

    pub fn is_full(&self) -> bool {
        self.connections.len() >= self.max_size
    }
}

fn process_items(items: &[&str]) -> Vec<String> {
    items.iter()
        .map(|s| s.to_uppercase())
        .collect()
}

fn main() {
    let pool = ConnectionPool::new(MAX_CONNECTIONS);
    println!("{}", pool.is_full());
    println!("{:?}", process_items(&["hello", "world"]));
}
```

## Gotchas

- `cargo fmt` and `cargo clippy` are run in most CI pipelines; failing either is treated as a build failure in well-maintained projects.
- Clippy has many lint levels; `#[deny(clippy::all)]` turns all lints into errors, while specific lints can be allowed or denied individually.
- Prefer `impl Into<String>` over `&str` or `String` in public API function parameters to give callers maximum flexibility with zero overhead.
