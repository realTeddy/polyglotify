---
title: "Inheritance"
language: "java"
feature: "inheritance"
category: "oop"
applicable: true
---

Java supports single-class inheritance via `extends`. A subclass inherits all non-private members and can override non-`final` methods. `@Override` is a mandatory annotation by convention — it makes the compiler verify an actual override occurs. `super` accesses the parent's constructor or methods. `abstract` classes cannot be instantiated and may declare abstract methods that subclasses must implement.

## Example

```java
abstract class Shape {
    private final String color;

    protected Shape(String color) {
        this.color = color;
    }

    public abstract double area();
    public abstract double perimeter();

    public String describe() {
        return String.format("%s %s (area=%.2f)", color, getClass().getSimpleName(), area());
    }

    public String getColor() { return color; }
}

class Circle extends Shape {
    private final double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double area() { return Math.PI * radius * radius; }

    @Override
    public double perimeter() { return 2 * Math.PI * radius; }
}

class Rectangle extends Shape {
    private final double width, height;

    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() { return width * height; }

    @Override
    public double perimeter() { return 2 * (width + height); }
}

class Demo {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle("red", 5), new Rectangle("blue", 4, 6) };
        for (Shape s : shapes) System.out.println(s.describe());
    }
}
```

## Gotchas

- Java's single inheritance restricts reuse; use interfaces with `default` methods for mixin-style composition.
- Calling an overridable method from a constructor is dangerous — the subclass method runs before the subclass constructor body, potentially accessing uninitialized fields.
