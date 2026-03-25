---
title: "Inheritance"
language: "groovy"
feature: "inheritance"
category: "oop"
applicable: true
---

Groovy inheritance works identically to Java — single class inheritance via `extends`, with `super` to call parent methods or constructors. Groovy adds `@InheritConstructors` to automatically propagate all parent constructors to the subclass without writing boilerplate. Method overriding follows the same rules as Java, and `@Override` is supported as an annotation.

## Example

```groovy
import groovy.transform.InheritConstructors

class Shape {
    String colour

    Shape(String colour) {
        this.colour = colour
    }

    double area() { 0.0 }

    String describe() {
        "${getClass().simpleName}(colour=$colour, area=${area()})"
    }
}

@InheritConstructors
class Circle extends Shape {
    double radius

    Circle(String colour, double radius) {
        super(colour)
        this.radius = radius
    }

    @Override
    double area() { Math.PI * radius ** 2 }
}

@InheritConstructors
class Rectangle extends Shape {
    double width, height

    Rectangle(String colour, double width, double height) {
        super(colour)
        this.width = width
        this.height = height
    }

    @Override
    double area() { width * height }
}

def shapes = [new Circle("red", 5), new Rectangle("blue", 4, 6)]
shapes.each { println it.describe() }
```

## Gotchas

- Groovy does not support multiple class inheritance; use traits for mixin-style composition.
- `@InheritConstructors` copies all constructors from the parent, which can cause confusion if the parent has many overloads — the subclass gains all of them.
- Unlike Java, Groovy methods are virtual by default and cannot be made `final` from a dynamic-dispatch perspective unless `@CompileStatic` is used.
