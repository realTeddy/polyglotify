---
title: "Sets"
language: "gleam"
feature: "sets"
category: "data-structures"
applicable: true
---

Gleam provides `Set(a)` in the `gleam/set` module, built on top of `Dict`. Sets store unique values of a single type. All standard set operations (union, intersection, difference, membership) are available. Sets are immutable.

## Example

```gleam
import gleam/io
import gleam/set

pub fn main() {
  let a = set.from_list([1, 2, 3, 4, 5])
  let b = set.from_list([3, 4, 5, 6, 7])

  // Membership
  io.debug(set.contains(a, 3))   // True
  io.debug(set.contains(a, 99))  // False

  // Set operations
  let union_ab  = set.union(a, b)
  let inter_ab  = set.intersection(a, b)
  let diff_ab   = set.difference(a, b)

  io.debug(set.to_list(union_ab))
  io.debug(set.to_list(inter_ab))
  io.debug(set.to_list(diff_ab))

  // Insert / delete
  let c = set.insert(a, 10)
  let d = set.delete(a, 1)
  io.debug(set.size(c))
  io.debug(set.to_list(d))
}
```

## Gotchas

- `set.to_list` returns elements in an unspecified order — do not rely on ordering.
- Sets are backed by `Dict`, so all operations are effectively O(log n) or O(n) depending on the BEAM's map implementation.
- There is no set literal syntax — use `set.from_list([...])`.
- Equality between sets uses structural equality, which correctly handles membership regardless of insertion order.
