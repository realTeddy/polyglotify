---
title: "Exceptions & Try/Catch"
language: "ruby"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Ruby uses `begin/rescue/ensure/end` for exception handling (analogous to try/catch/finally). Exceptions are instances of classes inheriting from `Exception`; most application errors inherit from `StandardError`. The `raise` keyword throws an exception.

## Example

```ruby
# Basic rescue
begin
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "Error: #{e.message}"
ensure
  puts "Always runs"
end

# Multiple rescue clauses
begin
  data = fetch_data(url)
rescue Timeout::Error
  retry if (attempts += 1) < 3
  raise
rescue JSON::ParserError => e
  log_error(e)
  nil
rescue => e        # catches any StandardError
  log_error(e)
  raise
end

# Custom exception class
class InsufficientFundsError < StandardError
  def initialize(amount)
    super("Cannot withdraw #{amount}: insufficient funds")
  end
end

raise InsufficientFundsError.new(100)

# Inline rescue
value = Integer("abc") rescue 0
```

## Gotchas

- `rescue Exception` catches everything including `Interrupt` and `SignalException` — always rescue `StandardError` or a specific subclass
- `retry` without a counter can create an infinite loop
- `ensure` always runs, even if `return` or `raise` is used in the `rescue` block
