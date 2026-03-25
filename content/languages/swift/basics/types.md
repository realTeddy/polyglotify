---
title: "Types & Type Systems"
language: "swift"
feature: "types"
category: "basics"
applicable: true
---

Swift is strongly and statically typed with type inference. Value types (`struct`, `enum`, tuples, primitive types) are copied on assignment; reference types (`class`) are shared. Built-in types include `Int`, `Double`, `Float`, `Bool`, `String`, `Character`, and `Optional<T>` (written `T?`). All types are first-class — even `Int` and `Bool` have methods.

## Example

```swift
let integer: Int = 42
let float: Double = 3.14
let flag: Bool = true
let text: String = "Hello"

// Optional — may or may not hold a value
var maybeInt: Int? = nil
maybeInt = 42
if let value = maybeInt {
    print("Got \(value)")
}

// Type conversion (explicit — no implicit coercion)
let d = Double(integer) + float
print(d)

// Type aliases
typealias Coordinate = (Double, Double)
let origin: Coordinate = (0.0, 0.0)
```

## Gotchas

- Swift has no implicit numeric conversions; adding an `Int` and a `Double` requires an explicit cast: `Double(myInt) + myDouble`.
- `Optional<T>` is a real enum (`some(T)` / `none`), not a nullable pointer; force-unwrapping with `!` on a `nil` optional crashes at runtime.
- `Int` is platform-sized (64-bit on 64-bit platforms); use `Int32` or `Int64` for fixed-width requirements.
