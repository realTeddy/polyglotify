---
title: "Function Declaration"
language: "kotlin"
feature: "declaration"
category: "functions"
applicable: true
---

Kotlin functions are declared with `fun`. Single-expression functions can use `=` body syntax without `return`. Functions support default parameter values, named arguments, extension functions, and infix notation. Top-level functions exist at the package level — there is no requirement to wrap everything in a class.

## Example

```kotlin
fun add(a: Int, b: Int): Int = a + b

fun greet(name: String, greeting: String = "Hello") =
    "$greeting, $name!"

// Extension function
fun String.isPalindrome(): Boolean = this == this.reversed()

// Infix function
infix fun Int.times(action: () -> Unit) {
    repeat(this) { action() }
}

fun main() {
    println(add(3, 4))
    println(greet("Kotlin"))
    println(greet(greeting = "Hi", name = "World"))
    println("racecar".isPalindrome())

    3 times { print("Hello ") }
    println()
}
```

## Gotchas

- Default parameter values eliminate much of the need for overloaded functions; use named arguments at the call site to skip parameters with defaults.
- Extension functions are resolved statically at compile time, not dynamically — they do not override member functions and are not virtual.
- `@JvmStatic` and `@JvmOverloads` annotations are needed when calling Kotlin functions with default parameters from Java code.
