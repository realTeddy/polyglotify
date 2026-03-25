---
title: "Return Values"
language: "kotlin"
feature: "return-values"
category: "functions"
applicable: true
---

Kotlin functions return a single value. Use `Pair`, `Triple`, or data classes for multiple return values. The return type `Unit` is Kotlin's equivalent of `void`. `Nothing` is the return type of functions that never return (throw or loop forever). Kotlin encourages returning `null` (via nullable types) or sealed class hierarchies over checked exceptions.

## Example

```kotlin
data class MinMax(val min: Int, val max: Int)

fun minMax(list: List<Int>): MinMax? {
    if (list.isEmpty()) return null
    return MinMax(list.min(), list.max())
}

// Pair for quick two-value returns
fun divide(a: Double, b: Double): Pair<Double, Boolean> =
    if (b == 0.0) Pair(0.0, false) else Pair(a / b, true)

fun main() {
    val (result, ok) = divide(10.0, 3.0)
    if (ok) println("%.4f".format(result))

    minMax(listOf(3, 1, 4, 1, 5, 9))?.let { (min, max) ->
        println("min=$min, max=$max")
    }
}
```

## Gotchas

- Destructuring declarations (`val (a, b) = pair`) work for `Pair`, `Triple`, data classes, and any type that defines `component1()`, `component2()` functions.
- A `return` inside a lambda returns from the *enclosing* function, not just the lambda — use `return@label` to return from the lambda only.
- `Nothing` as a return type is useful for extension functions like `error(message: String): Nothing` that unconditionally throw.
