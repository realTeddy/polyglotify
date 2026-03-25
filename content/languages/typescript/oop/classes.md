---
title: "Classes"
language: "typescript"
feature: "classes"
category: "oop"
applicable: true
---

TypeScript classes are syntactic sugar over JavaScript's prototype-based inheritance, augmented with access modifiers, parameter properties, abstract classes, and decorators. A class body can declare instance fields, constructors, methods, getters/setters, and static members. TypeScript enforces access modifiers at compile time, while native `#private` fields provide runtime enforcement.

## Example

```typescript
class BankAccount {
  private balance: number;
  readonly owner: string;
  static interestRate = 0.05;

  constructor(owner: string, initialBalance: number = 0) {
    this.owner = owner;
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount > this.balance) throw new Error("Insufficient funds");
    this.balance -= amount;
  }

  get currentBalance(): number {
    return this.balance;
  }

  toString(): string {
    return `BankAccount(${this.owner}, $${this.balance.toFixed(2)})`;
  }
}

const account = new BankAccount("Alice", 1000);
account.deposit(500);
account.withdraw(200);
console.log(account.currentBalance); // 1300
console.log(String(account));        // BankAccount(Alice, $1300.00)
```

## Gotchas

- Arrow function methods (e.g., `method = () => {}`) bind `this` lexically but create a new function per instance rather than sharing one on the prototype, increasing memory usage.
- `abstract` classes cannot be instantiated directly; they are blueprints that subclasses must implement.
