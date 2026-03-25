---
title: "Sets"
language: "rust"
feature: "sets"
category: "data-structures"
applicable: true
---

Rust provides `HashSet<T>` and `BTreeSet<T>` in `std::collections`. `HashSet` requires elements to implement `Eq + Hash`; `BTreeSet` requires `Ord`. Both support standard set operations: union, intersection, difference, and symmetric difference, all returning iterators.

## Example

```rust
use std::collections::HashSet;

fn main() {
    let mut a: HashSet<i32> = [1, 2, 3, 4].iter().cloned().collect();
    let b: HashSet<i32> = [3, 4, 5, 6].iter().cloned().collect();

    a.insert(10);
    a.remove(&1);
    println!("Contains 2: {}", a.contains(&2));

    let union: HashSet<_> = a.union(&b).collect();
    let inter: HashSet<_> = a.intersection(&b).collect();
    let diff:  HashSet<_> = a.difference(&b).collect();

    println!("Union: {union:?}");
    println!("Intersection: {inter:?}");
    println!("Difference: {diff:?}");
}
```

## Gotchas

- `HashSet` iteration order is not defined; use `BTreeSet` when you need sorted iteration.
- Set operations like `union` return an iterator, not a new `HashSet`; call `.collect()` to materialize the result.
- `insert` returns `true` if the value was newly inserted and `false` if it was already present — useful for deduplication logic.
