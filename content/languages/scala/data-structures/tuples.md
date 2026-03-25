---
title: "Tuples"
language: "scala"
feature: "tuples"
category: "data-structures"
applicable: true
---

Scala has built-in tuple types `Tuple1` through `Tuple22`. Tuples are immutable, heterogeneous, and support pattern-matching destructuring. Scala 3 also has named tuples and improved tuple APIs. They are commonly used as lightweight multi-value returns.

## Example

```scala
// Create tuples
val pair   = (1, "hello")
val triple = (1, 2.0, true)

// Access by position (1-indexed with ._n)
pair._1   // => 1
pair._2   // => "hello"

// Destructuring
val (num, str) = pair

// Pattern matching
pair match
  case (1, msg) => println(s"One: $msg")
  case _        => println("other")

// Multiple return values
def minMax(nums: List[Int]): (Int, Int) =
  (nums.min, nums.max)

val (lo, hi) = minMax(List(3, 1, 4))

// Named tuples (Scala 3)
val point: (x: Int, y: Int) = (x = 10, y = 20)
point.x   // => 10

// Converting to list
triple.toList   // => List(1, 2.0, true) as List[Matchable]
```

## Gotchas

- Tuple elements are accessed with `._1`, `._2`, etc. (1-indexed, not 0-indexed)
- Tuples larger than 22 elements are not supported; use a `case class` instead
- Named tuples (Scala 3) provide readability without the overhead of a full `case class`
