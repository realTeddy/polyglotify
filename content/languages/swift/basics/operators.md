---
title: "Operators"
language: "swift"
feature: "operators"
category: "basics"
applicable: true
---

Swift supports standard arithmetic, comparison, logical, and bitwise operators, plus the nil-coalescing operator `??`, the range operators `..<` (half-open) and `...` (closed), and custom operator definitions. Integer overflow is a runtime error by default; the `&+`, `&-`, `&*` overflow operators wrap intentionally.

## Example

```swift
let a = 10, b = 3

print(a + b, a - b, a * b, a / b, a % b)

// Nil coalescing
let name: String? = nil
print(name ?? "Unknown")  // "Unknown"

// Range operators
let range = 1...5
let halfOpen = 1..<5
for i in halfOpen { print(i) }  // 1, 2, 3, 4

// Overflow operators
let maxVal = Int8.max          // 127
let wrapped = maxVal &+ 1      // -128 (wraps)
print(wrapped)

// Custom operators
infix operator **: MultiplicationPrecedence
func **(base: Double, exp: Int) -> Double {
    (0..<exp).reduce(1.0) { acc, _ in acc * base }
}
print(2.0 ** 8)  // 256.0
```

## Gotchas

- `==` compares value equality; `===` compares reference (object identity) for class instances.
- Integer overflow without the `&` prefix operators causes a runtime trap in both debug and release builds.
- The nil-coalescing operator `??` short-circuits: the right side is not evaluated if the left side is non-nil.
