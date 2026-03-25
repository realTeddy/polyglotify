---
title: "Classes"
language: "fsharp"
feature: "classes"
category: "oop"
applicable: true
---

F# supports full OOP with classes, but the idiomatic style prefers records, discriminated unions, and modules. Classes are primarily used for .NET interop, defining custom exceptions, and implementing .NET interfaces.

## Example

```fsharp
// Class definition
type BankAccount(owner: string, initialBalance: float) =
    // Private mutable field
    let mutable balance = initialBalance

    // Primary constructor body
    do
        if initialBalance < 0.0 then
            failwith "Initial balance cannot be negative"

    // Properties
    member _.Owner   = owner
    member _.Balance = balance

    // Methods
    member _.Deposit(amount: float) =
        if amount <= 0.0 then failwith "Amount must be positive"
        balance <- balance + amount

    member _.Withdraw(amount: float) =
        if amount > balance then Error "Insufficient funds"
        else
            balance <- balance - amount
            Ok balance

    // Static member
    static member Create(owner, amount) =
        BankAccount(owner, amount)

    // Override ToString
    override _.ToString() =
        sprintf "Account[%s: %.2f]" owner balance

// Usage
let acc = BankAccount("Alice", 100.0)
acc.Deposit(50.0)
match acc.Withdraw(30.0) do
| Ok remaining -> printfn "Remaining: %.2f" remaining
| Error msg    -> printfn "Error: %s" msg

printfn "%s" (string acc)   // Account[Alice: 120.00]

// Secondary constructor
type Person(name: string) =
    new(name, age: int) = Person(name)   // delegates to primary
    member _.Name = name
```

## Gotchas

- F# classes use `member this.Method()` or `member _.Method()` (for methods that don't use `self`)
- Fields must be `let mutable` inside the class body; properties access them via members
- The idiomatic F# approach is records + module functions; use classes mainly for .NET interop requirements
