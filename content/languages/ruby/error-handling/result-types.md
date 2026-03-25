---
title: "Result Types"
language: "ruby"
feature: "result-types"
category: "error-handling"
applicable: false
---

Ruby does not have a built-in `Result` or `Either` type. The idiomatic approach is to use exceptions for errors or return `nil`/`false` for expected failures. Libraries like `dry-monads` provide a `Result` monad (`Success`/`Failure`) for functional-style error handling.

## Example

```ruby
# Idiomatic Ruby: return nil on failure
def find_user(id)
  User.find_by(id: id)  # returns nil if not found
end

user = find_user(42)
if user
  user.activate
else
  puts "User not found"
end

# Using dry-monads for Result-style handling
require 'dry/monads'
include Dry::Monads[:result]

def divide(a, b)
  return Failure("Division by zero") if b.zero?
  Success(a / b)
end

case divide(10, 2)
in Success[value] then puts "Result: #{value}"
in Failure[msg]   then puts "Error: #{msg}"
end

# Chaining with bind
divide(10, 2)
  .bind { |n| divide(n, 0) }
  .value_or("fallback")
```

## Gotchas

- Returning `nil` for failures loses error context; prefer raising a descriptive exception or using `dry-monads` for complex flows
- `dry-monads` `Success`/`Failure` interoperates well with Ruby's pattern matching syntax
