---
title: "Structs & Classes"
language: "dlang"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

D has both `struct` (value type, stack-allocated, no inheritance, no GC overhead) and `class` (reference type, heap-allocated via GC, supports inheritance and interfaces). Structs can have constructors, destructors, member functions, and operator overloading. They are ideal for plain data, math types, and performance-critical code.

## Example

```d
import std.stdio;
import std.math : sqrt;

struct Vec2
{
    float x, y;

    // Constructor
    this(float x, float y) { this.x = x; this.y = y; }

    // Member function
    float length() const { return sqrt(x*x + y*y); }

    // Operator overloading
    Vec2 opBinary(string op : "+")(Vec2 rhs) const
    {
        return Vec2(x + rhs.x, y + rhs.y);
    }

    // toString for writeln
    string toString() const
    {
        import std.format : format;
        return format("Vec2(%.2f, %.2f)", x, y);
    }
}

// Class for comparison
class Animal
{
    string name;
    this(string name) { this.name = name; }
    void speak() { writeln(name, " makes a sound."); }
}

void main()
{
    Vec2 a = Vec2(3, 4);
    Vec2 b = Vec2(1, 2);
    writeln(a.length);      // 5
    writeln(a + b);         // Vec2(4.00, 6.00)

    // Structs are value types
    Vec2 c = a;
    c.x = 99;
    writeln(a.x);           // still 3

    auto dog = new Animal("Dog");
    dog.speak();
}
```

## Gotchas

- Structs are copied on assignment; classes are reference types (only the pointer is copied).
- Structs cannot have a default (zero-argument) constructor — use `T.init` for the default state and define a named factory function if needed.
- Structs support `@disable this()` to prevent default construction, and `@disable this(this)` to make them move-only.
- Class instances must be allocated with `new`; stack allocation of classes requires `scope` or manual memory management.
