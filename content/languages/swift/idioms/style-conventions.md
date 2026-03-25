---
title: "Style Conventions"
language: "swift"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Swift style is guided by the Swift API Design Guidelines (official) and enforced by SwiftLint. Naming uses `camelCase` for variables, functions, and properties; `PascalCase` for types and protocols. Names should read as English phrases at the call site. Acronyms follow the same casing rule as the surrounding word (`urlString`, not `URLString`, unless the acronym is the whole identifier: `URL`).

## Example

```swift
// Idiomatic Swift naming and style
protocol DataSource {
    associatedtype Element
    func element(at index: Int) -> Element
    var count: Int { get }
}

struct ArrayDataSource<T>: DataSource {
    private let items: [T]

    init(_ items: [T]) { self.items = items }

    func element(at index: Int) -> T { items[index] }
    var count: Int { items.count }
}

// Functions read as sentences at the call site
extension Array {
    func inserting(_ element: Element, at index: Int) -> [Element] {
        var copy = self
        copy.insert(element, at: index)
        return copy
    }
}

let updated = [1, 2, 4].inserting(3, at: 2)
print(updated)  // [1, 2, 3, 4]
```

## Gotchas

- The Swift API Design Guidelines distinguish between mutating and non-mutating pairs: `sort()` / `sorted()`, `append()` / `appending()` — follow this pattern in your own APIs.
- SwiftLint rules can be configured per-project with `.swiftlint.yml`; the `--strict` flag treats warnings as errors in CI.
- Avoid abbreviations in public APIs (`numberOfItems` not `numItems`); clarity at the use site is valued over brevity at the definition site.
