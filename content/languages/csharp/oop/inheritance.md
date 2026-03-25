---
title: "Inheritance"
language: "csharp"
feature: "inheritance"
category: "oop"
applicable: true
---

C# supports single-class inheritance via `:` and multiple interface implementation. `virtual` methods can be overridden; `abstract` methods must be. `sealed` prevents further inheritance. `base` accesses parent members. `override` must be explicit — accidentally shadowing a parent method with the same name requires `new` (not `override`) and produces a compiler warning, preventing silent bugs.

## Example

```csharp
abstract class Shape {
    public string Color { get; init; } = "black";

    public abstract double Area();
    public abstract double Perimeter();

    // Virtual — can be overridden
    public virtual string Describe() =>
        $"{Color} {GetType().Name} (area={Area():F2})";
}

class Circle(double radius) : Shape {
    public double Radius => radius;

    public override double Area() => Math.PI * radius * radius;
    public override double Perimeter() => 2 * Math.PI * radius;
}

class Rectangle(double width, double height) : Shape {
    public override double Area() => width * height;
    public override double Perimeter() => 2 * (width + height);
}

// sealed — prevents further subclassing
sealed class Square(double side) : Rectangle(side, side) {
    public override string Describe() =>
        base.Describe() + $" [square, side={side}]";
}

Shape[] shapes = [
    new Circle(5) { Color = "red" },
    new Rectangle(4, 6) { Color = "blue" },
    new Square(3) { Color = "green" }
];

foreach (var s in shapes)
    Console.WriteLine(s.Describe());
```

## Gotchas

- Using `new` instead of `override` hides the base member but doesn't participate in virtual dispatch — the base version runs when accessed through a base-type reference.
- `sealed` classes cannot be subclassed but can still implement interfaces; sealing a class also enables certain JIT optimizations.
