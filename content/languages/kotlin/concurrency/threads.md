---
title: "Threads"
language: "kotlin"
feature: "threads"
category: "concurrency"
applicable: true
---

Kotlin runs on the JVM and can use Java threads directly. However, the idiomatic approach is coroutines — they are much lighter than threads and integrate with structured concurrency. When raw threads are needed, Kotlin provides `thread { }` as a convenient builder over `java.lang.Thread`. Dispatchers control which thread pool a coroutine runs on.

## Example

```kotlin
import kotlinx.coroutines.*
import kotlin.concurrent.thread

fun main() {
    // Raw thread (JVM)
    val t = thread(name = "worker") {
        println("Running on: ${Thread.currentThread().name}")
    }
    t.join()

    // Coroutines on different dispatchers
    runBlocking {
        launch(Dispatchers.Default) {
            // CPU-bound work
            println("Default: ${Thread.currentThread().name}")
        }
        launch(Dispatchers.IO) {
            // I/O-bound work
            println("IO: ${Thread.currentThread().name}")
        }
        launch(Dispatchers.Main) {
            // UI thread (Android) — requires Android runtime
        }
    }
}
```

## Gotchas

- `Dispatchers.IO` uses a large thread pool (up to 64 threads) for blocking I/O; `Dispatchers.Default` is limited to the number of CPU cores for CPU-intensive work.
- Mixing `Thread` and coroutines is possible but requires care — suspending inside a `thread {}` block is not allowed; use `withContext` to switch dispatchers inside a coroutine.
- Thread-local variables do not propagate to coroutines automatically; use `ThreadLocal.asContextElement()` when bridging thread-local state.
