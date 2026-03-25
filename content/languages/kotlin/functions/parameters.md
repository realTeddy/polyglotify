---
title: "Parameters & Arguments"
language: "kotlin"
feature: "parameters"
category: "functions"
applicable: true
---

Kotlin function parameters are always `val` inside the function — they cannot be reassigned. Variadic parameters use the `vararg` keyword. Named arguments can be used in any order at the call site. The spread operator `*` expands an array into a vararg call. Higher-order functions take function type parameters.

## Example

```kotlin
fun sum(vararg numbers: Int): Int = numbers.sum()

fun log(message: String, level: String = "INFO", tag: String = "App") {
    println("[$level/$tag] $message")
}

fun <T> List<T>.forEachIndexed2(action: (index: Int, T) -> Unit) {
    for ((i, v) in this.withIndex()) action(i, v)
}

fun main() {
    println(sum(1, 2, 3, 4, 5))

    val nums = intArrayOf(10, 20, 30)
    println(sum(*nums))  // spread operator

    log("Started")
    log("Error occurred", level = "ERROR", tag = "Network")

    listOf("a", "b", "c").forEachIndexed2 { i, v ->
        println("$i: $v")
    }
}
```

## Gotchas

- Only one `vararg` parameter is allowed per function, and it should typically be the last parameter (trailing lambda placement rules still apply).
- Kotlin passes objects by reference (JVM semantics); reassigning a parameter inside a function does not affect the caller, but mutating a mutable object does.
- When a function has a single lambda as the last parameter, the lambda can be moved outside the parentheses (trailing lambda syntax).
