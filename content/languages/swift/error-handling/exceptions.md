---
title: "Exceptions & Try/Catch"
language: "swift"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Swift uses a typed error system built around the `Error` protocol and `throw`/`try`/`catch`. Functions that can fail are marked `throws`; callers must prefix calls with `try`. `try?` converts a thrown error to `nil`; `try!` asserts success and crashes on failure. Swift 6 introduces typed throws (`throws(MyError)`) for exhaustive catch blocks.

## Example

```swift
enum NetworkError: Error {
    case notFound
    case unauthorized
    case serverError(code: Int)
}

func fetchUser(id: Int) throws -> String {
    switch id {
    case 0:      throw NetworkError.notFound
    case 1:      throw NetworkError.unauthorized
    case 500...: throw NetworkError.serverError(code: id)
    default:     return "User \(id)"
    }
}

do {
    let user = try fetchUser(id: 1)
    print(user)
} catch NetworkError.notFound {
    print("User not found")
} catch NetworkError.unauthorized {
    print("Access denied")
} catch NetworkError.serverError(let code) {
    print("Server error: \(code)")
} catch {
    print("Unknown error: \(error)")
}

// try? — converts to Optional
let user = try? fetchUser(id: 42)
print(user ?? "nil")
```

## Gotchas

- Swift's error handling is not exception-based at the implementation level; `throw` does not unwind the stack through non-`throws` functions and has very low overhead.
- `try!` is equivalent to `try` + `!` on an optional — it crashes with a descriptive message; reserve it for cases that are logically impossible to fail.
- `catch` blocks without a pattern catch all errors of any type; always have a catch-all `catch { }` block or the compiler will complain about non-exhaustive handling.
