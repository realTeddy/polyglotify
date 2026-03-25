---
title: "Exceptions & Try/Catch"
language: "kotlin"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Kotlin has unchecked exceptions — there are no checked exceptions and no `throws` declarations. All exceptions inherit from `Throwable`. `try`/`catch`/`finally` is an expression that can return a value. The `runCatching` stdlib function provides a functional approach to exception handling, returning a `Result`.

## Example

```kotlin
fun parseInt(s: String): Int {
    return s.trim().toInt()  // throws NumberFormatException if invalid
}

fun safeParseInt(s: String): Int? = try {
    parseInt(s)
} catch (e: NumberFormatException) {
    null
}

fun main() {
    // try as expression
    val value = try {
        parseInt("42")
    } catch (e: NumberFormatException) {
        -1
    } finally {
        println("Attempted parse")
    }
    println(value)

    // runCatching — functional style
    val result = runCatching { parseInt("abc") }
        .onFailure { println("Failed: ${it.message}") }
        .getOrDefault(-1)
    println(result)

    println(safeParseInt("123"))   // 123
    println(safeParseInt("oops"))  // null
}
```

## Gotchas

- Kotlin does not have checked exceptions; callers are never forced to handle exceptions, which means important error paths are easy to miss.
- `finally` always runs but cannot return a value from the `try` expression; only `try` and `catch` blocks contribute a return value.
- `runCatching` catches *all* `Throwable`, including `OutOfMemoryError` — be cautious about catching errors you cannot meaningfully handle.
