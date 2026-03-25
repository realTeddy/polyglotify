---
title: "Function Declaration"
language: "swift"
feature: "declaration"
category: "functions"
applicable: true
---

Swift functions are declared with `func`. Each parameter has an external (call-site) label and an internal (implementation) name. Return types follow `->`. Functions are first-class values. Nested functions, default parameter values, and overloading by parameter label are all supported.

## Example

```swift
func greet(person name: String, loudly: Bool = false) -> String {
    let greeting = "Hello, \(name)!"
    return loudly ? greeting.uppercased() : greeting
}

// External label "person", internal name "name"
print(greet(person: "Alice"))
print(greet(person: "Bob", loudly: true))

// Omit external label with _
func add(_ a: Int, _ b: Int) -> Int { a + b }
print(add(3, 4))

// Functions as first-class values
let fn: (Int, Int) -> Int = add
print(fn(10, 20))
```

## Gotchas

- Callers must always use the external parameter labels; calling `greet("Alice")` without the label `person:` is a compile error.
- Using `_` as the external label makes parameters positional (no label required at the call site), which is common for mathematical operations.
- Swift supports function overloading by parameter label; `func foo(x: Int)` and `func foo(y: Int)` are distinct functions.
