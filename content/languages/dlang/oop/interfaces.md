---
title: "Interfaces & Traits"
language: "dlang"
feature: "interfaces"
category: "oop"
applicable: true
---

D interfaces define a contract of abstract methods that implementing classes must provide. A class can implement multiple interfaces. Interfaces may contain final methods with bodies (default implementations). D also has `template constraints` (via `if` clauses) and `std.traits` for compile-time introspection, serving a role similar to traits in Rust.

## Example

```d
import std.stdio;

interface Drawable
{
    void draw() const;
    // Default method (final is allowed in interfaces)
    final void drawTwice() const { draw(); draw(); }
}

interface Resizable
{
    void resize(double factor);
}

class Square : Drawable, Resizable
{
    private double side;
    this(double side) { this.side = side; }

    override void draw() const
    {
        import std.format : format;
        writeln("Square(", side, ")");
    }

    override void resize(double factor) { side *= factor; }
}

// Template constraint acting like a trait bound
void printDrawable(T)(T obj) if (is(T : Drawable))
{
    obj.draw();
}

void main()
{
    auto sq = new Square(5.0);
    sq.drawTwice();
    sq.resize(2.0);
    sq.draw();

    // Interface references
    Drawable d = sq;
    d.draw();

    printDrawable(sq);
}
```

## Gotchas

- Interfaces cannot have fields (data members); they can only declare methods and constants.
- A class must implement every abstract method from all its interfaces; missing any is a compile error.
- Template constraints (`if (is(T : Interface))`) are checked at compile time and produce better error messages than unconstrained templates.
- D does not have Rust-style traits as first-class polymorphism items; `interface` provides runtime polymorphism, while templates provide compile-time duck typing.
