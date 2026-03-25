---
title: "Parameters & Arguments"
language: "fsharp"
feature: "parameters"
category: "functions"
applicable: true
---

F# functions are curried by default — every function takes one argument. Multi-parameter functions are curried automatically. Optional parameters use the `?` prefix and are typed as `'T option`. Tuple parameters `(x, y)` can be used for interop with .NET.

## Example

```fsharp
// Curried parameters (idiomatic F#)
let add x y = x + y       // type: int -> int -> int
let add5 = add 5           // partial application: int -> int
printfn "%d" (add5 3)     // 8

// Tuple parameters (non-curried, for .NET interop)
let addPair (x, y) = x + y   // type: int * int -> int

// Pattern matching in parameters
let fst (x, _) = x
let snd (_, y) = y

// Destructuring record in parameter
type Point = { X: float; Y: float }
let length { X = x; Y = y } = sqrt (x*x + y*y)

// Optional parameters (in class members, not plain functions)
type Greeter() =
    member _.Greet(name: string, ?greeting: string) =
        let g = defaultArg greeting "Hello"
        sprintf "%s, %s!" g name

let gr = Greeter()
printfn "%s" (gr.Greet("Alice"))          // Hello, Alice!
printfn "%s" (gr.Greet("Bob", "Hi"))      // Hi, Bob!

// defaultArg: provide default for option parameter
let connect host port =
    let p = defaultArg port 80
    sprintf "%s:%d" host p

connect "localhost" (Some 3000)   // localhost:3000
connect "localhost" None          // localhost:80

// Applying a function to a list
List.map (add 10) [1;2;3;4]   // [11;12;13;14]
```

## Gotchas

- Curried `let add x y` and tuple `let add (x, y)` are different types: `int -> int -> int` vs `int * int -> int`
- `?param` optional parameters only work in class/object members, not in plain `let` functions
- `defaultArg` unwraps `'T option` with a default; it's the F# equivalent of `x ?? default`
