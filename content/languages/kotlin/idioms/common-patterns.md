---
title: "Common Patterns"
language: "kotlin"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Key Kotlin idioms include: scope functions (`let`, `run`, `apply`, `also`, `with`) for fluent transformations, `data class` + `copy()` for immutable updates, extension functions for adding behavior without subclassing, the `lazy` delegate for deferred initialization, and sealed class hierarchies for exhaustive state modeling.

## Example

```kotlin
data class Config(
    val host: String = "localhost",
    val port: Int = 8080,
    val debug: Boolean = false
)

class Connection(private val config: Config) {
    fun connect() = println("Connecting to ${config.host}:${config.port}")
}

fun main() {
    // apply — configure an object, return it
    val config = Config().copy(port = 9090, debug = true)

    // let — transform a nullable value
    val host: String? = "example.com"
    val upper = host?.let { it.uppercase() } ?: "UNKNOWN"
    println(upper)

    // also — side-effect without breaking the chain
    val conn = Connection(config).also { println("Created connection") }
    conn.connect()

    // with — operate on a receiver without repeating the variable
    with(config) {
        println("Host: $host, Port: $port, Debug: $debug")
    }

    // Lazy initialization
    val expensive: List<Int> by lazy { (1..1_000_000).toList() }
    println(expensive.first())  // computed on first access
}
```

## Gotchas

- Scope functions are easily confused: `apply` returns the receiver and uses `this`; `let` returns the lambda result and uses `it`; `run` returns the lambda result and uses `this`; `also` returns the receiver and uses `it`.
- `by lazy` is thread-safe by default (synchronized); use `LazyThreadSafetyMode.NONE` for single-threaded use to avoid the synchronization overhead.
