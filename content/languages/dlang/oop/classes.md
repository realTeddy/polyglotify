---
title: "Classes"
language: "dlang"
feature: "classes"
category: "oop"
applicable: true
---

D classes are reference types with single inheritance (from `Object` implicitly), virtual dispatch by default, constructors/destructors, access control (`public`, `protected`, `private`, `package`), and support for interfaces. Methods are virtual unless marked `final`. D classes are always heap-allocated via the GC (or `core.memory` for manual management).

## Example

```d
import std.stdio;

class BankAccount
{
    private string owner;
    private double balance;

    // Constructor
    this(string owner, double initialBalance = 0)
    {
        this.owner   = owner;
        this.balance = initialBalance;
    }

    // Destructor
    ~this() { writeln("Account closed for ", owner); }

    void deposit(double amount)
    {
        assert(amount > 0, "Amount must be positive");
        balance += amount;
    }

    bool withdraw(double amount)
    {
        if (amount > balance) return false;
        balance -= amount;
        return true;
    }

    // Property getter
    @property double currentBalance() const { return balance; }

    // Override toString from Object
    override string toString() const
    {
        import std.format : format;
        return format("%s: $%.2f", owner, balance);
    }
}

void main()
{
    auto acc = new BankAccount("Alice", 500.0);
    acc.deposit(250.0);
    writeln(acc.withdraw(100.0));   // true
    writeln(acc.currentBalance);    // 650.0
    writeln(acc);                   // Alice: $650.00
}
```

## Gotchas

- All methods are virtual by default; use `final` to prevent overriding and enable inlining.
- `new` allocates on the GC heap; there is no value-type class (use `struct` instead).
- D classes do NOT have constructors that auto-initialise fields — all fields get `.init` unless explicitly set in `this(...)`.
- `Object` is the implicit base of all classes and provides `toString`, `opEquals`, `toHash`, and `opCmp`.
