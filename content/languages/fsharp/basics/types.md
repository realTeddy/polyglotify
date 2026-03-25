---
title: "Types & Type Systems"
language: "fsharp"
feature: "types"
category: "basics"
applicable: true
---

F# has a strong, static type system with Hindley-Milner type inference. It supports algebraic data types (discriminated unions), records, tuples, and .NET types. The type system prevents null reference errors by default — use `option` for nullable values.

## Example

```fsharp
// Basic types
let n: int = 42
let f: float = 3.14
let s: string = "hello"
let b: bool = true

// Type inference (types are almost always inferred)
let greeting = "Hello"    // string
let count = 10            // int

// Option type (no null by default)
let found: int option = Some 42
let missing: int option = None

// Discriminated union (algebraic data type)
type Shape =
    | Circle of radius: float
    | Rectangle of width: float * height: float
    | Triangle of base: float * height: float

let circle = Circle 5.0
let rect   = Rectangle(4.0, 6.0)

// Pattern match on union
let area shape =
    match shape with
    | Circle r          -> System.Math.PI * r * r
    | Rectangle(w, h)   -> w * h
    | Triangle(b, h)    -> 0.5 * b * h

// Record type
type Person = { Name: string; Age: int }
let alice = { Name = "Alice"; Age = 30 }

// Generic type
type Result<'T, 'E> =
    | Ok  of 'T
    | Error of 'E
```

## Gotchas

- F# uses `option` instead of null; `null` exists for .NET interop but should be avoided in pure F# code
- Integer literals are `int` by default; use suffixes for other numeric types: `3.0` (float), `3L` (int64), `3uy` (byte)
- Generic type parameters use a single-quote prefix: `'T`, `'a`, `'key`
