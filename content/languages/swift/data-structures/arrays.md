---
title: "Arrays & Lists"
language: "swift"
feature: "arrays"
category: "data-structures"
applicable: true
---

Swift's `Array<Element>` (written `[Element]`) is a value type that stores an ordered collection. Because arrays are value types, assigning or passing one copies it (with copy-on-write optimization to avoid unnecessary copies). Mutation requires `var`. The standard library provides rich functional methods like `map`, `filter`, `reduce`, `sorted`, and `compactMap`.

## Example

```swift
var fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits.insert("avocado", at: 1)
fruits.remove(at: 0)

print(fruits)           // ["avocado", "banana", "cherry", "date"]
print(fruits.count)
print(fruits[1])        // "banana"

// Functional operations
let lengths = fruits.map { $0.count }
let long = fruits.filter { $0.count > 6 }
let total = lengths.reduce(0, +)
print(lengths, long, total)

// Safe access
if let first = fruits.first {
    print(first)
}
```

## Gotchas

- Accessing an out-of-bounds index crashes at runtime; use `.indices.contains(i)` or optional extensions for safe access instead.
- `Array` is copy-on-write: copying is O(1) until a mutation occurs, at which point it becomes O(n) — be aware of performance implications in tight loops.
- `compactMap` both maps and unwraps optionals, dropping `nil` results — prefer it over `map` followed by `filter { $0 != nil }`.
