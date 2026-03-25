---
title: "Structs & Classes"
language: "fsharp"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

F# provides **record types** (immutable named tuples with structural equality) and **struct types** (`[<Struct>]`) for stack-allocated value types. Classes are also supported for OOP and .NET interop but are less idiomatic than records in pure F# code.

## Example

```fsharp
// Record type (immutable, structural equality)
type Person = {
    Name: string
    Age:  int
    Email: string
}

// Construction
let alice = { Name = "Alice"; Age = 30; Email = "alice@example.com" }

// Access
alice.Name   // "Alice"

// Immutable update (copy with changes)
let olderAlice = { alice with Age = 31 }

// Pattern matching on records
let greet { Name = n; Age = a } =
    sprintf "Hi %s, you are %d" n a

// Struct record (value type, no heap allocation)
[<Struct>]
type Point = { X: float; Y: float }

let p = { X = 3.0; Y = 4.0 }

// Discriminated union (tagged union / ADT)
type Shape =
    | Circle    of Radius: float
    | Rectangle of Width: float * Height: float

let area = function
    | Circle r         -> System.Math.PI * r * r
    | Rectangle(w, h)  -> w * h

// Class (for OOP / .NET interop)
type Counter(initial: int) =
    let mutable value = initial

    member _.Value = value

    member _.Increment() =
        value <- value + 1

    member _.Reset() =
        value <- 0

let c = Counter(10)
c.Increment()
printfn "%d" c.Value   // 11
```

## Gotchas

- Record `{ a with field = value }` creates a new record; original is unchanged
- Struct records (`[<Struct>]`) cannot be mutated and have no identity equality; use them for small, frequently allocated value types
- Classes should be used sparingly in F#; prefer records and discriminated unions for domain modelling
