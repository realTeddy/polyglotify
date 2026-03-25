---
title: "Closures & Lambdas"
language: "fsharp"
feature: "closures"
category: "functions"
applicable: true
---

F# functions are closures — `fun` expressions capture the enclosing lexical scope. Partial application of curried functions implicitly creates closures. Since F# values are immutable by default, closures behave predictably.

## Example

```fsharp
// Lambda (anonymous function)
let double = fun x -> x * 2
let add    = fun x y -> x + y

// Closure capturing outer binding
let makeAdder n = fun x -> x + n

let add5  = makeAdder 5
let add10 = makeAdder 10
printfn "%d" (add5 3)    // 8
printfn "%d" (add10 3)   // 13

// Partial application creates closures implicitly
let multiply factor x = factor * x

let triple = multiply 3   // closes over factor = 3
let double' = multiply 2

printfn "%d" (triple 7)   // 21

// Closures in higher-order functions
let applyTwice f x = f (f x)
printfn "%d" (applyTwice (add 3) 10)   // 16

// Closure over mutable state (explicit, use sparingly)
let makeCounter () =
    let mutable n = 0
    fun () ->
        n <- n + 1
        n

let counter = makeCounter()
printfn "%d" (counter())   // 1
printfn "%d" (counter())   // 2
printfn "%d" (counter())   // 3

// Common usage in pipelines
[1..10]
|> List.filter (fun x -> x % 2 = 0)
|> List.map    (fun x -> x * x)
|> List.sum
|> printfn "Sum of even squares: %d"
```

## Gotchas

- Closures over `mutable` variables capture the variable by reference — the closure sees the current value, not the value at creation time
- `fun x y -> ...` is curried: it's `fun x -> fun y -> ...` and can be partially applied
- F# compiler may warn about value restrictions if a generic lambda is bound at the top level; add type annotations
