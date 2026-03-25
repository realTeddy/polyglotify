---
title: "Classes"
language: "groovy"
feature: "classes"
category: "oop"
applicable: true
---

Groovy classes are full JVM classes and behave like Java classes with significant syntactic sugar. Properties defined in the class body automatically get generated getters and setters. The `def` keyword replaces `Object` for loosely typed members. Constructors can be invoked with named arguments using the map-style syntax, and Groovy supports metaclass-level manipulation for runtime method injection.

## Example

```groovy
class Animal {
    String name
    String sound

    // Custom constructor
    Animal(String name, String sound) {
        this.name = name
        this.sound = sound
    }

    // Method
    String speak() {
        "$name says $sound"
    }

    // toString via GString
    String toString() { "Animal($name)" }
}

def cat = new Animal("Cat", "Meow")
println cat.speak()    // Cat says Meow
println cat.name       // Cat (calls getName())

// Named argument construction (default map constructor)
class Point {
    int x, y
}
def p = new Point(x: 10, y: 20)
println "$p.x, $p.y"   // 10, 20

// Runtime method injection via metaClass
Animal.metaClass.shout = { -> delegate.sound.toUpperCase() }
println cat.shout()   // MEOW
```

## Gotchas

- Groovy classes are `public` by default; unlike Java, there is no package-private default visibility.
- Accessing `obj.field` invokes the generated getter `getField()`; if you need direct field access, use `obj.@field`.
- MetaClass modifications are global and affect all instances; they should only be used in tests or scripts, not production library code.
