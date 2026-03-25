---
title: "Operators"
language: "scala"
feature: "operators"
category: "basics"
applicable: true
---

In Scala, operators are method calls. Any method with a symbolic name can be used infix. This allows library authors to create expressive DSLs. Standard arithmetic, comparison, and logical operators all map to methods on the respective types.

## Example

```scala
// Operators are method calls
1 + 2       // same as 1.+(2)
"hi" * 3    // => "hihihi" (String method)

// Arithmetic
val x = 10
x / 3       // => 3 (integer division)
x % 3       // => 1
x.toDouble / 3  // => 3.333...

// Comparison
5 > 3       // => true
"abc" < "abd"  // => true (lexicographic)

// Logical
true && false
true || false
!true

// Bitwise
0xFF & 0x0F  // => 15
1 << 3       // => 8

// Custom operator method
case class Vec(x: Double, y: Double):
  def +(other: Vec) = Vec(x + other.x, y + other.y)
  def *(scalar: Double) = Vec(x * scalar, y * scalar)

val v = Vec(1, 2) + Vec(3, 4)   // => Vec(4.0, 6.0)

// Pipe operator (Scala 3)
import scala.util.chaining.*
val result = "hello".pipe(_.toUpperCase).pipe(_.reverse)
```

## Gotchas

- Right-associative operators end with `:` (e.g., `::` for list prepend): `1 :: list` calls `list.::(1)`
- `==` delegates to `.equals()` and is null-safe; use `eq` for reference equality
- Precedence follows the first character of the operator symbol; custom operators can be surprising
