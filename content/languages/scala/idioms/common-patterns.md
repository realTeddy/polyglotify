---
title: "Common Patterns"
language: "scala"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Idiomatic Scala uses algebraic data types (sealed traits + case classes), type classes (implicit/given), `for` comprehensions for monadic chaining, and opaque types for zero-cost newtype wrappers. Pattern matching is pervasive for control flow.

## Example

```scala
// Algebraic Data Type (ADT)
sealed trait Result[+A]
case class Ok[A](value: A)    extends Result[A]
case class Err(message: String) extends Result[Nothing]

def process(r: Result[Int]): String = r match
  case Ok(n)    => s"Got $n"
  case Err(msg) => s"Error: $msg"

// Type class pattern (Scala 3 given/using)
trait Show[A]:
  def show(a: A): String

given Show[Int]    with def show(n: Int)    = n.toString
given Show[String] with def show(s: String) = s""""$s""""

def printAll[A: Show](items: List[A]): Unit =
  items.foreach(a => println(summon[Show[A]].show(a)))

// Opaque type (zero-cost newtype)
opaque type UserId = Long
object UserId:
  def apply(n: Long): UserId = n
  extension (id: UserId) def value: Long = id

val id: UserId = UserId(42)  // cannot accidentally use as Long

// Smart constructor
object NonEmptyString:
  def apply(s: String): Option[NonEmptyString] =
    if s.nonEmpty then Some(new NonEmptyString(s)) else None
class NonEmptyString private(val value: String)
```

## Gotchas

- Pattern matching on non-sealed hierarchies does not warn about missing cases — seal your ADT types
- Type class `given` instances are resolved at compile time; ambiguous implicits cause a compile error
- `opaque type` aliases have zero runtime overhead — they compile to the underlying type on the JVM
