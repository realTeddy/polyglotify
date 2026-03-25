---
title: "Tuples"
language: "fsharp"
feature: "tuples"
category: "data-structures"
applicable: true
---

Tuples are built-in, immutable, heterogeneous collections. They are created with comma syntax and are commonly used for multiple return values. Pattern matching and `fst`/`snd` (for pairs) deconstruct them.

## Example

```fsharp
// 2-tuple (pair)
let point: int * int = (3, 4)

// Access
fst point   // 3
snd point   // 4

// 3-tuple
let rgb: int * int * int = (255, 128, 0)

// Heterogeneous tuple
let person: string * int * bool = ("Alice", 30, true)

// Pattern matching (most common)
let describe (name, age, _) =
    sprintf "%s is %d years old" name age

printfn "%s" (describe ("Alice", 30, true))

// Multiple return values
let minMax xs = List.min xs, List.max xs   // returns (int * int)

let lo, hi = minMax [3; 1; 4; 1; 5]
printfn "%d %d" lo hi   // 1 5

// Nested tuples
let nested = ((1, 2), (3, 4))
let (a, b), (c, d) = nested
printfn "%d %d %d %d" a b c d   // 1 2 3 4

// Tuple in match
let classify pair =
    match pair with
    | (0, 0) -> "origin"
    | (x, 0) -> sprintf "on x-axis at %d" x
    | (0, y) -> sprintf "on y-axis at %d" y
    | (x, y) -> sprintf "at (%d, %d)" x y

// System.Int32.TryParse returns a tuple
let tryParseInt s =
    match System.Int32.TryParse(s) with
    | true,  n -> Some n
    | false, _ -> None
```

## Gotchas

- Commas create tuples in F#, not a list separator; use `;` in list literals: `[1;2;3]` not `[1,2,3]`
- Struct tuples `struct (a, b)` (ValueTuple) are available for .NET interop and reduce allocations
- For more than 3–4 elements, use a named record instead of a tuple for better readability
