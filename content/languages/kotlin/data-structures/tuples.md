---
title: "Tuples"
language: "kotlin"
feature: "tuples"
category: "data-structures"
applicable: true
---

Kotlin does not have a general-purpose tuple type. The standard library provides `Pair<A, B>` and `Triple<A, B, C>` for two- and three-element groupings. For more elements or when names matter, data classes are the idiomatic choice. Both `Pair` and `Triple` support destructuring.

## Example

```kotlin
fun minMax(list: List<Int>): Pair<Int, Int>? {
    if (list.isEmpty()) return null
    return list.min() to list.max()  // "to" creates a Pair
}

fun main() {
    val pair = "key" to 42
    println(pair.first)   // key
    println(pair.second)  // 42

    // Destructuring
    val (key, value) = pair
    println("$key=$value")

    minMax(listOf(5, 2, 8, 1))?.let { (min, max) ->
        println("min=$min max=$max")
    }

    // Triple
    val triple = Triple("a", 1, true)
    val (a, b, c) = triple
    println("$a $b $c")
}
```

## Gotchas

- For anything beyond two or three values, use a data class — it provides named fields, `copy()`, and useful `toString()` for free.
- Destructuring a `Pair` uses `component1()`/`component2()` under the hood; data classes generate these automatically for all properties.
- `"key" to value` is simply an infix call to `Pair.to()`; it is syntactic sugar, not special language syntax.
