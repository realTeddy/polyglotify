---
title: "Channels & Message Passing"
language: "swift"
feature: "channels"
category: "concurrency"
applicable: false
---

Swift does not have built-in channels. The closest equivalent in Swift's structured concurrency model is `AsyncStream` (one producer, multiple consumers via iteration) and actors (for encapsulated mutable state with message-passing semantics). `AsyncChannel` from the Swift Async Algorithms package provides an explicit channel primitive.

## Example

```swift
import Foundation

// AsyncStream — producer/consumer with async for-await
func numberStream() -> AsyncStream<Int> {
    AsyncStream { continuation in
        Task {
            for i in 1...5 {
                try? await Task.sleep(for: .milliseconds(10))
                continuation.yield(i)
            }
            continuation.finish()
        }
    }
}

Task {
    for await number in numberStream() {
        print("Received: \(number)")
    }
    print("Stream finished")
}

// Actor as a message-passing mailbox
actor Accumulator {
    private var total = 0
    func add(_ n: Int) { total += n }
    func value() -> Int { total }
}
```

## Gotchas

- `AsyncStream` is single-producer only; for multi-producer scenarios the `AsyncChannel` from `swift-async-algorithms` is a better fit.
- Unlike Go channels, `AsyncStream` does not block the producer — yielded values are buffered; use the `bufferingPolicy` to control buffer size and back-pressure behavior.
- Actor method calls are the idiomatic "send a message" mechanism in Swift; they serialize access automatically without explicit locks.
