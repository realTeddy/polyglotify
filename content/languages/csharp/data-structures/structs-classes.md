---
title: "Structs & Classes"
language: "csharp"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

C# has both `struct` (value type) and `class` (reference type) keywords. Structs are copied on assignment and live on the stack (or inline in objects), making them efficient for small, immutable data. Classes support inheritance and live on the heap. `record class` and `record struct` (C# 9+/10+) add value-based equality and immutability by default, combining the clarity of structs with the concision of a one-liner declaration.

## Example

```csharp
// Struct — value type, copied on assignment
readonly struct Vector2(double X, double Y) {
    public double Length => Math.Sqrt(X * X + Y * Y);
    public static Vector2 operator +(Vector2 a, Vector2 b) => new(a.X + b.X, a.Y + b.Y);
    public override string ToString() => $"({X}, {Y})";
}

var v1 = new Vector2(3, 0);
var v2 = v1;   // copy — v2 is independent
// v2.X = 5;  // error: readonly struct fields are immutable

// Class — reference type
class Circle {
    public double Radius { get; set; }
    public Circle(double radius) => Radius = radius;
    public double Area => Math.PI * Radius * Radius;
}

var c1 = new Circle(5);
var c2 = c1;   // same object — both point to the same Circle
c2.Radius = 10;
Console.WriteLine(c1.Radius); // 10 — shared reference

// Record — immutable, value equality, concise
record Point(double X, double Y) {
    public double DistanceTo(Point other) =>
        Math.Sqrt(Math.Pow(X - other.X, 2) + Math.Pow(Y - other.Y, 2));
}

var p1 = new Point(0, 0);
var p2 = new Point(3, 4);
Console.WriteLine(p1.DistanceTo(p2)); // 5
Console.WriteLine(p1 == new Point(0, 0)); // true — value equality

// Non-destructive mutation (with-expression)
var p3 = p1 with { X = 1 };
```

## Gotchas

- Large structs passed by value (not `ref`/`in`) are copied on every call, which can be slower than passing a class reference. Use `readonly struct` with `in` parameters for large structs.
- Records are reference types by default; `record struct` creates a value-type record. Both have value-based equality.
