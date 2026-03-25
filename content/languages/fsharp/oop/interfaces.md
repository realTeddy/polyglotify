---
title: "Interfaces & Traits"
language: "fsharp"
feature: "interfaces"
category: "oop"
applicable: true
---

F# supports .NET interfaces with `interface`/`with` syntax and object expressions for anonymous implementations. Statically Resolved Type Parameters (SRTPs) provide compile-time duck typing similar to Haskell type classes. Interfaces bridge F# to the .NET ecosystem.

## Example

```fsharp
// Define an interface
type IShape =
    abstract member Area:      float
    abstract member Perimeter: float
    abstract member Describe:  unit -> string

// Implement via class
type Circle(r: float) =
    interface IShape with
        member _.Area      = System.Math.PI * r * r
        member _.Perimeter = 2.0 * System.Math.PI * r
        member _.Describe() = sprintf "Circle(r=%.1f)" r

type Rectangle(w: float, h: float) =
    interface IShape with
        member _.Area      = w * h
        member _.Perimeter = 2.0 * (w + h)
        member _.Describe() = sprintf "Rect(%.1f x %.1f)" w h

// Polymorphic usage
let printInfo (shape: IShape) =
    printfn "Area: %.2f  %s" shape.Area (shape.Describe())

printInfo (Circle 5.0)
printInfo (Rectangle(4.0, 6.0))

// Object expression: anonymous interface implementation
let makeShape (areaFn: unit -> float) : IShape =
    { new IShape with
        member _.Area      = areaFn()
        member _.Perimeter = 0.0
        member _.Describe() = "custom" }

// Statically Resolved Type Parameters (SRTP) — compile-time duck typing
let inline measure (x: ^T) =
    (^T : (member Length: int) x)   // requires Length property at compile time
```

## Gotchas

- Interface members must be accessed via the interface type; cast with `:>` to access them: `(circle :> IShape).Area`
- Object expressions `{ new IFoo with ... }` create anonymous implementations without defining a class
- SRTPs are a powerful but advanced feature; they require `inline` and are resolved at compile time, not at runtime
