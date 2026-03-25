---
title: "Parameters"
language: "csharp"
feature: "parameters"
category: "functions"
applicable: true
---

C# supports several parameter modifiers: `ref` (pass by reference, must be initialized), `out` (pass by reference, no initialization required), `in` (pass by reference, read-only), default values, named arguments, and `params` for variable-length argument lists. Named arguments improve readability at call sites with many parameters. C# 12 adds primary constructors, reducing parameter ceremony for simple types.

## Example

```csharp
// Default values
static string Greet(string name, string greeting = "Hello") =>
    $"{greeting}, {name}!";

Console.WriteLine(Greet("Alice"));           // Hello, Alice!
Console.WriteLine(Greet("Bob", "Hi"));       // Hi, Bob!

// Named arguments — order doesn't matter
Console.WriteLine(Greet(greeting: "Hey", name: "Carol")); // Hey, Carol!

// params — variable number of arguments
static int Sum(params int[] numbers) =>
    numbers.Sum();

Console.WriteLine(Sum(1, 2, 3, 4, 5)); // 15

// ref — caller's variable is modified
static void Increment(ref int n) => n++;
int x = 5;
Increment(ref x);
Console.WriteLine(x); // 6

// out — return multiple values (prefer tuples/records now)
static bool TryParse(string s, out int result) {
    result = 0;
    return int.TryParse(s, out result);
}
bool ok = TryParse("42", out int value);

// in — read-only reference (avoids copying large structs)
static double Length(in Vector2 v) => Math.Sqrt(v.X * v.X + v.Y * v.Y);
```

## Gotchas

- Parameters with default values must come after parameters without defaults (except for `params`, which must always be last).
- `out` and `ref` parameters cannot be used with `async` methods; use tuples or return types to pass multiple values out of an async method.
