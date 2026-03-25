---
title: "Sets"
language: "fsharp"
feature: "sets"
category: "data-structures"
applicable: true
---

F# provides `Set<'T>` — an immutable, sorted set backed by a balanced BST. Elements must have a comparison (most built-in types do). The `Set` module provides all standard set operations.

## Example

```fsharp
// Create a Set
let s1 = Set.ofList [3; 1; 4; 1; 5; 9; 2; 6]
// set [1; 2; 3; 4; 5; 6; 9]   (sorted, duplicates removed)

let s2 = Set.ofList [2; 4; 6; 8; 10]

// Membership (O(log n))
Set.contains 3 s1   // true
Set.contains 7 s1   // false

// Add / remove (returns new set)
let s3 = Set.add 7 s1
let s4 = Set.remove 1 s1

// Set operations
let union    = Set.union        s1 s2
let inter    = Set.intersect    s1 s2   // {2;4;6}
let diff     = Set.difference   s1 s2   // {1;3;5;9}

// Predicates
Set.isSubset   (set [1;2]) s1   // true
Set.isSuperset s1 (set [1;2])   // true
Set.isEmpty    Set.empty        // true
Set.count      s1               // 8

// Conversion
Set.toList s1       // [1;2;3;4;5;6;9]  (sorted)
Set.toSeq  s1       // seq [1;2;3;...]

// Map and filter over set
Set.map    ((*) 2) s1
Set.filter odd      s1   // set [1;3;5;9]

// Fold
Set.fold (+) 0 s1   // sum of elements

// .NET HashSet for O(1) operations
open System.Collections.Generic
let hs = HashSet<int>([1;2;3;2;1])
hs.Contains 2   // true
hs.Add 4 |> ignore
```

## Gotchas

- `Set<'T>` requires `Comparison` on `'T`; custom types need `[<CustomComparison>]` and `[<CustomEquality>]`
- `Set.ofList` is O(n log n); `Set.add` is O(log n)
- For mutable, O(1) sets, use `System.Collections.Generic.HashSet`
