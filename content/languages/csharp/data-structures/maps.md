---
title: "Maps"
language: "csharp"
feature: "maps"
category: "data-structures"
applicable: true
---

C# uses `Dictionary<TKey, TValue>` as its primary hash map. `SortedDictionary<K,V>` keeps keys in sorted order (red-black tree, O(log n)). `ImmutableDictionary<K,V>` from `System.Collections.Immutable` provides a persistent, thread-safe map. C# 3+ collection initializers and C# 6+ index initializers allow concise literal syntax. `TryGetValue` is the safe, single-call lookup pattern.

## Example

```csharp
using System.Collections.Generic;

// Dictionary<K, V>
var scores = new Dictionary<string, int> {
    ["Alice"] = 95,
    ["Bob"]   = 87,
    ["Carol"] = 91
};

// Safe lookup
if (scores.TryGetValue("Alice", out int aliceScore))
    Console.WriteLine($"Alice: {aliceScore}"); // Alice: 95

// Default value if missing
int daveScore = scores.GetValueOrDefault("Dave", 0); // 0

// Add or update
scores["Dave"] = 78;

// Iterate
foreach (var (name, score) in scores)
    Console.WriteLine($"{name}: {score}");

// LINQ on dictionary
var topScorers = scores
    .Where(kv => kv.Value >= 90)
    .Select(kv => kv.Key)
    .ToList();

// GetOrAdd pattern using TryAdd
scores.TryAdd("Eve", 88);

// Counting with aggregate
string text = "hello world";
var freq = text.Where(char.IsLetter)
               .GroupBy(c => c)
               .ToDictionary(g => g.Key, g => g.Count());
```

## Gotchas

- Accessing a missing key with `scores["missing"]` throws `KeyNotFoundException`; always use `TryGetValue` or `ContainsKey` first.
- `Dictionary<K,V>` is not thread-safe; use `ConcurrentDictionary<K,V>` for concurrent reads and writes.
