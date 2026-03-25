---
title: "Return Values"
language: "swift"
feature: "return-values"
category: "functions"
applicable: true
---

Swift functions return a single value indicated after `->`. Tuples allow multiple values to be returned at once. `Optional<T>` (written `T?`) signals that a function may return no value. Swift 5.9 introduced result builders for DSL-style composable return expressions.

## Example

```swift
// Tuple return
func minMax(array: [Int]) -> (min: Int, max: Int)? {
    guard !array.isEmpty else { return nil }
    return (array.min()!, array.max()!)
}

if let result = minMax(array: [3, 1, 4, 1, 5, 9]) {
    print("min: \(result.min), max: \(result.max)")
}

// Multiple return paths with guard
func divide(_ a: Double, by b: Double) -> Double? {
    guard b != 0 else { return nil }
    return a / b
}

print(divide(10, by: 3) ?? 0)  // 3.3333...
print(divide(10, by: 0) ?? 0)  // 0.0
```

## Gotchas

- A function with no explicit return type implicitly returns `Void` (which is `()`), the empty tuple.
- Named tuple elements (e.g., `.min`, `.max`) are accessed by label, making call sites more readable than positional access.
- Single-expression functions can omit the `return` keyword (implicit return), just like computed properties.
