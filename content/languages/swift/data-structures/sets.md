---
title: "Sets"
language: "swift"
feature: "sets"
category: "data-structures"
applicable: true
---

Swift's `Set<Element>` is a value type unordered collection that stores unique elements conforming to `Hashable`. It supports the full range of mathematical set operations (`union`, `intersection`, `subtracting`, `symmetricDifference`) as both mutating and non-mutating methods.

## Example

```swift
var a: Set = [1, 2, 3, 4, 5]
let b: Set = [3, 4, 5, 6, 7]

a.insert(10)
a.remove(1)
print(a.contains(2))  // true

let union        = a.union(b)
let intersection = a.intersection(b)
let difference   = a.subtracting(b)
let symDiff      = a.symmetricDifference(b)

print(union.sorted())
print(intersection.sorted())

// Set from array (deduplication)
let words = ["apple", "banana", "apple", "cherry"]
let unique = Set(words)
print(unique.count)  // 3
```

## Gotchas

- Sets are unordered; use `.sorted()` when you need a predictable sequence for display or testing.
- `Set` initialized from an array literal requires an explicit type annotation (`var s: Set = [1, 2, 3]`), otherwise Swift infers `Array`.
- `Set` operations return new sets (non-mutating); the mutating equivalents are `formUnion`, `formIntersection`, etc.
