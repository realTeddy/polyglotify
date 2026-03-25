---
title: "Function Declaration"
language: "csharp"
feature: "declaration"
category: "functions"
applicable: true
---

C# functions are declared as methods inside a class or struct, or as top-level statements (C# 9+) in `Program.cs`. Methods support `static`, `virtual`, `abstract`, `override`, and `sealed` modifiers. Expression-bodied methods (`=>`) reduce boilerplate for single-expression implementations. Local functions (C# 7+) let you define helper functions inside another method.

## Example

```csharp
// Top-level program (C# 9+)
Console.WriteLine(Add(2, 3));     // 5
Console.WriteLine(Max("a", "z")); // z

// Standard method
static int Add(int a, int b) => a + b;

// Generic method
static T Max<T>(T a, T b) where T : IComparable<T> =>
    a.CompareTo(b) >= 0 ? a : b;

// Method overloading
static string Format(int value) => value.ToString();
static string Format(double value) => value.ToString("F2");

// Local function — only visible within the enclosing method
static int Fibonacci(int n) {
    if (n < 0) throw new ArgumentOutOfRangeException(nameof(n));
    return Fib(n);

    // Local helper — captures nothing, so it can be static
    static int Fib(int x) => x <= 1 ? x : Fib(x - 1) + Fib(x - 2);
}

// Extension method — adds methods to existing types
static class StringExtensions {
    public static bool IsNullOrBlank(this string? s) =>
        string.IsNullOrWhiteSpace(s);
}

bool result = "  ".IsNullOrBlank(); // true
```

## Gotchas

- Static local functions (C# 8+) cannot accidentally capture variables from the enclosing scope, preventing subtle bugs when the local function is used in async or iterator contexts.
- Extension methods are resolved at compile time by the compiler's using-directive scope — they do not participate in runtime dispatch and cannot override existing methods.
