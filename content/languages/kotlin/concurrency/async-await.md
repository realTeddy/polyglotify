---
title: "Async/Await"
language: "kotlin"
feature: "async-await"
category: "concurrency"
applicable: true
---

Kotlin coroutines (from the `kotlinx.coroutines` library) provide `async`/`await` via `async { }` builders that return `Deferred<T>` and `.await()` to get the result. `launch` starts a fire-and-forget coroutine. `suspend` functions can be paused and resumed. Structured concurrency means child coroutines are automatically cancelled if the parent scope is cancelled.

## Example

```kotlin
import kotlinx.coroutines.*

suspend fun fetchData(id: Int): String {
    delay(100)  // non-blocking sleep
    return "Data #$id"
}

fun main() = runBlocking {
    // Sequential
    val a = fetchData(1)
    val b = fetchData(2)
    println("$a, $b")

    // Concurrent with async/await
    val deferredA = async { fetchData(3) }
    val deferredB = async { fetchData(4) }
    println("${deferredA.await()}, ${deferredB.await()}")

    // awaitAll for multiple
    val results = awaitAll(async { fetchData(5) }, async { fetchData(6) })
    println(results)
}
```

## Gotchas

- `runBlocking` blocks the calling thread and is only appropriate in `main` functions or tests; never use it inside another coroutine.
- `async` starts the coroutine immediately (eager by default); use `async(start = CoroutineStart.LAZY)` to defer until `.await()` is called.
- If the coroutine in `async` throws and you never call `.await()`, the exception is silently swallowed — always call `.await()` or use a supervisor scope.
