---
title: "Variables & Declaration"
language: "scala"
feature: "variables"
category: "basics"
applicable: true
---

Scala declares immutable values with `val` and mutable variables with `var`. Types are inferred but can be explicit. Scala strongly encourages `val` for functional-style programming. `lazy val` defers initialization until first access.

## Example

```scala
// Immutable value (preferred)
val name: String = "Alice"
val age = 30          // type inferred as Int

// Mutable variable
var count = 0
count += 1

// Explicit type annotation
val pi: Double = 3.14159

// Lazy evaluation
lazy val expensiveValue = computeExpensiveResult()  // not computed until first access

// Multiple assignment via pattern match
val (x, y) = (10, 20)

// String interpolation
val greeting = s"Hello, $name! You are $age years old."
val expr      = s"${age * 2} is double your age."

// Raw strings
val path = raw"C:\Users\alice\file.txt"
```

## Gotchas

- Reassigning a `val` is a compile error; `var` is mutable but discouraged in idiomatic Scala
- `lazy val` is thread-safe but incurs synchronization overhead; avoid it in hot paths
- Scala infers `val` types at declaration; the type cannot change unlike dynamic languages
