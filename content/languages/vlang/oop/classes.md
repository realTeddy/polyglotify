---
title: "Classes"
language: "vlang"
feature: "classes"
category: "oop"
applicable: false
---

V does not have classes. The language uses structs with methods as its primary abstraction for combining data and behavior. This is a deliberate design choice: V favors simplicity and avoids the complexity of class hierarchies. Methods are defined as functions with a receiver type.

## Example

```v
// V equivalent of a class: struct + methods

struct BankAccount {
    owner   string
mut:
    balance f64
}

fn new_bank_account(owner string, initial f64) BankAccount {
    return BankAccount{owner: owner, balance: initial}
}

fn (mut a BankAccount) deposit(amount f64) {
    a.balance += amount
}

fn (mut a BankAccount) withdraw(amount f64) bool {
    if amount > a.balance {
        return false
    }
    a.balance -= amount
    return true
}

fn (a BankAccount) str() string {
    return 'Account(${a.owner}, ${a.balance:.2f})'
}

fn main() {
    mut account := new_bank_account('Alice', 1000.0)
    account.deposit(500.0)
    ok := account.withdraw(200.0)
    println('Withdrew: $ok')
    println(account)
}
```

## Gotchas

- There are no constructors; use factory functions by convention (e.g., `new_type_name(...)`).
- The `mut:` section inside a struct definition marks fields as mutable; fields above `mut:` are immutable even for `mut` struct variables.
- There is no `self` or `this`; the receiver name is chosen by the programmer and is conventionally one or two characters.
