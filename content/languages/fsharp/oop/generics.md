---
title: "Generics"
language: "fsharp"
feature: "generics"
category: "oop"
applicable: true
---

F# has full support for .NET generics, plus its own more powerful **Statically Resolved Type Parameters** (SRTPs). Generic type parameters use `'T` notation. F#'s type inference means you rarely need to write type parameters explicitly.

## Example

```fsharp
// Generic function (inferred)
let identity x = x      // 'T -> 'T
let swap (x, y) = (y, x)  // 'a * 'b -> 'b * 'a

// Explicit generic parameter
let first<'T> (lst: 'T list) =
    List.head lst

// Generic data type
type Pair<'A, 'B> = { First: 'A; Second: 'B }

let p = { First = 1; Second = "one" }
printfn "%d %s" p.First p.Second

// Generic discriminated union
type Result<'T, 'E> =
    | Ok of 'T
    | Error of 'E

// Constrained generic (requires comparison)
let maxOf (x: 'T) (y: 'T) : 'T when 'T : comparison =
    if x > y then x else y

maxOf 3 5       // 5
maxOf "a" "b"   // "b"

// Generic class
type Stack<'T>() =
    let mutable items: 'T list = []
    member _.Push(x: 'T) = items <- x :: items
    member _.Pop() =
        match items with
        | []     -> None
        | h :: t -> items <- t; Some h
    member _.Count = List.length items

let intStack = Stack<int>()
intStack.Push(1)
intStack.Push(2)
printfn "%A" (intStack.Pop())   // Some 2

// Inline with SRTP constraint (more powerful than normal generics)
let inline add (x: ^T) (y: ^T) : ^T =
    (^T : (static member (+) : ^T * ^T -> ^T) (x, y))
```

## Gotchas

- `'T` with a lower-case prefix is a generic type parameter; `when 'T : ...` adds constraints
- Automatic generalisation means F# often infers generic types without annotation; type errors may surface in unexpected places when generalisation is blocked by value restriction
- SRTPs (with `^T`) are more flexible than regular generics but produce less readable error messages; use them only when needed
