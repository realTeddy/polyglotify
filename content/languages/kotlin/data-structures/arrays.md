---
title: "Arrays & Lists"
language: "kotlin"
feature: "arrays"
category: "data-structures"
applicable: true
---

Kotlin distinguishes between `Array<T>` (mutable, fixed-size), `List<T>` (immutable interface), and `MutableList<T>` (mutable interface). `listOf()` creates an immutable list; `mutableListOf()` creates a mutable one. The standard library has rich functional operations. Specialized primitive arrays (`IntArray`, `LongArray`, etc.) avoid boxing.

## Example

```kotlin
fun main() {
    // Immutable list
    val fruits = listOf("apple", "banana", "cherry")
    println(fruits[1])       // banana
    println(fruits.size)

    // Mutable list
    val nums = mutableListOf(1, 2, 3)
    nums.add(4)
    nums.removeAt(0)
    println(nums)  // [2, 3, 4]

    // Functional operations
    val doubled = nums.map { it * 2 }
    val evens = nums.filter { it % 2 == 0 }
    val sum = nums.sum()
    println("$doubled $evens sum=$sum")

    // Primitive array (no boxing)
    val ints = IntArray(5) { it * it }
    println(ints.toList())  // [0, 1, 4, 9, 16]
}
```

## Gotchas

- `listOf()` returns a read-only *view*, not a truly immutable list; if the underlying list changes (e.g., you passed a `MutableList` and cast it), the view reflects the change.
- `Array<Int>` boxes each integer to `Integer`; use `IntArray` for performance-sensitive code.
- Kotlin's `List` and `MutableList` are interfaces; `ArrayList` is the standard implementation (`mutableListOf()` returns an `ArrayList` by default).
