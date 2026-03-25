---
title: "Inheritance"
language: "scala"
feature: "inheritance"
category: "oop"
applicable: true
---

Scala supports single-class inheritance with `extends`. Abstract members are declared with `abstract`. `override` is required when overriding a concrete method. `sealed` classes restrict subclassing to the same file, enabling exhaustive pattern matching.

## Example

```scala
abstract class Shape:
  def area: Double           // abstract method
  def describe: String = s"Shape with area ${area.round}"

class Circle(val radius: Double) extends Shape:
  override def area: Double = math.Pi * radius * radius

class Rectangle(val width: Double, val height: Double) extends Shape:
  override def area: Double = width * height
  override def describe: String = s"Rectangle ${width}x${height}"

// Sealed hierarchy for exhaustive matching
sealed trait Expr
case class Num(n: Double)            extends Expr
case class Add(l: Expr, r: Expr)     extends Expr
case class Mul(l: Expr, r: Expr)     extends Expr

def eval(e: Expr): Double = e match
  case Num(n)    => n
  case Add(l, r) => eval(l) + eval(r)
  case Mul(l, r) => eval(l) * eval(r)
  // compiler warns if any case is missing (sealed)

// final prevents further subclassing
final class ImmutablePoint(val x: Int, val y: Int) extends Shape:
  def area = 0.0
```

## Gotchas

- `override` is mandatory when overriding a concrete member — omitting it is a compile error
- `sealed` classes/traits restrict subclasses to the same compilation unit; this enables exhaustiveness checking
- Traits support method implementation (like mixins); prefer traits over abstract classes for sharing behavior
