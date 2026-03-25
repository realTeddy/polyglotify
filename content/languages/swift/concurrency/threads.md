---
title: "Threads"
language: "swift"
feature: "threads"
category: "concurrency"
applicable: true
---

Swift's modern concurrency model (structured concurrency) abstracts over threads using the cooperative thread pool. Lower-level APIs include `Thread`, `DispatchQueue` (GCD), and `OperationQueue`. For new code, `Task` and `async`/`await` are preferred. The Swift concurrency runtime manages thread utilization to prevent thread explosion.

## Example

```swift
import Foundation

// Modern: Task (runs on cooperative thread pool)
Task {
    await withTaskGroup(of: Int.self) { group in
        for i in 1...5 {
            group.addTask {
                // Concurrent work
                return i * i
            }
        }
        var results: [Int] = []
        for await result in group {
            results.append(result)
        }
        print(results.sorted())
    }
}

// Legacy: DispatchQueue (still common in existing codebases)
let queue = DispatchQueue.global(qos: .userInitiated)
queue.async {
    let result = (1...1000).reduce(0, +)
    DispatchQueue.main.async {
        print("Sum: \(result)")
    }
}
```

## Gotchas

- `Thread` and `DispatchQueue.async` do not participate in Swift's structured concurrency; errors and cancellation do not propagate through them.
- Creating many threads or dispatch queues can cause thread explosion; the cooperative thread pool used by `Task` avoids this by limiting the number of running threads to the number of CPU cores.
- Accessing `@MainActor`-isolated state from a background `DispatchQueue` is a data race; migrate to `async`/`await` to get compile-time data race safety (Swift 6).
