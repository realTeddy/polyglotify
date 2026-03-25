---
title: "Structs & Classes"
language: "groovy"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Groovy classes are full Java classes with automatic getter/setter generation for properties. The `@Immutable` annotation creates a value-object (struct-like) class with a generated constructor, `equals`, `hashCode`, and `toString`. `@groovy.transform.Canonical` generates all three of those methods without enforcing immutability. These annotations cover the common struct-like use cases without boilerplate.

## Example

```groovy
import groovy.transform.Immutable
import groovy.transform.Canonical

// Immutable struct-like class
@Immutable
class Point {
    int x
    int y
}

def p1 = new Point(3, 4)
println p1          // Point(3, 4)
println p1.x        // 3

// Canonical — mutable but with equals/hashCode/toString
@Canonical
class Person {
    String name
    int age
}

def alice = new Person("Alice", 30)
def alice2 = new Person("Alice", 30)
println alice == alice2   // true (value equality via equals)
println alice             // Person(Alice, 30)

// Regular Groovy class — properties auto-generate getters/setters
class Rectangle {
    double width
    double height
    double area() { width * height }
}
def r = new Rectangle(width: 5.0, height: 3.0)
println r.area()   // 15.0
```

## Gotchas

- `@Immutable` classes cannot have mutable fields; attempting to include a mutable type (like `List`) requires marking it with `@groovy.transform.KnownImmutable` or it will raise a compile-time error.
- Groovy auto-generates `getX()` and `setX()` for every class property; accessing `obj.x` calls the getter, not direct field access, which matters when overriding accessors.
- `@Canonical` does not enforce immutability; two `@Canonical` objects can be equal even after one has been mutated to match the other's state.
