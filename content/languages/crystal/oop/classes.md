---
title: "Classes"
language: "crystal"
feature: "classes"
category: "oop"
applicable: true
---

Crystal classes are reference types defined with `class`/`end`. Instance variables start with `@`, class variables with `@@`. Constructors are defined as `def initialize`. `getter`, `setter`, and `property` macros generate accessor methods. All classes implicitly inherit from `Reference` (which inherits from `Object`).

## Example

```crystal
class BankAccount
  getter owner : String
  getter balance : Float64

  @@interest_rate = 0.05  # class variable

  def initialize(@owner : String, initial : Float64 = 0.0)
    @balance = initial
  end

  def deposit(amount : Float64) : self
    @balance += amount
    self
  end

  def withdraw(amount : Float64) : Bool
    return false if amount > @balance
    @balance -= amount
    true
  end

  def self.interest_rate : Float64
    @@interest_rate
  end

  def to_s(io : IO) : Nil
    io << "Account(#{@owner}, #{@balance})"
  end
end

account = BankAccount.new("Alice", 1000.0)
account.deposit(500.0).deposit(200.0)  # method chaining
account.withdraw(300.0)
puts account          # => Account(Alice, 1400.0)
puts BankAccount.interest_rate  # => 0.05
```

## Gotchas

- Instance variables (`@var`) must be initialized in `initialize` or given a default value; uninitialized `@var` has type `Nil` and may cause compiler errors.
- `self.method_name` defines a class method; `@@var` is a class variable.
- `to_s(io)` rather than `to_s` is Crystal's convention for efficient string building (avoids intermediate allocations).
