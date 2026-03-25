---
title: "Inheritance"
language: "fsharp"
feature: "inheritance"
category: "oop"
applicable: true
---

F# supports single class inheritance with `inherit`. However, discriminated unions and interfaces are preferred over inheritance hierarchies for most domain modelling. Inheritance is mainly used for .NET framework integration and abstract base classes.

## Example

```fsharp
// Abstract base class
[<AbstractClass>]
type Animal(name: string) =
    member _.Name = name
    abstract member Speak: unit -> string
    member this.Describe() =
        sprintf "%s says: %s" this.Name (this.Speak())

// Concrete subclass
type Dog(name: string) =
    inherit Animal(name)
    override _.Speak() = "Woof!"

type Cat(name: string) =
    inherit Animal(name)
    override _.Speak() = "Meow!"

// Usage
let animals: Animal list = [Dog("Rex"); Cat("Whiskers")]
animals |> List.iter (fun a -> printfn "%s" (a.Describe()))

// Call base method
type Labrador(name: string) =
    inherit Dog(name)
    override this.Speak() =
        base.Speak() + " Woof!"   // call base

// Discriminated union (preferred over inheritance for variants)
type Shape =
    | Circle    of float
    | Rectangle of float * float
    | Triangle  of float * float

let area = function
    | Circle r         -> System.Math.PI * r * r
    | Rectangle(w, h)  -> w * h
    | Triangle(b, h)   -> 0.5 * b * h

// All cases handled at compile time — no missing-case bugs
```

## Gotchas

- F# only supports **single** inheritance; use interfaces for multiple behaviour contracts
- `base.Method()` calls the parent method; useful for extending (not replacing) behaviour
- Discriminated unions are exhaustively checked at compile time, unlike class hierarchies where adding a new subclass can silently break existing `match` or `switch` statements
