---
title: "Inheritance"
language: "kotlin"
feature: "inheritance"
category: "oop"
applicable: true
---

Kotlin supports single-class inheritance. Base classes and methods must be explicitly marked `open` to allow overriding. The `override` keyword is mandatory. `super` accesses the parent class. `abstract` classes cannot be instantiated. Sealed classes restrict the class hierarchy to a fixed set of subclasses within the same package, enabling exhaustive `when` expressions.

## Example

```kotlin
open class Shape(val color: String) {
    open fun area(): Double = 0.0
    override fun toString() = "${javaClass.simpleName}($color, area=${area()})"
}

class Circle(color: String, val radius: Double) : Shape(color) {
    override fun area() = Math.PI * radius * radius
}

sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
}

fun <T> handle(r: Result<T>) = when (r) {
    is Result.Success -> println("Got: ${r.data}")
    is Result.Error   -> println("Error: ${r.message}")
    // No else needed — sealed class is exhaustive
}

fun main() {
    val c = Circle("red", 5.0)
    println(c)
    handle(Result.Success(42))
    handle(Result.Error("not found"))
}
```

## Gotchas

- Kotlin uses `sealed class` instead of abstract factories for restricted hierarchies; `when` over a sealed type does not require an `else` if all subclasses are covered.
- Calling an `open` method in a constructor is dangerous because the subclass override may run before the subclass's own initialization.
- `abstract` implies `open`; marking an abstract function `open` is redundant but not an error.
