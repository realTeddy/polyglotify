---
title: "Common Patterns"
language: "fsharp"
feature: "common-patterns"
category: "idioms"
applicable: true
---

F# idioms are shaped by immutability, algebraic types, the pipeline operator, and the type system. Key patterns include railway-oriented programming with `Result`, discriminated unions for domain modelling, computation expressions, and the active patterns feature.

## Example

```fsharp
// 1. Railway-oriented programming (Result chaining)
let validateName (s: string) =
    if s = "" then Error "Name is empty"
    else Ok s

let validateAge n =
    if n < 0 then Error "Age is negative"
    else Ok n

let createUser name age =
    validateName name
    |> Result.bind (fun n ->
        validateAge age
        |> Result.map (fun a -> { Name = n; Age = a }))

// 2. Discriminated union for domain modelling
type PaymentMethod =
    | CreditCard of cardNumber: string * expiry: string
    | BankTransfer of iban: string
    | Crypto of walletAddress: string

let process payment =
    match payment with
    | CreditCard(num, exp) -> sprintf "Card %s exp %s" num exp
    | BankTransfer iban    -> sprintf "Transfer to %s" iban
    | Crypto addr          -> sprintf "Crypto to %s" addr

// 3. Pipeline for data transformation
let processOrders =
    orders
    |> List.filter (fun o -> o.Status = Active)
    |> List.sortBy (fun o -> o.Date)
    |> List.map    (fun o -> o.Total)
    |> List.sum

// 4. Active patterns for complex pattern matching
let (|Even|Odd|) n = if n % 2 = 0 then Even else Odd
let (|Positive|Negative|Zero|) n =
    if n > 0 then Positive else if n < 0 then Negative else Zero

let describe n =
    match n with
    | Positive & Even -> "positive even"
    | Positive & Odd  -> "positive odd"
    | Negative        -> "negative"
    | Zero            -> "zero"

// 5. Computation expressions
let maybe = option {
    let! x = Some 5
    let! y = Some 3
    return x + y
}   // Some 8
```

## Gotchas

- `Result.bind` is sequential — it short-circuits on the first `Error`; for parallel validation (collecting all errors), use `FsToolkit.ErrorHandling`
- Active patterns are powerful but can be hard to debug; keep them focused and well-named
- The pipeline `|>` works best when functions take the data as their last argument — F# library functions are designed this way
