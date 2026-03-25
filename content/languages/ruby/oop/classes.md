---
title: "Classes"
language: "ruby"
feature: "classes"
category: "oop"
applicable: true
---

Everything in Ruby is an object. Classes are defined with `class`, instantiated with `.new`, and support instance variables (`@`), class variables (`@@`), and class methods (`self.`). `attr_accessor`, `attr_reader`, and `attr_writer` generate getter/setter methods automatically.

## Example

```ruby
class BankAccount
  attr_reader :balance, :owner

  @@count = 0   # class variable

  def initialize(owner, initial = 0)
    @owner   = owner
    @balance = initial
    @@count  += 1
  end

  def deposit(amount)
    raise ArgumentError, "Amount must be positive" if amount <= 0
    @balance += amount
  end

  def withdraw(amount)
    raise "Insufficient funds" if amount > @balance
    @balance -= amount
  end

  def self.count  # class method
    @@count
  end

  def to_s
    "#{@owner}: $#{@balance}"
  end
end

acct = BankAccount.new("Alice", 100)
acct.deposit(50)
puts acct         # => "Alice: $150"
BankAccount.count # => 1
```

## Gotchas

- `initialize` is the constructor and is called automatically by `new`
- Instance variables not set in `initialize` return `nil` rather than raising an error
- Ruby classes are open — you can reopen and modify any class, including built-ins
