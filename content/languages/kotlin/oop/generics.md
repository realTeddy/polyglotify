---
title: "Generics"
language: "kotlin"
feature: "generics"
category: "oop"
applicable: true
---

Kotlin generics use declaration-site variance (`out` for covariant, `in` for contravariant) which is safer and more expressive than Java's use-site wildcards. `reified` type parameters in `inline` functions allow accessing the type at runtime, eliminating many `Class<T>` parameters. Upper bounds constrain type parameters.

## Example

```kotlin
// Declaration-site variance
class Box<out T>(val value: T)           // covariant — can only produce T
class Sink<in T>(private val items: MutableList<T>) {  // contravariant — can only consume T
    fun put(item: T) { items.add(item) }
}

// Reified generic — access type at runtime
inline fun <reified T> List<*>.filterIsType(): List<T> =
    filterIsInstance<T>()

fun main() {
    val intBox: Box<Int> = Box(42)
    val anyBox: Box<Any> = intBox  // works because Box is covariant (out T)

    val mixed: List<Any> = listOf(1, "two", 3.0, "four", 5)
    val strings: List<String> = mixed.filterIsType()
    println(strings)  // [two, four]

    // Generic function with bound
    fun <T : Comparable<T>> clamp(value: T, min: T, max: T): T =
        when {
            value < min -> min
            value > max -> max
            else        -> value
        }
    println(clamp(15, 0, 10))  // 10
}
```

## Gotchas

- Kotlin generics are erased at runtime (JVM limitation); `reified` + `inline` is the workaround for cases where you need the actual type at runtime.
- `out T` (covariant) means you can only *read* `T` from the container; `in T` (contravariant) means you can only *write* `T` into it.
- Star projection (`Box<*>`) is Kotlin's equivalent of Java's `Box<?>` — use it when you don't care about the specific type argument.
