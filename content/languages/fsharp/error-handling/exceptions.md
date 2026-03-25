---
title: "Exceptions & Try/Catch"
language: "fsharp"
feature: "exceptions"
category: "error-handling"
applicable: true
---

F# supports .NET exceptions via `try/with` and `try/finally`. `failwith` and `failwithf` raise `System.Exception`. Custom exceptions are defined with `exception` keyword. Idiomatic F# prefers `Result` and `Option` over exceptions for expected errors.

## Example

```fsharp
// try/with (catch)
let safeDivide x y =
    try
        x / y |> Ok
    with
    | :? System.DivideByZeroException -> Error "division by zero"
    | ex -> Error (ex.Message)

// try/finally (cleanup, always runs)
let readFile path =
    let reader = System.IO.File.OpenText(path)
    try
        reader.ReadToEnd()
    finally
        reader.Close()   // always executed

// use keyword (preferred over try/finally for IDisposable)
let readFileSafe path =
    try
        use reader = System.IO.File.OpenText(path)
        Ok (reader.ReadToEnd())
    with
    | :? System.IO.FileNotFoundException -> Error "file not found"
    | ex -> Error ex.Message

// Custom exception type
exception ValidationError of field: string * message: string

let validate age =
    if age < 0 then
        raise (ValidationError("age", "must be non-negative"))
    age

try
    validate -1 |> ignore
with
| ValidationError(field, msg) ->
    printfn "Validation failed: %s - %s" field msg

// failwith (raises System.Exception)
let assertPositive n =
    if n <= 0 then failwith "Expected positive number"
    n

// failwithf (formatted message)
let parseAge s =
    match System.Int32.TryParse(s) with
    | true, n when n >= 0 -> n
    | true, n  -> failwithf "Age %d is negative" n
    | false, _ -> failwithf "Cannot parse '%s' as age" s
```

## Gotchas

- F# uses `:?` for type-testing in `with` patterns: `| :? System.ArgumentException as ex ->`
- `failwith` is for unrecoverable programming errors; use `Result` for expected failures
- `use` bindings automatically call `Dispose()` at the end of scope — prefer them over `try/finally` for IDisposable
