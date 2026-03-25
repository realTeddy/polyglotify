---
title: "Variables & Declaration"
language: "swift"
feature: "variables"
category: "basics"
applicable: true
---

Swift uses `let` for constants (immutable) and `var` for variables (mutable). Both support type inference; explicit type annotations are written as `name: Type`. Constants are preferred by default — the compiler warns if a `var` is never mutated. String interpolation uses `\(expression)` inside a string literal.

## Example

```swift
let name = "Swift"            // inferred as String, immutable
var count = 0                 // inferred as Int, mutable
let pi: Double = 3.14159

count += 1

// Multiline string
let message = """
    Hello, \(name)!
    Count is \(count).
    """
print(message)

// Type annotation with optional
var optionalAge: Int? = nil
optionalAge = 25
```

## Gotchas

- Assigning to a `let` constant after initialization is a compile error, not a runtime crash.
- Swift's `let` for reference types (class instances) makes the binding constant, not the object — you can still call mutating methods on a `let` class instance.
- All variables must be initialized before use; the compiler performs definite initialization analysis and rejects potentially uninitialized reads.
