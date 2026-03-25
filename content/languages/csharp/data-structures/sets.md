---
title: "Sets"
language: "csharp"
feature: "sets"
category: "data-structures"
applicable: true
---

C# provides `HashSet<T>` (O(1) average, unordered), `SortedSet<T>` (sorted, O(log n)), and `ImmutableHashSet<T>`. All implement `ISet<T>`, which includes `UnionWith`, `IntersectWith`, `ExceptWith`, and `IsSubsetOf`. Custom types must implement `GetHashCode` and `Equals` correctly to work as set elements.

## Example

```csharp
using System.Collections.Generic;

// HashSet<T>
var tags = new HashSet<string> { "csharp", "dotnet", "web" };
tags.Add("csharp");  // duplicate — ignored
tags.Add("azure");
Console.WriteLine(tags.Contains("dotnet")); // true
Console.WriteLine(tags.Count);              // 4

// Deduplication
var nums = new[] { 1, 2, 2, 3, 3, 3 };
var unique = new HashSet<int>(nums); // {1, 2, 3}

// SortedSet — maintains sorted order
var sortedNames = new SortedSet<string> { "Charlie", "Alice", "Bob" };
Console.WriteLine(string.Join(", ", sortedNames)); // Alice, Bob, Charlie
Console.WriteLine(sortedNames.Min); // Alice

// Set operations (mutate in place)
var a = new HashSet<int> { 1, 2, 3, 4 };
var b = new HashSet<int> { 3, 4, 5, 6 };

var union = new HashSet<int>(a);
union.UnionWith(b);           // {1,2,3,4,5,6}

var intersection = new HashSet<int>(a);
intersection.IntersectWith(b); // {3,4}

var difference = new HashSet<int>(a);
difference.ExceptWith(b);      // {1,2}

// Non-mutating LINQ alternative
var intersect2 = a.Intersect(b).ToHashSet();

Console.WriteLine(a.IsSubsetOf(union)); // true
```

## Gotchas

- `HashSet<T>` uses `GetHashCode` and `Equals` on `T`. For value-equality on custom types, either override both methods or provide a custom `IEqualityComparer<T>` to the constructor.
- `ImmutableHashSet<T>` operations return a new set instead of mutating — don't forget to capture the return value.
