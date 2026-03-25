---
title: "Async/Await"
language: "groovy"
feature: "async-await"
category: "concurrency"
applicable: false
---

Groovy does not have native `async`/`await` syntax. Asynchronous programming in Groovy is achieved through Java's `CompletableFuture`, GPars (Groovy Parallel Systems), or reactive libraries like RxJava and Project Reactor. Groovy's closure syntax makes working with `CompletableFuture` chains more readable than plain Java.

## Example

```groovy
import java.util.concurrent.CompletableFuture

// CompletableFuture with Groovy closures
CompletableFuture<String> fetchData(String url) {
    CompletableFuture.supplyAsync { "data from $url" }
}

def result = fetchData("https://api.example.com")
    .thenApply { data -> data.toUpperCase() }
    .thenApply { data -> "Processed: $data" }
    .get()   // blocks — use join() or chain further in production

println result   // Processed: DATA FROM HTTPS://API.EXAMPLE.COM

// GPars-style (if gpars on classpath)
// import groovyx.gpars.GParsPool
// GParsPool.withPool {
//     def results = [1, 2, 3, 4].collectParallel { it * it }
//     println results
// }

// Parallel execution with CompletableFuture.allOf
def futures = (1..4).collect { i ->
    CompletableFuture.supplyAsync { i * i }
}
def all = CompletableFuture.allOf(*futures)
all.join()
def squares = futures*.get()
println squares   // [1, 4, 9, 16]
```

## Gotchas

- `CompletableFuture.get()` blocks the calling thread; prefer `thenApply`/`thenCompose` chains or `join()` at a top-level boundary to avoid deadlocks.
- GPars is a separate library and is not maintained as actively as it once was; for new projects, Java's `CompletableFuture` or Project Reactor is preferred.
- Groovy closures passed to `supplyAsync` capture the enclosing scope; mutable shared state captured in those closures must be explicitly synchronised.
