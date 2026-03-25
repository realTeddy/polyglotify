---
title: "Arrays & Lists"
language: "fsharp"
feature: "arrays"
category: "data-structures"
applicable: true
---

F# has two primary sequential types: **list** (immutable linked list, idiomatic) and **array** (mutable, 0-indexed, .NET array for performance). `Array`, `List`, and `Seq` modules provide parallel APIs. Lists use `[1;2;3]` syntax; arrays use `[|1;2;3|]`.

## Example

```fsharp
// Immutable list
let lst = [1; 2; 3; 4; 5]

// Cons (prepend, O(1))
let lst2 = 0 :: lst   // [0; 1; 2; 3; 4; 5]

// Append (O(n))
let lst3 = lst @ [6; 7]

// Pattern matching on lists
let rec sum = function
    | []     -> 0
    | h :: t -> h + sum t

let rec length = function
    | []     -> 0
    | _ :: t -> 1 + length t

// List operations
List.head lst         // 1
List.tail lst         // [2;3;4;5]
List.length lst       // 5
List.map ((*) 2) lst  // [2;4;6;8;10]
List.filter odd lst   // [1;3;5]
List.fold (+) 0 lst   // 15
List.sort [3;1;4;1]   // [1;1;3;4]
List.zip [1;2] [3;4]  // [(1,3);(2,4)]

// Mutable array (O(1) indexed access)
let arr = [| 10; 20; 30; 40 |]
arr.[1]         // 20  (0-indexed)
arr.[2] <- 99   // mutation
Array.length arr   // 4

// Array operations
Array.map ((*) 2) arr
Array.filter (fun x -> x > 20) arr

// Sequence (lazy, works on any IEnumerable)
let sq = seq { for x in 1..10 do if x % 2 = 0 then yield x }
Seq.toList sq   // [2;4;6;8;10]
```

## Gotchas

- Lists use `;` as separator (not `,`); commas create tuples in F#: `[1, 2]` is `[(1, 2)]`
- `List.head` and `List.tail` throw on empty lists; use `match` for safe access
- Arrays are mutable by default; use `.[]` for indexed access (F# 6+ simplified: `arr[i]`)
