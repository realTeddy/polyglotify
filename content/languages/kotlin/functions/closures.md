---
title: "Closures & Lambdas"
language: "kotlin"
feature: "closures"
category: "functions"
applicable: true
---

Kotlin lambdas are written as `{ params -> body }`. They capture variables from the surrounding scope, and unlike Java lambdas, they can capture and *modify* mutable variables (`var`). The standard library provides `let`, `run`, `apply`, `also`, and `with` as scope functions that accept lambdas for idiomatic transformations.

## Example

```kotlin
fun makeCounter(): () -> Int {
    var count = 0
    return { ++count }  // closes over mutable var
}

fun main() {
    val counter = makeCounter()
    println(counter())  // 1
    println(counter())  // 2
    println(counter())  // 3

    // Higher-order functions
    val numbers = listOf(1, 2, 3, 4, 5)
    val result = numbers
        .filter { it % 2 == 0 }
        .map { it * it }
    println(result)  // [4, 16]

    // Scope functions
    val person = Person("Alice", 30).also {
        println("Created: $it")
    }
}

data class Person(val name: String, val age: Int)
```

## Gotchas

- `it` is the implicit single parameter name in a lambda; when a lambda has multiple parameters or complex logic, use explicit named parameters for clarity.
- Lambdas in Kotlin are objects on the JVM; high-frequency code in hot paths should use `inline` functions to eliminate lambda object allocation.
- `return` inside a lambda with a non-inline function is not allowed (non-local return); only `inline` function lambdas allow unqualified `return` to exit the enclosing function.
