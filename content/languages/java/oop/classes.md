---
title: "Classes"
language: "java"
feature: "classes"
category: "oop"
applicable: true
---

Java classes are the fundamental unit of abstraction. A class encapsulates fields (state) and methods (behaviour). Access is controlled via `public`, `protected`, package-private (default), and `private` modifiers. Java supports single inheritance and multiple interface implementation. Modern Java encourages immutability: prefer `final` fields, avoid setters where possible, and use records for pure data.

## Example

```java
public class BankAccount {
    private final String owner;
    private double balance;
    private static int instanceCount = 0;

    public BankAccount(String owner, double initialBalance) {
        if (initialBalance < 0) throw new IllegalArgumentException("Balance cannot be negative");
        this.owner = owner;
        this.balance = initialBalance;
        instanceCount++;
    }

    // Factory method pattern
    public static BankAccount empty(String owner) {
        return new BankAccount(owner, 0.0);
    }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > balance) throw new IllegalStateException("Insufficient funds");
        balance -= amount;
    }

    // Getter (no setter — balance only changes via deposit/withdraw)
    public double getBalance() { return balance; }
    public String getOwner() { return owner; }

    public static int getInstanceCount() { return instanceCount; }

    @Override
    public String toString() {
        return String.format("BankAccount[owner=%s, balance=%.2f]", owner, balance);
    }
}
```

## Gotchas

- Prefer composition over inheritance for code reuse; deep inheritance hierarchies become brittle. Use interfaces to define behaviour contracts.
- Mutable `static` fields (like `instanceCount` above) are shared across all threads — use `AtomicInteger` or synchronization in concurrent code.
