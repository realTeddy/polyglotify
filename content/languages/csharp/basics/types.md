---
title: "Types"
language: "csharp"
feature: "types"
category: "basics"
applicable: true
---

C# has a unified type system where all types — including primitives — ultimately derive from `System.Object`. Value types (`int`, `double`, `bool`, `struct`, `enum`) are stored by value; reference types (`class`, `interface`, `delegate`, `string`) store a reference. Nullable reference types (C# 8+, enabled via `<Nullable>enable</Nullable>`) make `null` opt-in for reference types, eliminating an entire class of null-reference bugs at compile time.

## Example

```csharp
// Value types — stored on stack (or inline in objects)
int i = 42;
double d = 3.14;
bool b = true;
char c = 'A';
decimal price = 9.99m;  // 128-bit decimal for financial math

// Struct — value type
struct Point { public int X; public int Y; }
Point p = new Point { X = 3, Y = 4 };

// Reference types
class Animal { public string Name { get; init; } = ""; }
Animal a = new Animal { Name = "Rex" };

// Nullable reference type (C# 8+)
string? nullableName = null;  // explicitly nullable
string nonNullable = "Alice"; // cannot be null (with nullable enabled)

// Record — immutable reference type (C# 9+)
record Person(string Name, int Age);
var person = new Person("Alice", 30);

// Record struct — immutable value type (C# 10+)
record struct Coordinate(double Lat, double Lon);
```

## Gotchas

- `decimal` is not a floating-point type — it is a 128-bit exact decimal number, ideal for money. Never use `double` for currency calculations.
- Boxing occurs when a value type is assigned to an `object` variable; this incurs a heap allocation and can cause subtle performance issues in tight loops.
