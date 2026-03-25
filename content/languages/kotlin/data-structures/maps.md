---
title: "Maps & Dictionaries"
language: "kotlin"
feature: "maps"
category: "data-structures"
applicable: true
---

Kotlin has `Map<K, V>` (read-only) and `MutableMap<K, V>`. `mapOf()` creates a read-only map; `mutableMapOf()` and `hashMapOf()` create mutable ones. The `to` infix function creates `Pair` instances for map literals. Kotlin maps support the full Java `Map` API plus Kotlin extension functions.

## Example

```kotlin
fun main() {
    val scores = mapOf("Alice" to 95, "Bob" to 87, "Carol" to 91)
    println(scores["Alice"])       // 95
    println(scores["Dave"])        // null (not an exception)
    println(scores.getOrDefault("Dave", 0))

    val mutable = mutableMapOf<String, Int>()
    mutable["Eve"] = 88
    mutable.getOrPut("Frank") { 75 }  // insert if absent

    // Iterate
    for ((name, score) in scores.entries.sortedBy { it.key }) {
        println("$name: $score")
    }

    // Transform
    val doubled = scores.mapValues { (_, v) -> v * 2 }
    println(doubled)
}
```

## Gotchas

- Map subscript (`map[key]`) returns `T?` (nullable); if the value type is already nullable, you cannot distinguish between a missing key and a stored `null` without `containsKey`.
- `mapOf()` preserves insertion order (backed by `LinkedHashMap`); `hashMapOf()` does not guarantee order.
- Destructuring in `for ((key, value) in map)` uses `component1()` and `component2()` from `Map.Entry`.
