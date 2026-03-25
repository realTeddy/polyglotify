---
title: "Generics"
language: "ruby"
feature: "generics"
category: "oop"
applicable: false
---

Ruby does not have generics as a language feature — its dynamic type system and duck typing make them unnecessary at runtime. Type-parameterized containers are handled naturally because Ruby arrays and hashes are untyped. For static type checking with generics, RBS type signatures and Sorbet's `T::Array[T]` syntax provide equivalent functionality.

## Example

```ruby
# Ruby's Array is already "generic" — no type parameter needed
names   = ["Alice", "Bob"]   # String array
numbers = [1, 2, 3]          # Integer array
mixed   = [1, "two", :three] # Mixed — allowed

# Duck-typed generic container
class Stack
  def initialize
    @data = []
  end

  def push(item)
    @data.push(item)
    self
  end

  def pop
    @data.pop
  end

  def empty?
    @data.empty?
  end
end

# Works with any type
s = Stack.new
s.push(1).push("hello").push(:sym)

# RBS annotation for static tools (in .rbs file):
# class Stack[T]
#   def push: (T) -> self
#   def pop: () -> T?
# end
```

## Gotchas

- Without a type checker, there is no guarantee a container holds only one type at runtime
- Sorbet's `T::Array[Integer]` and RBS generics are erased at runtime — they exist only for static analysis
