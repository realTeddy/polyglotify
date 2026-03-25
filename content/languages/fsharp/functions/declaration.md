---
title: "Function Declaration"
language: "fsharp"
feature: "declaration"
category: "functions"
applicable: true
---

Functions in F# are defined with `let`. They are first-class values, curried by default, and can be recursive with `let rec`. Anonymous functions use `fun` keyword. Functions in modules are the primary code organization mechanism.

## Example

```fsharp
// Simple function
let greet name =
    sprintf "Hello, %s!" name

printfn "%s" (greet "Alice")   // Hello, Alice!

// With explicit type annotations
let add (x: int) (y: int): int =
    x + y

// Anonymous function (lambda)
let double = fun x -> x * 2

// Concise lambda with function composition
let triple = (*) 3    // partial application

// Recursive function
let rec factorial n =
    if n <= 1 then 1
    else n * factorial (n - 1)

// Mutually recursive functions
let rec isEven n = if n = 0 then true else isOdd (n - 1)
and     isOdd  n = if n = 0 then false else isEven (n - 1)

// Pattern matching in function definition
let rec length = function
    | []     -> 0
    | _ :: t -> 1 + length t

// Local function
let hypotenuse a b =
    let square x = x * x    // local function
    sqrt (square a + square b)

// Inline function (performance hint)
let inline square x = x * x
```

## Gotchas

- All functions are curried: `let add x y = x + y` is `let add = fun x -> fun y -> x + y` under the hood
- `let rec` is required for self-referential functions; plain `let` cannot refer to itself
- `function` is shorthand for `fun x -> match x with`; useful for pattern-matching functions
