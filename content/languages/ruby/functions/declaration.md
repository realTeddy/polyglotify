---
title: "Function Declaration"
language: "ruby"
feature: "declaration"
category: "functions"
applicable: true
---

Functions in Ruby are called methods and are defined with the `def` keyword. Methods always belong to an object; top-level methods become private methods of `Object`. Ruby methods implicitly return the value of the last expression.

## Example

```ruby
# Basic method
def greet(name)
  "Hello, #{name}!"
end

greet("Alice")  # => "Hello, Alice!"

# Predicate methods (return boolean, end with ?)
def empty?(list)
  list.length == 0
end

# Bang methods (mutate receiver or raise, end with !)
def normalize!(str)
  str.strip!
  str.downcase!
end

# Private method
class MyClass
  def public_method
    secret
  end

  private

  def secret
    "hidden"
  end
end
```

## Gotchas

- Parentheses are optional when calling methods but required to avoid ambiguity in some cases
- Methods ending in `?` should return a boolean by convention but Ruby does not enforce this
- `def` inside a class defines an instance method; use `def self.method_name` for class methods
