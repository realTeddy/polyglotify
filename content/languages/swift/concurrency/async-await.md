---
title: "Async/Await"
language: "swift"
feature: "async-await"
category: "concurrency"
applicable: true
---

Swift introduced native `async`/`await` in Swift 5.5 (Xcode 13). Async functions are marked `async` and called with `await`. The Swift concurrency model uses structured concurrency via `async let` for parallel work and `TaskGroup` for dynamic concurrency. Actors protect mutable state from data races.

## Example

```swift
import Foundation

func fetchData(from url: String) async throws -> String {
    // Simulate async network call
    try await Task.sleep(for: .milliseconds(100))
    return "Data from \(url)"
}

func loadAll() async throws {
    // Concurrent fetches with async let
    async let result1 = fetchData(from: "api/users")
    async let result2 = fetchData(from: "api/posts")

    let (users, posts) = try await (result1, result2)
    print(users)
    print(posts)
}

// Actor — protects mutable state
actor Counter {
    private var value = 0
    func increment() { value += 1 }
    func current() -> Int { value }
}

Task {
    try await loadAll()
    let counter = Counter()
    await counter.increment()
    print(await counter.current())
}
```

## Gotchas

- `await` is a suspension point, not a blocking call; the thread is free to do other work while waiting.
- `@MainActor` ensures code runs on the main thread — annotate UI-updating methods or entire view models with `@MainActor`.
- Calling an actor method from outside the actor requires `await`; calling it from within the actor body does not.
