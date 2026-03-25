---
title: "Common Patterns"
language: "csharp"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Idiomatic C# leverages LINQ for data transformation, records and `with` expressions for immutable data, pattern matching for dispatch, the options pattern for configuration, and dependency injection for wiring. Nullable reference types make `null` explicit. `IDisposable`/`using` handles resource cleanup. The `async/await` model pervades modern .NET APIs.

## Example

```csharp
using System.Linq;

// 1. LINQ — functional data pipeline
record Product(string Name, string Category, decimal Price);

var products = new[] {
    new Product("Laptop", "Electronics", 999.99m),
    new Product("Mouse", "Electronics", 29.99m),
    new Product("Desk", "Furniture", 349.99m),
};

var cheapElectronics = products
    .Where(p => p.Category == "Electronics" && p.Price < 500)
    .OrderBy(p => p.Price)
    .Select(p => $"{p.Name}: {p.Price:C}")
    .ToList();

// 2. Pattern matching — type dispatch
static string Describe(object obj) => obj switch {
    int n when n < 0          => "negative int",
    int n                     => $"int {n}",
    string { Length: 0 }      => "empty string",
    string s                  => $"string: {s}",
    IEnumerable<int> { } list => $"list with {list.Count()} ints",
    null                      => "null",
    _                         => obj.GetType().Name
};

// 3. with expression — non-destructive copy
record Config(string Host, int Port, bool Tls);
var dev  = new Config("localhost", 5432, false);
var prod = dev with { Host = "prod.db", Port = 5433, Tls = true };

// 4. Null-conditional pipeline
string? input = GetInput();
string result = input?.Trim()?.ToUpper() ?? "DEFAULT";

// 5. IDisposable via using
static string ReadFile(string path) {
    using var stream = new System.IO.StreamReader(path);
    return stream.ReadToEnd();
}

static string? GetInput() => null;
```

## Gotchas

- LINQ chains are lazy (deferred execution) for `IEnumerable<T>` — the query runs when you enumerate it (e.g., call `ToList()`, `Count()`, or iterate with `foreach`). Calling a LINQ chain twice executes it twice.
- `with` expressions create a shallow copy — nested objects are not cloned. If a record contains a mutable reference type, both the original and copy share the same inner object.
