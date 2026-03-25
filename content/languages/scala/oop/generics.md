---
title: "Generics"
language: "scala"
feature: "generics"
category: "oop"
applicable: true
---

Scala has a sophisticated generics system with type parameters, upper/lower bounds, variance annotations (`+` covariant, `-` contravariant), and context bounds (type class constraints). Type parameters can be used on classes, traits, and methods.

## Example

```scala
// Generic class
class Box[A](val value: A):
  def map[B](f: A => B): Box[B] = Box(f(value))

val intBox    = Box(42)
val stringBox = intBox.map(_.toString)

// Variance
class Producer[+A](val item: A)  // covariant — Producer[Cat] is-a Producer[Animal]
class Consumer[-A]:               // contravariant
  def consume(item: A): Unit = println(item)

// Upper bound
def sum[A <: Numeric[A]](xs: List[A])(using n: Numeric[A]): A =
  xs.foldLeft(n.zero)(n.plus)

// Context bound (type class constraint)
def show[A: Show](value: A): String = summon[Show[A]].show(value)

// Multiple bounds
def process[A <: Comparable[A] with Serializable](items: List[A]): List[A] =
  items.sorted

// Wildcard / existential
def printList(xs: List[?]): Unit = xs.foreach(println)
```

## Gotchas

- Scala generics are erased at the JVM level; use `TypeTag`/`ClassTag` when runtime type info is needed
- Variance annotations (`+A`, `-A`) are checked by the compiler — misuse causes a compile error
- Lower bounds `A >: B` mean A is a supertype of B; upper bounds `A <: B` mean A is a subtype of B
