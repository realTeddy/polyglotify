---
title: "Types & Type Systems"
language: "kotlin"
feature: "types"
category: "basics"
applicable: true
---

Kotlin has a type system that distinguishes nullable (`T?`) from non-null types (`T`), eliminating most NullPointerExceptions at compile time. Built-in types include `Int`, `Long`, `Double`, `Float`, `Boolean`, `Char`, `String`, and `Any` (the root of the hierarchy). Smart casts automatically narrow types after type checks.

## Example

```kotlin
fun describe(x: Any): String = when (x) {
    is Int    -> "Int: $x"
    is String -> "String of length ${x.length}"  // smart cast: x is String here
    is Boolean -> "Boolean: $x"
    else      -> "Unknown"
}

fun main() {
    println(describe(42))
    println(describe("hello"))
    println(describe(true))

    // Nullable type
    val s: String? = null
    val len: Int = s?.length ?: 0   // safe call + Elvis operator
    println(len)

    // Explicit cast
    val n: Any = 42
    val i: Int = n as Int
    val safe: Int? = n as? Int      // returns null if cast fails
}
```

## Gotchas

- Calling `.length` on a `String?` without a null-safe call (`?.`) is a compile error, not a runtime NPE.
- Smart casts do not work on `var` properties because the compiler cannot guarantee the value hasn't changed; use a `val` local copy.
- `Any` is the root type (like Java's `Object`); `Any?` includes `null` and is the true root of the nullable type hierarchy.
