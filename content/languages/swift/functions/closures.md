---
title: "Closures & Lambdas"
language: "swift"
feature: "closures"
category: "functions"
applicable: true
---

Closures in Swift are self-contained blocks of functionality written with `{ parameters -> ReturnType in body }`. Swift has progressive closure shorthand: type inference, `$0`/`$1` shorthand argument names, implicit returns for single expressions, and trailing closure syntax. Closures capture variables from their surrounding scope by reference by default; use a capture list `[weak self]` or `[unowned self]` to break retain cycles.

## Example

```swift
let numbers = [5, 2, 8, 1, 9, 3]

// Full closure syntax
let sorted1 = numbers.sorted(by: { (a: Int, b: Int) -> Bool in a < b })

// Shorthand: inferred types, implicit return
let sorted2 = numbers.sorted { $0 < $1 }

// Trailing closure + operator function shorthand
let sorted3 = numbers.sorted(by: <)

print(sorted3)  // [1, 2, 3, 5, 8, 9]

// Capturing with capture list to avoid retain cycles
class ViewModel {
    var value = 0
    func doWork(completion: @escaping () -> Void) {
        DispatchQueue.global().async { [weak self] in
            self?.value += 1
            completion()
        }
    }
}
```

## Gotchas

- `@escaping` is required for closures that outlive the function call (e.g., stored for later use or passed to async APIs); without it, the closure is non-escaping and the compiler prevents it from escaping.
- Capturing `self` strongly in an escaping closure creates a retain cycle if `self` also holds a reference to the closure; always use `[weak self]` in that case.
- Shorthand argument names (`$0`, `$1`) make very short closures concise but can make longer closures unreadable — use named parameters when the closure is more than one line.
