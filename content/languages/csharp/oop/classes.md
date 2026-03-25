---
title: "Classes"
language: "csharp"
feature: "classes"
category: "oop"
applicable: true
---

C# classes are reference types that support encapsulation, inheritance, and polymorphism. Members have access modifiers: `public`, `protected`, `internal`, `private`, and combinations (`protected internal`, `private protected`). Properties (get/set/init) replace Java-style getters/setters. C# 12 primary constructors reduce constructor boilerplate. Static members belong to the class itself.

## Example

```csharp
public class BankAccount {
    private decimal _balance;
    private static int _instanceCount;

    // Primary constructor (C# 12)
    // For classes with logic, traditional constructor is clearer:
    public BankAccount(string owner, decimal initialBalance = 0m) {
        if (initialBalance < 0) throw new ArgumentOutOfRangeException(nameof(initialBalance));
        Owner = owner;
        _balance = initialBalance;
        _instanceCount++;
    }

    // Auto-property with init-only setter
    public string Owner { get; init; }

    // Computed property
    public decimal Balance => _balance;

    public static int InstanceCount => _instanceCount;

    public void Deposit(decimal amount) {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(amount);
        _balance += amount;
    }

    public bool TryWithdraw(decimal amount) {
        if (amount > _balance) return false;
        _balance -= amount;
        return true;
    }

    public override string ToString() =>
        $"BankAccount[{Owner}, Balance={Balance:C}]";
}

var account = new BankAccount("Alice", 1000m);
account.Deposit(500m);
Console.WriteLine(account.TryWithdraw(200m)); // True
Console.WriteLine(account.Balance);            // 1300
```

## Gotchas

- Properties with only a getter are not automatically immutable unless backed by a `readonly` field or declared as `{ get; init; }`. A computed `get`-only property recalculates on every access.
- `init`-only properties can be set in object initializer syntax but not afterwards — this enables immutable-by-default records without requiring a full constructor.
