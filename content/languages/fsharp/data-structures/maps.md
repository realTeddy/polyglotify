---
title: "Maps & Dictionaries"
language: "fsharp"
feature: "maps"
category: "data-structures"
applicable: true
---

F# provides `Map<'Key,'Value>` (immutable, sorted, `Ord`-based) from the standard library. For mutable hash maps, use `System.Collections.Generic.Dictionary`. `Map` is the idiomatic choice for pure functional code.

## Example

```fsharp
open Microsoft.FSharp.Collections

// Create an immutable Map
let m = Map.ofList [("alice", 30); ("bob", 25); ("carol", 28)]

// Access (returns option)
Map.tryFind "alice" m   // Some 30
Map.tryFind "dave"  m   // None

// Direct access (throws if missing)
m.["alice"]   // 30

// Add / update (returns new map)
let m2 = Map.add "dave" 22 m

// Remove
let m3 = Map.remove "bob" m

// Check existence
Map.containsKey "alice" m   // true

// Iteration
m |> Map.iter (fun k v -> printfn "%s -> %d" k v)

// Transformation
let doubled = Map.map (fun _ v -> v * 2) m

// Filter
let seniors = Map.filter (fun _ v -> v >= 28) m

// Fold
let totalAge = Map.fold (fun acc _ v -> acc + v) 0 m

// Conversion
Map.toList m   // [("alice", 30); ("bob", 25); ("carol", 28)]
Map.keys m     // seq ["alice"; "bob"; "carol"]

// Mutable Dictionary (for .NET interop or performance)
open System.Collections.Generic
let dict = Dictionary<string, int>()
dict.["alice"] <- 30
dict.["bob"]   <- 25
dict.TryGetValue("alice")   // (true, 30)
```

## Gotchas

- `Map` is sorted by key (requires `Comparison`); for unsorted hash maps with better average performance, use `Dictionary` or a third-party `HashMap`
- `Map.tryFind` returns `'V option`; use `Map.find` only when you're certain the key exists (it throws on miss)
- Immutable `Map` operations create a new map; this is O(log n) per operation due to the balanced BST structure
