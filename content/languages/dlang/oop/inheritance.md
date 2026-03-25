---
title: "Inheritance"
language: "dlang"
feature: "inheritance"
category: "oop"
applicable: true
---

D supports single-class inheritance with `class Child : Parent`. Methods are virtual by default and can be overridden with `override` (which the compiler requires — omitting `override` on an overriding method is a compile error). `final class` prevents further subclassing. Structs cannot inherit.

## Example

```d
import std.stdio;

class Shape
{
    string color;
    this(string color) { this.color = color; }

    double area() const { return 0; }   // base implementation

    override string toString() const
    {
        import std.format : format;
        return format("%s (%s, area=%.2f)", typeid(this).name, color, area());
    }
}

class Circle : Shape
{
    private double radius;
    this(string color, double radius)
    {
        super(color);           // call parent constructor
        this.radius = radius;
    }

    override double area() const
    {
        import std.math : PI;
        return PI * radius * radius;
    }
}

class Rectangle : Shape
{
    private double w, h;
    this(string color, double w, double h)
    {
        super(color);
        this.w = w; this.h = h;
    }

    override double area() const { return w * h; }
}

void printInfo(Shape s) { writeln(s); }

void main()
{
    Shape[] shapes = [
        new Circle("red", 5),
        new Rectangle("blue", 3, 4),
    ];
    foreach (s; shapes) printInfo(s);

    // Runtime type check
    foreach (s; shapes)
    {
        if (auto c = cast(Circle) s)
            writeln("Circle radius detected");
    }
}
```

## Gotchas

- `override` is mandatory when overriding a virtual method — forgetting it is a compile error, which prevents silent bugs.
- D has no multiple class inheritance; use interfaces for multiple types.
- `abstract` methods (declared with no body) force subclasses to implement them; an `abstract class` cannot be instantiated.
- `super(args)` must be the first statement in a derived constructor if used.
