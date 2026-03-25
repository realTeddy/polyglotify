---
title: "Structs & Classes"
language: "scala"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Scala `case class` is the idiomatic equivalent of a struct or data class. It automatically generates `equals`, `hashCode`, `toString`, `copy`, and companion `apply`/`unapply`. Fields are `val` (immutable) by default. `case class` instances are used extensively in pattern matching.

## Example

```scala
// Case class — immutable data carrier
case class Point(x: Double, y: Double):
  def distanceTo(other: Point): Double =
    math.hypot(x - other.x, y - other.y)

val p1 = Point(3.0, 4.0)
val p2 = Point(3.0, 4.0)

p1 == p2        // => true (structural equality)
p1.toString     // => "Point(3.0,4.0)"

// Copy with modified fields
val p3 = p1.copy(x = 0.0)  // => Point(0.0, 4.0)

// Nested case classes
case class Address(street: String, city: String)
case class Person(name: String, age: Int, address: Address)

// Pattern matching decomposition
val Person(name, age, Address(_, city)) = Person("Alice", 30, Address("1 Main St", "NYC"))

// Case class in match
def describe(p: Point): String = p match
  case Point(0, 0) => "origin"
  case Point(x, 0) => s"on x-axis at $x"
  case Point(0, y) => s"on y-axis at $y"
  case Point(x, y) => s"($x, $y)"
```

## Gotchas

- `case class` fields are `val` by default; use `var` only when mutation is explicitly needed
- `case class` should not be subclassed without `sealed` — it breaks pattern matching guarantees
- The companion `apply` method is generated automatically, so `Point(1, 2)` works without `new`
