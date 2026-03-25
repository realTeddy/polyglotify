---
title: "Operators"
language: "kotlin"
feature: "operators"
category: "basics"
applicable: true
---

Kotlin supports standard arithmetic, comparison, logical, and bitwise operators (`and`, `or`, `xor`, `shl`, `shr`, `ushr` — bitwise operators are named functions). Operator overloading is done by implementing specific functions (e.g., `operator fun plus`). The Elvis operator `?:` and safe-call `?.` are essential for null handling.

## Example

```kotlin
fun main() {
    val a = 10; val b = 3
    println("${a+b} ${a-b} ${a*b} ${a/b} ${a%b}")

    // Bitwise (named functions, not symbols)
    println(a and b)     // 2
    println(a or b)      // 11
    println(a xor b)     // 9
    println(a shl 1)     // 20

    // Elvis operator
    val name: String? = null
    println(name ?: "default")   // "default"

    // Range check
    println(5 in 1..10)   // true

    // Operator overloading
    data class Vec(val x: Int, val y: Int) {
        operator fun plus(other: Vec) = Vec(x + other.x, y + other.y)
    }
    println(Vec(1, 2) + Vec(3, 4))  // Vec(x=4, y=6)
}
```

## Gotchas

- Kotlin has no bitwise `&`, `|`, `^` symbols; they are named `and`, `or`, `xor` and are extension functions on integer types.
- `==` calls `equals()` (structural equality); `===` checks reference identity — unlike Java where `==` is always reference equality for objects.
- Integer division truncates toward zero; use `toDouble()` for true division.
