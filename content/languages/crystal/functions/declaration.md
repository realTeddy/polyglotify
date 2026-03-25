---
title: "Function Declaration"
language: "crystal"
feature: "declaration"
category: "functions"
applicable: true
---

Crystal uses `def`/`end` to declare methods. Return types are inferred but can be annotated with `: ReturnType`. Methods implicitly return their last expression. Top-level methods become methods on the program's main object. The `!` suffix conventionally denotes a method that mutates state; `?` suffix denotes a predicate returning `Bool`.

## Example

```crystal
# Basic method
def add(x, y)
  x + y
end

# With explicit return type
def greet(name : String) : String
  "Hello, #{name}!"
end

# Predicate method (returns Bool)
def even?(n : Int32) : Bool
  n % 2 == 0
end

# Bang method (mutates receiver or raises)
def process!(data)
  raise "empty!" if data.empty?
  data.upcase
end

# One-liner
def square(x) = x * x

# Early return
def first_positive(nums : Array(Int32)) : Int32?
  nums.each { |n| return n if n > 0 }
  nil
end

add(3, 4)        # => 7
greet("Alice")   # => "Hello, Alice!"
square(5)        # => 25
```

## Gotchas

- Crystal methods always return a value; `nil` is returned implicitly if the last expression is `nil`.
- Type annotations on parameters are optional but improve clarity and compilation error messages.
- Method overloading is supported — multiple `def` with the same name but different parameter types are distinct methods.
