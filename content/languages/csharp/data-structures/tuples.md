---
title: "Tuples"
language: "csharp"
feature: "tuples"
category: "data-structures"
applicable: true
---

C# offers two tuple systems: the legacy `Tuple<T1, T2>` reference type class and the modern `ValueTuple<T1, T2>` struct (C# 7+). Always prefer the `(T1 name1, T2 name2)` syntax, which uses `ValueTuple` under the hood — it is a value type (stack-allocated for small tuples), supports named elements, and integrates with deconstruction. Records are preferred when the tuple needs a meaningful name or shared use.

## Example

```csharp
// Value tuple — concise syntax
(int x, int y) point = (3, 4);
Console.WriteLine(point.x); // 3

// Inferred names (C# 7.1+)
int a = 10, b = 20;
var t = (a, b);   // names inferred: t.a == 10, t.b == 20

// As return type
static (double Min, double Max) MinMax(int[] nums) =>
    (nums.Min(), nums.Max());

var (min, max) = MinMax([3, 1, 4, 1, 5, 9]);
Console.WriteLine($"min={min}, max={max}"); // min=1, max=9

// Discard components
var (_, maximum) = MinMax([5, 2, 8]);
Console.WriteLine(maximum); // 8

// Nested tuple
(string Name, (int Year, int Month)) person = ("Alice", (1990, 6));
Console.WriteLine(person.Item2.Year); // 1990

// Equality — value tuples support == and !=
Console.WriteLine((1, 2) == (1, 2)); // true
Console.WriteLine((1, 2) != (1, 3)); // true

// Swap idiom
(a, b) = (b, a); // clean swap using tuple assignment
```

## Gotchas

- Named tuple elements are compiler sugar — at runtime they are `Item1`, `Item2`, etc. Serialization libraries may not preserve the names.
- `Tuple<T1, T2>` (the old class-based tuple) is a reference type with `Item1`/`Item2` only, no named elements, and no value semantics — avoid it in new code.
