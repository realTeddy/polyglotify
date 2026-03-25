---
title: "Variables & Declaration"
language: "kotlin"
feature: "variables"
category: "basics"
applicable: true
---

Kotlin uses `val` for immutable references and `var` for mutable ones. Both support type inference. `val` is analogous to Java's `final` — the reference cannot be reassigned, but a mutable object's contents can still change. Top-level properties and local variables are supported. String templates use `$variable` or `${expression}`.

## Example

```kotlin
fun main() {
    val name = "Kotlin"           // immutable, inferred as String
    var count = 0                 // mutable, inferred as Int
    val pi: Double = 3.14159

    count += 1
    println("$name count=$count pi=$pi")

    // Lazy initialization
    val heavy: String by lazy {
        println("Computed!")
        "expensive value"
    }
    println(heavy)  // "Computed!" then "expensive value"

    // Nullable
    var nullable: String? = null
    nullable = "hello"
    println(nullable?.length)  // safe call: 5
}
```

## Gotchas

- `val` does not make an object immutable — a `val list: MutableList<Int>` can still have items added; only the reference is constant.
- Kotlin does not have primitive types in the source code, but the compiler maps `Int`, `Double`, etc. to JVM primitives where possible for performance.
- `lateinit var` allows a non-null `var` to be initialized later (useful for dependency injection); accessing it before initialization throws `UninitializedPropertyAccessException`.
