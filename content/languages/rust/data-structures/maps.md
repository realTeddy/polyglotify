---
title: "Maps & Dictionaries"
language: "rust"
feature: "maps"
category: "data-structures"
applicable: true
---

Rust's standard library provides `HashMap<K, V>` in `std::collections`. Keys must implement `Eq` and `Hash`. The entry API provides an ergonomic way to insert-or-update. `BTreeMap<K, V>` is the ordered alternative, useful when key-sorted iteration is required.

## Example

```rust
use std::collections::HashMap;

fn main() {
    let mut scores: HashMap<String, i32> = HashMap::new();

    scores.insert("Alice".to_string(), 95);
    scores.insert("Bob".to_string(), 87);

    // Entry API — insert if absent
    scores.entry("Carol".to_string()).or_insert(91);

    // Modify in place
    *scores.entry("Bob".to_string()).or_insert(0) += 5;

    // Access — returns Option<&V>
    if let Some(&score) = scores.get("Alice") {
        println!("Alice: {score}");
    }

    // Remove
    scores.remove("Bob");

    for (name, score) in &scores {
        println!("{name}: {score}");
    }
}
```

## Gotchas

- `HashMap` is not ordered; use `BTreeMap` when you need sorted keys.
- Inserting an owned `String` key moves it into the map; use `.to_string()` on a literal or clone if you need to keep the original.
- The default hasher (`SipHash`) is DOS-resistant but slower than `FxHashMap` from `rustc-hash` for purely internal use cases.
