---
title: "Testing"
language: "swift"
feature: "testing"
category: "ecosystem"
applicable: true
---

Swift supports two testing frameworks: the older XCTest (available since day one) and the modern Swift Testing framework (introduced at WWDC 2024, built into Swift 6). Swift Testing uses `@Test` and `#expect` macros, supports parameterized tests natively, and provides structured test suites with `@Suite`. Both frameworks integrate with Xcode and `swift test`.

## Example

```swift
import Testing

struct MathTests {
    @Test("Addition works for positive numbers")
    func addPositive() {
        #expect(2 + 3 == 5)
    }

    @Test("Division", arguments: [
        (10.0, 2.0, 5.0),
        (9.0, 3.0, 3.0),
    ])
    func division(a: Double, b: Double, expected: Double) {
        #expect(a / b == expected)
    }

    @Test func throwingFunction() throws {
        let result = try parsePositive("42")
        #expect(result == 42)
    }
}

func parsePositive(_ s: String) throws -> Int {
    guard let n = Int(s), n > 0 else {
        throw ValidationError.invalid
    }
    return n
}

enum ValidationError: Error { case invalid }
```

## Gotchas

- Swift Testing's `#expect` macro reports the full expression tree on failure, providing much more context than `XCTAssertEqual`'s "expected X got Y" message.
- Tests run in parallel by default in Swift Testing; mark tests that share global state with `@Test(.serialized)`.
- XCTest and Swift Testing can coexist in the same test target, but mixing them in the same file is not recommended.
