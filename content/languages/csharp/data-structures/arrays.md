---
title: "Arrays"
language: "csharp"
feature: "arrays"
category: "data-structures"
applicable: true
---

C# arrays are fixed-size, zero-indexed, and strongly typed. They inherit from `System.Array`, which provides `Length`, `Sort`, `BinarySearch`, and LINQ extension methods. For dynamic-size collections, `List<T>` is preferred. C# 12 introduces collection expressions (`[1, 2, 3]`) for concise initialization. Multidimensional arrays come in rectangular (`T[,]`) and jagged (`T[][]`) forms.

## Example

```csharp
using System.Linq;

// Array literal (C# 12 collection expression)
int[] scores = [90, 75, 85, 60, 95];

// Access and length
Console.WriteLine(scores[0]);      // 90
Console.WriteLine(scores.Length);  // 5

// LINQ on arrays
int total  = scores.Sum();
double avg = scores.Average();
var passing = scores.Where(s => s >= 80).OrderByDescending(s => s).ToArray();

// Array.Sort and BinarySearch
Array.Sort(scores);
int idx = Array.BinarySearch(scores, 85); // 2

// Spread / slice (C# 8+ Range)
int[] slice = scores[1..4]; // elements at index 1, 2, 3

// List<T> — dynamic
var names = new List<string> { "Alice", "Bob", "Carol" };
names.Add("Dave");
names.Remove("Bob");
names.Sort();

// Multidimensional
int[,] matrix = { {1, 2}, {3, 4} };
Console.WriteLine(matrix[1, 0]); // 3

// Jagged array
int[][] jagged = new int[3][];
jagged[0] = [1];
jagged[1] = [1, 2];
jagged[2] = [1, 2, 3];
```

## Gotchas

- `scores[1..4]` creates a new array (a copy), not a view. Use `Memory<T>` or `Span<T>` for zero-copy slicing.
- `List<T>` doubles its internal buffer when capacity is exceeded (amortised O(1) `Add`); pre-allocate with `new List<T>(capacity)` when you know the expected size to avoid reallocations.
