---
title: "Interfaces & Traits"
language: "scala"
feature: "interfaces"
category: "oop"
applicable: true
---

Scala uses `trait` as both interface and mixin. Traits can have abstract and concrete methods, fields, and state. A class can `extends` and `with` multiple traits (mixin composition). The linearization order determines method resolution for diamond inheritance.

## Example

```scala
// Trait as interface
trait Serializable:
  def serialize: Map[String, Any]
  def toJson: String =            // default implementation
    serialize.map((k,v) => s""""$k":"$v"""").mkString("{", ",", "}")

trait Printable:
  def printInfo(): Unit = println(toString)

// Mixin composition
class User(val name: String, val email: String)
    extends Serializable with Printable:
  override def serialize: Map[String, Any] =
    Map("name" -> name, "email" -> email)
  override def toString: String = s"User($name, $email)"

val u = User("Alice", "alice@example.com")
u.printInfo()
println(u.toJson)

// Trait with state
trait Counted:
  private var _count = 0
  def count: Int = _count
  protected def increment(): Unit = _count += 1

class EventBus extends Counted:
  def publish(event: Any): Unit =
    increment()
    println(s"Published: $event (#$count)")
```

## Gotchas

- Scala uses **C3 linearization** for trait mixin order — the last `with` trait is searched first before earlier ones
- Traits with `val` fields create a backing field in each class that mixes them in
- `extends` only one class but can `with` multiple traits — the first position after `extends` can be either a class or a trait
