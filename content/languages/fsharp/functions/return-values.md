---
title: "Return Values"
language: "fsharp"
feature: "return-values"
category: "functions"
applicable: true
---

F# functions return the value of their last expression. There is no `return` keyword in functional code. Multiple values are returned as tuples. The `Result<'T,'E>` type is the idiomatic error-return type. `option` is used for nullable-style returns.

## Example

```fsharp
// Last expression is the return value
let add x y =
    let result = x + y
    result    // returned

// Multiple values via tuple
let minMax xs =
    List.min xs, List.max xs   // returns (min, max) tuple

let lo, hi = minMax [3; 1; 4; 1; 5; 9]
printfn "%d %d" lo hi   // 1 9

// Option for nullable returns
let tryFind pred xs =
    List.tryFind pred xs   // returns Some x or None

match tryFind (fun x -> x > 3) [1;2;3;4;5] with
| Some v -> printfn "Found: %d" v
| None   -> printfn "Not found"

// Result<'T,'E> for error returns (F# built-in)
let safeDivide x y =
    if y = 0 then Error "division by zero"
    else Ok (x / y)

match safeDivide 10 2 with
| Ok value    -> printfn "Result: %d" value
| Error msg   -> printfn "Error: %s" msg

// Chaining Results with Result.map / Result.bind
let parseAndDouble s =
    match System.Int32.TryParse(s) with
    | true,  n -> Ok n
    | false, _ -> Error (sprintf "Not an integer: %s" s)
    |> Result.map ((*) 2)

printfn "%A" (parseAndDouble "21")   // Ok 42
printfn "%A" (parseAndDouble "x")    // Error "Not an integer: x"
```

## Gotchas

- Unlike C#, there is no `return` keyword in functional F# code; the last expression is the result
- `unit` is the return type of functions that only have side effects (like `printfn`); it's similar to `void`
- Tuples larger than 3 elements should usually be replaced with a named record for clarity
