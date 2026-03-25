---
title: "Parameters & Arguments"
language: "swift"
feature: "parameters"
category: "functions"
applicable: true
---

Swift function parameters are constants by default. To pass by reference, use `inout` parameters, which require the caller to prefix the argument with `&`. Variadic parameters use `...` after the type. Default values reduce boilerplate for common cases. Swift's named parameters make call sites self-documenting.

## Example

```swift
// inout — mutates the caller's variable
func doubleInPlace(_ value: inout Int) {
    value *= 2
}

var x = 5
doubleInPlace(&x)
print(x)  // 10

// Variadic parameter
func sum(_ numbers: Double...) -> Double {
    numbers.reduce(0, +)
}
print(sum(1, 2, 3, 4, 5))  // 15.0

// Default values
func connect(host: String, port: Int = 443, useTLS: Bool = true) {
    print("Connecting to \(host):\(port), TLS=\(useTLS)")
}
connect(host: "example.com")
connect(host: "example.com", port: 80, useTLS: false)
```

## Gotchas

- `inout` parameters cannot have default values, and you cannot pass a constant (`let`) or a literal as an `inout` argument.
- Variadic parameters receive the arguments as an array inside the function; only one variadic parameter is allowed per function.
- Default parameter values are evaluated once at the call site, not at function definition — unlike Python's mutable default argument trap.
