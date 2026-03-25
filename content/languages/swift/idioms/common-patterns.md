---
title: "Common Patterns"
language: "swift"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Key Swift idioms include: protocol-oriented programming (POPs) over inheritance, value types for data models, `guard` for early return, `Codable` for JSON serialization, `@propertyWrapper` for reusable property behaviors, and result builders for DSL construction (used in SwiftUI).

## Example

```swift
import Foundation

// Codable — automatic JSON serialization
struct User: Codable {
    let id: Int
    let name: String
    let email: String
}

let json = """
{"id": 1, "name": "Alice", "email": "alice@example.com"}
""".data(using: .utf8)!

let user = try! JSONDecoder().decode(User.self, from: json)
print(user.name)

// Property wrapper
@propertyWrapper
struct Clamped<T: Comparable> {
    private var value: T
    let range: ClosedRange<T>
    var wrappedValue: T {
        get { value }
        set { value = min(max(newValue, range.lowerBound), range.upperBound) }
    }
    init(wrappedValue: T, _ range: ClosedRange<T>) {
        self.range = range
        self.value = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }
}

struct Settings {
    @Clamped(0...100) var volume: Int = 50
}

var s = Settings()
s.volume = 150
print(s.volume)  // 100
```

## Gotchas

- `Codable` uses property names as JSON keys by default; use `CodingKeys` enum to customize key names or use `JSONDecoder().keyDecodingStrategy = .convertFromSnakeCase`.
- Property wrappers add a `$` prefix projection value that can be accessed from outside the struct (e.g., `$volume` for the `Clamped` wrapper itself).
- Result builders (used in SwiftUI's `@ViewBuilder`) are powerful but can produce confusing compile errors when the DSL constraints are violated.
