---
title: "Classes"
language: "dart"
feature: "classes"
category: "oop"
applicable: true
---

Dart is fully object-oriented. Classes support constructors (including named, factory, and const constructors), instance and static members, getters/setters, and operator overloading. Initializer lists and `this.` shorthand simplify constructors.

## Example

```dart
class BankAccount {
  final String owner;
  double _balance;  // private (library-private, not class-private)

  // Shorthand constructor
  BankAccount(this.owner, [double initial = 0]) : _balance = initial;

  // Named constructor
  BankAccount.empty(String owner) : this(owner, 0);

  // Getter
  double get balance => _balance;

  void deposit(double amount) {
    if (amount <= 0) throw ArgumentError('Amount must be positive');
    _balance += amount;
  }

  bool withdraw(double amount) {
    if (amount > _balance) return false;
    _balance -= amount;
    return true;
  }

  @override
  String toString() => 'BankAccount($owner: \$$_balance)';

  // Factory constructor
  factory BankAccount.fromJson(Map<String, dynamic> json) {
    return BankAccount(json['owner'] as String, json['balance'] as double);
  }
}
```

## Gotchas

- Dart privacy is library-level, not class-level: a `_name` field is accessible anywhere in the same file/library
- `factory` constructors can return an existing instance (useful for caching/singletons)
- `const` constructors require all fields to be `final` and only use compile-time constants
