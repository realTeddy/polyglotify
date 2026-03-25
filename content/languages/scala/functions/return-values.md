---
title: "Return Values"
language: "scala"
feature: "return-values"
category: "functions"
applicable: true
---

Scala functions return the value of their last expression. Explicit `return` is rarely used and discouraged (it breaks referential transparency and causes issues with closures). Multiple values are returned as tuples. `Unit` is the return type for side-effecting functions with no meaningful return value.

## Example

```scala
// Implicit return — last expression
def double(n: Int) = n * 2

// Tuple return for multiple values
def minMax(nums: List[Int]): (Int, Int) =
  (nums.min, nums.max)

val (lo, hi) = minMax(List(3, 1, 4, 1, 5))

// Named tuple (Scala 3)
def stats(nums: List[Int]): (min: Int, max: Int, sum: Int) =
  (min = nums.min, max = nums.max, sum = nums.sum)

val s = stats(List(1, 2, 3))
println(s.min)  // => 1

// Option for optional results
def findUser(id: Int): Option[String] =
  if id == 1 then Some("Alice") else None

// Unit for side effects
def log(msg: String): Unit = println(msg)

// Nothing — function that never returns
def fail(msg: String): Nothing = throw RuntimeException(msg)
```

## Gotchas

- `return` inside a lambda/closure returns from the enclosing `def`, not the closure — this can cause surprising behavior
- `Unit` is a type with a single value `()`; it is not the same as Java's `void`
- Functions returning `Nothing` are valid in any position since `Nothing` is a subtype of all types
