---
title: "Threads"
language: "groovy"
feature: "threads"
category: "concurrency"
applicable: true
---

Groovy runs on the JVM and has full access to Java's threading model via `Thread`, `ExecutorService`, and `java.util.concurrent`. Groovy simplifies thread creation with the `Thread.start` closure shorthand and makes synchronisation blocks accessible through the standard `synchronized` keyword. For higher-level concurrency, GPars provides actors, dataflow variables, and parallel collections.

## Example

```groovy
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit

// Simple thread with closure
def t = Thread.start {
    println "Background thread: ${Thread.currentThread().name}"
    Thread.sleep(100)
    println "Background done"
}
t.join()

// ExecutorService with fixed thread pool
def pool = Executors.newFixedThreadPool(4)
def futures = (1..8).collect { i ->
    pool.submit {
        Thread.sleep(50)
        i * i
    }
}
pool.shutdown()
pool.awaitTermination(5, TimeUnit.SECONDS)
println futures.collect { it.get() }   // [1, 4, 9, 16, 25, 36, 49, 64]

// Synchronised counter
def counter = 0
def lock = new Object()
def threads = (1..10).collect {
    Thread.start {
        synchronized(lock) { counter++ }
    }
}
threads*.join()
println "Counter: $counter"   // Counter: 10
```

## Gotchas

- `Thread.start { }` is a Groovy extension that creates and starts a daemon thread; prefer `ExecutorService` for production code where lifecycle management matters.
- Groovy's `synchronized` works on any object reference; using a primitive type as a lock monitor is impossible and will cause a compile error.
- Shared mutable state in closures passed to threads must be explicitly synchronised; Groovy provides no memory-model guarantees beyond what Java's JMM specifies.
