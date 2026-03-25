---
title: "Control Flow"
language: "swift"
feature: "control-flow"
category: "basics"
applicable: true
---

Swift provides `if`, `guard`, `switch`, `for-in`, `while`, and `repeat-while`. `switch` is exhaustive, supports pattern matching on complex types, and does not fall through by default. `guard` is used for early exits when a condition is not met — it requires an `else` branch that must exit the current scope.

## Example

```swift
func describe(_ n: Int) -> String {
    switch n {
    case ..<0:        return "negative"
    case 0:           return "zero"
    case 1...9:       return "small positive"
    default:          return "large positive"
    }
}

func processUser(name: String?) {
    guard let name = name else {
        print("No name provided")
        return
    }
    print("Hello, \(name)!")
}

for i in 0..<5 {
    if i % 2 == 0 { continue }
    print(describe(i))
}

processUser(name: nil)
processUser(name: "Alice")
```

## Gotchas

- `switch` cases do not fall through automatically; use `fallthrough` explicitly, though it is rarely needed and transfers control unconditionally.
- `guard` bindings (e.g., `guard let x = optX`) are available in the scope *after* the `guard` statement, unlike `if let` which scopes the binding inside the block.
- `for-in` iterates over any `Sequence`; there is no C-style `for(;;)` loop in Swift.
