---
title: "Operators"
language: "csharp"
feature: "operators"
category: "basics"
applicable: true
---

C# supports all standard operators and additionally allows operator overloading for user-defined types. The null-conditional operator (`?.`), null-coalescing operator (`??`), and null-coalescing assignment (`??=`) are first-class citizens. The `is` pattern operator and `switch` expressions (C# 8+) provide concise type-safe dispatch. C# does not have `===` — `==` for strings and value types compares by value; for reference types it compares by reference unless overloaded.

## Example

```csharp
// Arithmetic
int sum = 10 + 3;
int mod = 10 % 3;
double pow = Math.Pow(2, 8); // 256.0 (no ** operator)

// Null-conditional and null-coalescing
string? name = null;
int len = name?.Length ?? 0;     // 0
name ??= "default";              // assign if null

// is pattern matching
object obj = "Hello";
if (obj is string s)
    Console.WriteLine(s.ToUpper());  // HELLO — s is already cast

// Switch expression with patterns (C# 8+)
static string Classify(object o) => o switch {
    int n when n < 0  => "negative int",
    int n             => $"int: {n}",
    string s          => $"string: {s}",
    null              => "null",
    _                 => "other"
};

// Operator overloading
struct Vector2(double X, double Y) {
    public static Vector2 operator +(Vector2 a, Vector2 b) =>
        new(a.X + b.X, a.Y + b.Y);
    public override string ToString() => $"({X}, {Y})";
}

var v = new Vector2(1, 2) + new Vector2(3, 4); // (4, 6)
```

## Gotchas

- The `==` operator on reference types checks reference equality by default; override it (and `Equals`/`GetHashCode`) when value equality is needed.
- `??` only coalesces `null`, not other falsy values — unlike JavaScript's `||` operator.
