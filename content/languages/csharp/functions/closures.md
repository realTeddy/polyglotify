---
title: "Closures"
language: "csharp"
feature: "closures"
category: "functions"
applicable: true
---

C# closures are created by lambda expressions and anonymous methods that capture variables from their enclosing scope. Unlike Java, C# closures can capture mutable variables — there is no "effectively final" restriction. The compiler lifts captured variables into a compiler-generated class, so they survive beyond the enclosing scope's stack frame. Delegates (`Func<T>`, `Action`, `Predicate<T>`) are the typed function pointer types that hold closures.

## Example

```csharp
// Counter using mutable captured variable
static Func<int> MakeCounter(int start = 0) {
    int count = start;
    return () => ++count;   // captures mutable 'count'
}

var counter = MakeCounter(10);
Console.WriteLine(counter()); // 11
Console.WriteLine(counter()); // 12

// Partial application via closure
static Func<int, int> Multiplier(int factor) =>
    n => n * factor;

var double_ = Multiplier(2);
var triple  = Multiplier(3);
Console.WriteLine(double_(7));  // 14
Console.WriteLine(triple(7));   // 21

// Closure over loop variable — capture by reference
var funcs = new List<Func<int>>();
for (int i = 0; i < 3; i++) {
    int captured = i;           // local copy — each closure gets its own
    funcs.Add(() => captured);
}
Console.WriteLine(string.Join(", ", funcs.Select(f => f()))); // 0, 1, 2

// LINQ heavily uses closures
int threshold = 80;
var passing = new[] { 70, 85, 92, 60 }.Where(s => s >= threshold).ToList();
```

## Gotchas

- The classic loop closure bug: capturing `i` directly (without `int captured = i`) means all lambdas share the same variable and see its final value. Always create a local copy inside the loop.
- Closures in hot paths can cause GC pressure because the compiler-generated display class is a heap allocation. Use `static` lambdas (C# 9+, `static x => x`) when no capture is needed.
