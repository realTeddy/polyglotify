---
title: "Return Values"
language: "csharp"
feature: "return-values"
category: "functions"
applicable: true
---

C# methods return a single value declared in the signature. `void` methods return nothing. Tuples (`(T1, T2)`) and records are the idiomatic way to return multiple values — `out` parameters are a legacy alternative. `ref return` allows returning a reference to a variable inside an array or object (advanced, used in performance-critical code). The `Task<T>` return type signals an asynchronous operation.

## Example

```csharp
// Single return value
static int Square(int n) => n * n;

// void
static void Log(string message) => Console.WriteLine($"[LOG] {message}");

// Tuple return — lightweight multi-value return
static (int Quotient, int Remainder) DivMod(int a, int b) =>
    (a / b, a % b);

var (q, r) = DivMod(17, 5);
Console.WriteLine($"{q} remainder {r}"); // 3 remainder 2

// Named tuple with destructuring
static (double Min, double Max, double Mean) Stats(IEnumerable<double> values) {
    var list = values.ToList();
    return (list.Min(), list.Max(), list.Average());
}

var (min, max, mean) = Stats([1.0, 2.0, 3.0, 4.0, 5.0]);

// Returning nullable to indicate absence
static string? FindUser(int id) {
    var users = new Dictionary<int, string> { [1] = "Alice" };
    return users.TryGetValue(id, out var name) ? name : null;
}

string user = FindUser(1) ?? "Unknown";

// Async return
static async Task<string> FetchDataAsync(string url) {
    using var client = new HttpClient();
    return await client.GetStringAsync(url);
}
```

## Gotchas

- Tuple element names are a compile-time convenience only — at runtime they are `Item1`, `Item2`, etc. Don't rely on names in reflection or serialization.
- `void` async methods (`async void`) should be avoided except for event handlers — they cannot be awaited and swallow exceptions silently.
