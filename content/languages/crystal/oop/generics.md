---
title: "Generics"
language: "crystal"
feature: "generics"
category: "oop"
applicable: true
---

Crystal supports generics on classes, structs, modules, and methods using type parameters in parentheses: `class Container(T)`. Type parameters can be constrained using modules. Generic methods infer type parameters from their arguments. Crystal monomorphizes generics at compile time (no runtime type erasure), producing efficient code.

## Example

```crystal
# Generic class
class Stack(T)
  def initialize
    @data = Array(T).new
  end

  def push(item : T) : self
    @data.push(item)
    self
  end

  def pop : T
    @data.pop
  end

  def peek : T
    @data.last
  end

  def empty? : Bool
    @data.empty?
  end

  def size : Int32
    @data.size
  end
end

s = Stack(Int32).new
s.push(1).push(2).push(3)
s.pop   # => 3
s.peek  # => 2

# Generic method
def first_or(arr : Array(T), default : T) : T forall T
  arr.empty? ? default : arr.first
end

first_or([1, 2, 3], 0)      # => 1
first_or([] of String, "?") # => "?"

# Constrained generics
module Summable
  abstract def +(other : self) : self
end

def sum_all(items : Array(T)) : T forall T
  items.reduce { |acc, x| acc + x }
end
```

## Gotchas

- Crystal generics are resolved entirely at compile time; there is no runtime `instanceof` check for type parameters.
- `forall T` in a free function's return type annotation is required when the return type depends on the type parameter.
- Unlike Java, there is no type erasure; `Array(Int32)` and `Array(String)` are truly distinct types at runtime.
