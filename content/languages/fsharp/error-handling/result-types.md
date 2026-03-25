---
title: "Result Types"
language: "fsharp"
feature: "result-types"
category: "error-handling"
applicable: true
---

F# has `Result<'T,'TError>` built into the standard library (`Ok` / `Error`). The `Result` module provides `map`, `bind`, `mapError`, and more. `Option<'T>` handles nullable values. Computation expressions (`result { ... }`) provide a clean chaining syntax.

## Example

```fsharp
// Built-in Result<'T, 'E>
let safeDivide (x: float) y =
    if y = 0.0 then Error "division by zero"
    else Ok (x / y)

let parseFloat s =
    match System.Double.TryParse(s) with
    | true, n  -> Ok n
    | false, _ -> Error (sprintf "Not a number: %s" s)

// Result.map: transform the Ok value
let doubled = safeDivide 10.0 2.0 |> Result.map ((*) 2.0)
// Ok 10.0

// Result.bind: chain fallible operations
let processInput s =
    s
    |> parseFloat
    |> Result.bind (safeDivide 100.0)
    |> Result.map  (sprintf "Result: %.2f")

printfn "%A" (processInput "4")    // Ok "Result: 25.00"
printfn "%A" (processInput "abc")  // Error "Not a number: abc"
printfn "%A" (processInput "0")    // Error "division by zero"

// Result.mapError: transform the Error value
let friendly =
    safeDivide 10.0 0.0
    |> Result.mapError (fun e -> sprintf "Error: %s" e)

// Collecting multiple errors
let validateAge age =
    if age < 0   then Error "negative age"
    elif age > 150 then Error "unrealistic age"
    else Ok age

// Result computation expression (via a helper or library like FsToolkit)
// result {
//     let! n = parseFloat "10"
//     let! r = safeDivide 100.0 n
//     return r
// }

// Pattern match
match safeDivide 10.0 3.0 with
| Ok value  -> printfn "%.4f" value
| Error msg -> printfn "Error: %s" msg
```

## Gotchas

- `Result.bind` is the monadic bind; use it to chain operations where each step can fail
- F#'s built-in `Result` has no `sequence` or `traverse`; use `FsToolkit.ErrorHandling` for more advanced composition
- Prefer `Result` over exceptions for expected failures and `Option` when absence is not an error
