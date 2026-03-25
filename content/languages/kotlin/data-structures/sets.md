---
title: "Sets"
language: "kotlin"
feature: "sets"
category: "data-structures"
applicable: true
---

Kotlin has `Set<T>` (read-only interface) and `MutableSet<T>`. `setOf()` returns a read-only set; `mutableSetOf()` returns a `LinkedHashSet` (preserves insertion order). `hashSetOf()` and `sortedSetOf()` are also available. Standard set operations (`union`, `intersect`, `subtract`) are available as extension functions.

## Example

```kotlin
fun main() {
    val a = setOf(1, 2, 3, 4, 5)
    val b = setOf(3, 4, 5, 6, 7)

    println(a union b)          // [1, 2, 3, 4, 5, 6, 7]
    println(a intersect b)      // [3, 4, 5]
    println(a subtract b)       // [1, 2]

    val mutable = mutableSetOf("apple", "banana")
    mutable.add("cherry")
    mutable.add("apple")       // no-op (already present)
    println(mutable.size)      // 3

    // Deduplicate a list
    val dupes = listOf(1, 2, 2, 3, 3, 3)
    println(dupes.toSet())     // [1, 2, 3]
}
```

## Gotchas

- `setOf()` preserves insertion order (uses `LinkedHashSet` internally); do not rely on this for security or correctness — use `sortedSetOf()` if order matters semantically.
- Set operations (`union`, `intersect`, `subtract`) return a new `Set`, not a mutable one; wrap with `toMutableSet()` if further mutation is needed.
- `contains` on a `Set` is O(1) for `HashSet`; on a `List` it is O(n) — always use a `Set` for membership checks on large collections.
