---
title: "Structs & Classes"
language: "kotlin"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Kotlin's `data class` is the closest equivalent to a struct: it auto-generates `equals`, `hashCode`, `toString`, `copy`, and `componentN` functions based on primary constructor properties. Regular classes serve as reference types. Value classes (`@JvmInline value class`) wrap a single value with zero runtime overhead, similar to Rust's newtype pattern.

## Example

```kotlin
data class Point(val x: Double, val y: Double) {
    fun distanceTo(other: Point): Double {
        val dx = x - other.x
        val dy = y - other.y
        return Math.sqrt(dx * dx + dy * dy)
    }
}

@JvmInline
value class UserId(val id: Long)

fun main() {
    val p1 = Point(0.0, 0.0)
    val p2 = Point(3.0, 4.0)
    println(p1.distanceTo(p2))  // 5.0

    // copy with changes
    val p3 = p2.copy(x = 6.0)
    println(p3)  // Point(x=6.0, y=4.0)

    // Structural equality
    println(p1 == Point(0.0, 0.0))  // true

    val uid = UserId(12345L)
    println(uid.id)
}
```

## Gotchas

- `data class` properties in the primary constructor participate in `equals`/`hashCode`; properties defined in the body do not.
- `copy()` performs a shallow copy; nested mutable objects are shared between the original and the copy.
- `value class` (formerly `inline class`) cannot have a backing field other than the single wrapped property and cannot implement interfaces that add state.
