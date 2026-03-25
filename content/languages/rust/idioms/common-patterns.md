---
title: "Common Patterns"
language: "rust"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Key Rust idioms include: the newtype pattern for type-safe wrappers, the builder pattern for constructing complex structs, `From`/`Into` for ergonomic conversions, `Iterator` combinators for declarative data processing, and `RAII` (Resource Acquisition Is Initialization) via `Drop` for deterministic cleanup.

## Example

```rust
// Newtype pattern
struct UserId(u64);
struct ProductId(u64);
// Prevents mixing UserId and ProductId even though both wrap u64

// Builder pattern
#[derive(Debug, Default)]
struct QueryBuilder {
    table: String,
    limit: Option<usize>,
    offset: Option<usize>,
}

impl QueryBuilder {
    fn table(mut self, t: &str) -> Self { self.table = t.into(); self }
    fn limit(mut self, n: usize) -> Self { self.limit = Some(n); self }
    fn offset(mut self, n: usize) -> Self { self.offset = Some(n); self }
    fn build(self) -> String {
        let mut q = format!("SELECT * FROM {}", self.table);
        if let Some(l) = self.limit  { q.push_str(&format!(" LIMIT {l}")); }
        if let Some(o) = self.offset { q.push_str(&format!(" OFFSET {o}")); }
        q
    }
}

fn main() {
    let q = QueryBuilder::default()
        .table("users")
        .limit(10)
        .offset(20)
        .build();
    println!("{q}");

    // Iterator combinators
    let words = vec!["hello", "world", "rust"];
    let result: String = words.iter()
        .filter(|w| w.len() > 4)
        .map(|w| w.to_uppercase())
        .collect::<Vec<_>>()
        .join(", ");
    println!("{result}");
}
```

## Gotchas

- The builder pattern using `mut self` (consuming builder) means each method call moves the builder — do not try to reuse intermediate builder values.
- `collect::<Vec<_>>()` requires a type hint because `collect` is generic over many collection types; the turbofish `collect::<Vec<_>>()` or a type annotation resolves this.
