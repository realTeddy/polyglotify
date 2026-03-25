---
title: "Control Flow"
language: "csharp"
feature: "control-flow"
category: "basics"
applicable: true
---

C# control flow mirrors C-family languages: `if/else`, `switch`, `for`, `foreach`, `while`, `do/while`, `break`, `continue`, and `goto` (rarely used). C# 8+ switch expressions produce values and support rich pattern matching. `foreach` works on any `IEnumerable<T>`. C# also supports `yield return` for lazy sequences and `await foreach` for async streams.

## Example

```csharp
// if / else
int score = 85;
string grade = score switch {
    >= 90 => "A",
    >= 80 => "B",
    >= 70 => "C",
    _     => "F"
};

// Switch expression with property pattern
record Shape(string Kind, double Size);
static double Area(Shape s) => s switch {
    { Kind: "circle" }    => Math.PI * s.Size * s.Size,
    { Kind: "square" }    => s.Size * s.Size,
    _                     => throw new ArgumentException($"Unknown shape: {s.Kind}")
};

// foreach
int[] numbers = [1, 2, 3, 4, 5];
int total = 0;
foreach (int n in numbers) total += n;

// for with index
for (int i = 0; i < numbers.Length; i++) {
    Console.Write(numbers[i] + " ");
}

// while
int n2 = 0;
while (n2 < 10) n2 += 3;

// yield return — lazy sequence
static IEnumerable<int> Range(int start, int end) {
    for (int i = start; i < end; i++)
        yield return i;
}

foreach (int i in Range(0, 5)) Console.Write(i); // 0 1 2 3 4
```

## Gotchas

- C# `switch` statements still fall through only to empty cases; unlike C, a non-empty case without a `break` or `goto` is a compile error. Switch expressions never fall through.
- `foreach` calls `GetEnumerator()` on the collection; modifying the collection during iteration throws `InvalidOperationException`.
