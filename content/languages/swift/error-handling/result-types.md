---
title: "Result Types"
language: "swift"
feature: "result-types"
category: "error-handling"
applicable: true
---

Swift's `Result<Success, Failure: Error>` enum provides an explicit value-based alternative to `throws` for deferred or asynchronous error handling. It has `.success(Value)` and `.failure(Error)` cases and can be `map`ped and `flatMap`ped. It is commonly used in completion handler APIs.

## Example

```swift
import Foundation

enum ParseError: Error {
    case invalidFormat
    case outOfRange(value: Int)
}

func parseAge(_ input: String) -> Result<Int, ParseError> {
    guard let age = Int(input) else {
        return .failure(.invalidFormat)
    }
    guard (0...150).contains(age) else {
        return .failure(.outOfRange(value: age))
    }
    return .success(age)
}

let result = parseAge("25")
    .map { $0 * 2 }  // transform success value

switch result {
case .success(let doubled):
    print("Doubled age: \(doubled)")
case .failure(let error):
    print("Error: \(error)")
}

// get() converts Result back to throws
let age = try? parseAge("42").get()
print(age ?? -1)
```

## Gotchas

- `Result` and `throws` serve the same purpose; `Result` is preferable when you need to store or pass an error value rather than propagate it immediately.
- `.get()` on a `Result` throws the failure, making it easy to bridge between `Result`-based and `throws`-based code.
- `Result` requires the `Failure` type to conform to `Error`; use `Never` as the failure type for infallible results (`Result<T, Never>`).
