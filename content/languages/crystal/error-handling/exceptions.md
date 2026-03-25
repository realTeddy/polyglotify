---
title: "Exceptions & Try/Catch"
language: "crystal"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Crystal uses `begin`/`rescue`/`ensure`/`end` for exception handling (Ruby-style). `raise` throws an exception. Custom exception classes inherit from `Exception`. `rescue` can pattern-match on the exception type. `ensure` runs regardless of whether an exception was raised (equivalent to `finally`). Exceptions can also be rescued inline.

## Example

```crystal
# Basic rescue
begin
  result = 10 / 0
rescue ex : DivisionByZeroError
  puts "Cannot divide by zero: #{ex.message}"
ensure
  puts "This always runs"
end

# Custom exception
class InsufficientFundsError < Exception
  getter amount : Float64

  def initialize(@amount : Float64)
    super("Insufficient funds: need #{amount}")
  end
end

def withdraw(balance : Float64, amount : Float64) : Float64
  raise InsufficientFundsError.new(amount) if amount > balance
  balance - amount
end

begin
  withdraw(100.0, 200.0)
rescue ex : InsufficientFundsError
  puts ex.message
  puts "Needed: #{ex.amount}"
rescue ex : Exception
  puts "Unexpected: #{ex.message}"
end

# Inline rescue
value = Integer.parse("abc") rescue 0
```

## Gotchas

- Exceptions in Crystal carry a backtrace; retrieving it with `ex.backtrace` is available in debug builds.
- Crystal has `raise "message"` as a shorthand that raises `Exception` with that message.
- Rescue clauses are checked in order; place more specific types before general `Exception`.
