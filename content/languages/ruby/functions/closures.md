---
title: "Closures & Lambdas"
language: "ruby"
feature: "closures"
category: "functions"
applicable: true
---

Ruby has three closure-like constructs: blocks (anonymous, attached to method calls), `Proc` objects (block stored as object), and lambdas (stricter `Proc` with arity checking and own return scope). All three capture the surrounding local variables.

## Example

```ruby
# Block (inline closure)
[1, 2, 3].map { |n| n * 2 }   # => [2, 4, 6]

# Proc — lenient arity, return exits enclosing method
square = Proc.new { |n| n ** 2 }
square.call(4)   # => 16

# Lambda — strict arity, return exits lambda only
cube = lambda { |n| n ** 3 }
# or with stabby syntax:
cube = ->(n) { n ** 3 }
cube.call(3)     # => 27

# Closures capture outer variables
multiplier = 3
triple = ->(n) { n * multiplier }
triple.call(5)   # => 15

# Storing and passing blocks
def apply(value, &block)
  block.call(value)
end
apply(10) { |n| n + 5 }  # => 15
```

## Gotchas

- `Proc` vs lambda: a `return` inside a `Proc` returns from the enclosing method; a `return` inside a lambda returns only from the lambda itself
- Lambdas enforce argument count; `Proc.new` silently ignores extra args or assigns `nil` to missing ones
- Blocks are not objects; use `&` to convert them to `Proc` objects
