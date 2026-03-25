---
title: "Result Types"
language: "kotlin"
feature: "result-types"
category: "error-handling"
applicable: true
---

Kotlin's standard `Result<T>` class (available since Kotlin 1.3) wraps either a success value or a `Throwable`. It is created via `runCatching` or directly with `Result.success()`/`Result.failure()`. The `fold`, `map`, `mapCatching`, `getOrElse`, and `onFailure` methods make functional chaining ergonomic. Sealed classes are preferred for domain-specific error types.

## Example

```kotlin
sealed class NetworkResult<out T> {
    data class Success<T>(val data: T) : NetworkResult<T>()
    data class Error(val code: Int, val message: String) : NetworkResult<Nothing>()
}

fun fetchUser(id: Int): NetworkResult<String> = when (id) {
    0    -> NetworkResult.Error(404, "Not found")
    else -> NetworkResult.Success("User #$id")
}

fun main() {
    // Sealed class result
    when (val r = fetchUser(0)) {
        is NetworkResult.Success -> println(r.data)
        is NetworkResult.Error   -> println("${r.code}: ${r.message}")
    }

    // stdlib Result with runCatching
    val result = runCatching { "42".toInt() }
        .map { it * 2 }
        .getOrElse { 0 }
    println(result)  // 84

    // Chaining
    runCatching { "oops".toInt() }
        .onSuccess { println("Got $it") }
        .onFailure { println("Error: ${it.message}") }
}
```

## Gotchas

- Kotlin's stdlib `Result<T>` can only wrap `Throwable` as the failure type, not arbitrary domain errors; use a custom sealed class when you need typed error variants.
- `Result<T>` cannot be used as a return type in suspension functions (coroutines) in some older versions; this restriction was lifted in Kotlin 1.5.
- `getOrThrow()` re-throws the wrapped exception; `getOrNull()` returns `null`; `getOrDefault(v)` returns the default value on failure.
