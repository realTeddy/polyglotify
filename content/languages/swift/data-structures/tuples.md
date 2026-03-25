---
title: "Tuples"
language: "swift"
feature: "tuples"
category: "data-structures"
applicable: true
---

Tuples in Swift group multiple values of potentially different types into a single compound value. They can have named or unnamed elements and are primarily used for temporary groupings or multiple return values. They are value types. For persistent data structures, named `struct` types are preferred.

## Example

```swift
// Unnamed elements, accessed by index
let point = (10, 20)
print(point.0, point.1)

// Named elements
let http200 = (statusCode: 200, description: "OK")
print(http200.statusCode, http200.description)

// Decomposition
let (x, y) = point
print(x, y)

// As function return type
func boundingBox(for points: [(Double, Double)]) -> (minX: Double, maxX: Double) {
    let xs = points.map { $0.0 }
    return (xs.min()!, xs.max()!)
}

let box = boundingBox(for: [(1, 2), (5, 3), (-1, 8)])
print("min: \(box.minX), max: \(box.maxX)")
```

## Gotchas

- Tuples are not `Hashable` or `Equatable` by default and cannot be used as dictionary keys or set members.
- Tuples with different element labels are technically compatible at the type level in some contexts, which can lead to subtle bugs when refactoring labels.
- Swift tuples are not suitable as persistent data models; use `struct` with proper naming and protocol conformances instead.
