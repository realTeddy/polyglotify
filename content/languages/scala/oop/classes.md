---
title: "Classes"
language: "scala"
feature: "classes"
category: "oop"
applicable: true
---

Scala classes are defined with `class`. The primary constructor parameters are declared inline in the class header. Fields and methods are defined in the class body. `object` provides a singleton. `companion object` holds static-like members and factory methods.

## Example

```scala
class BankAccount(val owner: String, initialBalance: Double = 0):
  private var _balance = initialBalance

  def balance: Double = _balance

  def deposit(amount: Double): Unit =
    require(amount > 0, "Amount must be positive")
    _balance += amount

  def withdraw(amount: Double): Boolean =
    if amount > _balance then false
    else
      _balance -= amount
      true

  override def toString: String = s"BankAccount($owner: $$_balance)"

// Companion object (static-like members + factory)
object BankAccount:
  def apply(owner: String): BankAccount = new BankAccount(owner)
  def fromJson(json: Map[String, Any]): BankAccount =
    BankAccount(json("owner").toString, json("balance").asInstanceOf[Double])

// Usage
val acct = BankAccount("Alice")      // uses companion apply
acct.deposit(100)
println(acct.balance)   // => 100.0
```

## Gotchas

- Constructor parameters without `val`/`var` are not accessible as fields outside the class
- Scala does not have `static`; use `object` or a `companion object` for class-level members
- `require(condition)` throws `IllegalArgumentException` — use it for precondition validation
