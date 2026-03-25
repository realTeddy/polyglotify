---
title: "Generics"
language: "swift"
feature: "generics"
category: "oop"
applicable: true
---

Swift generics allow writing flexible, reusable code. Type parameters appear in angle brackets after the type or function name. Protocol constraints restrict what operations are available. `some Type` (opaque return type, Swift 5.1+) and `any Type` (existential, Swift 5.7+) provide two different ways to work with protocol types.

## Example

```swift
// Generic function with constraint
func max<T: Comparable>(_ a: T, _ b: T) -> T {
    a > b ? a : b
}

// Generic type
struct Stack<Element> {
    private var items: [Element] = []

    mutating func push(_ item: Element) { items.append(item) }

    mutating func pop() -> Element? { items.popLast() }

    var top: Element? { items.last }
    var isEmpty: Bool { items.isEmpty }
}

var stack = Stack<Int>()
stack.push(1)
stack.push(2)
stack.push(3)
print(stack.pop()!)   // 3
print(stack.top!)     // 2

print(max(42, 17))    // 42
print(max("apple", "banana"))  // banana
```

## Gotchas

- Swift generics are resolved at compile time (unlike Java's type erasure) and produce specialized code — similar to Rust's monomorphization.
- `where` clauses express complex constraints: `func zip<S: Sequence, T: Sequence>(_ s: S, _ t: T) -> ... where S.Element == T.Element`.
- `some Protocol` as a return type commits to a single concrete type per function; returning different types conditionally requires `any Protocol` (existential boxing).
