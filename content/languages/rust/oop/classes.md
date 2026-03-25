---
title: "Classes"
language: "rust"
feature: "classes"
category: "oop"
applicable: false
---

Rust has no classes. The equivalent is a `struct` with methods defined in `impl` blocks. Rust explicitly separates data (`struct`) from behavior (`impl`), and from contracts (`trait`). This three-part separation avoids many of the pitfalls of class-based inheritance hierarchies.

## Example

```rust
#[derive(Debug)]
pub struct BankAccount {
    owner: String,
    balance: f64,
}

impl BankAccount {
    pub fn new(owner: &str, initial_balance: f64) -> Self {
        BankAccount {
            owner: owner.to_string(),
            balance: initial_balance,
        }
    }

    pub fn deposit(&mut self, amount: f64) {
        self.balance += amount;
    }

    pub fn withdraw(&mut self, amount: f64) -> Result<(), String> {
        if amount > self.balance {
            Err(format!("Insufficient funds: balance is {:.2}", self.balance))
        } else {
            self.balance -= amount;
            Ok(())
        }
    }

    pub fn balance(&self) -> f64 {
        self.balance
    }
}

fn main() {
    let mut account = BankAccount::new("Alice", 1000.0);
    account.deposit(500.0);
    println!("{:?}", account.withdraw(200.0));
    println!("Balance: {}", account.balance());
}
```

## Gotchas

- Multiple `impl` blocks for the same type are allowed and often used to separate method groups or implement traits.
- There is no constructor syntax; `new` is a convention, not a keyword.
