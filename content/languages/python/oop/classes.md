---
title: "Classes"
language: "python"
feature: "classes"
category: "oop"
applicable: true
---

Python classes are defined with the `class` keyword. The constructor is `__init__`, and all instance methods receive `self` as their first parameter. Python supports public, name-mangled private (`__attr`), and convention-private (`_attr`) attributes — there is no strict access control.

## Example

```python
class BankAccount:
    # Class variable (shared by all instances)
    interest_rate: float = 0.02

    def __init__(self, owner: str, balance: float = 0.0) -> None:
        self.owner = owner          # public
        self._balance = balance     # convention: private

    # Instance method
    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount

    # Property — controlled attribute access
    @property
    def balance(self) -> float:
        return self._balance

    # Class method — receives the class, not an instance
    @classmethod
    def from_dict(cls, data: dict) -> "BankAccount":
        return cls(data["owner"], data.get("balance", 0.0))

    # Static method — no implicit first argument
    @staticmethod
    def validate_amount(amount: float) -> bool:
        return amount > 0

    def __repr__(self) -> str:
        return f"BankAccount(owner={self.owner!r}, balance={self._balance})"

acc = BankAccount("Alice", 100)
acc.deposit(50)
print(acc.balance)   # 150
print(acc)           # BankAccount(owner='Alice', balance=150)
```

## Gotchas

- Forgetting `self` as the first parameter of an instance method is a very common `TypeError`
- Class variables are shared across all instances — mutating a mutable class variable from one instance affects all instances
- `__attr` (double leading underscore) triggers name mangling to `_ClassName__attr`, which is for avoiding accidental overrides in subclasses, not true privacy
