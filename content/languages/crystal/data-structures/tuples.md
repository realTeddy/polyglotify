---
title: "Tuples"
language: "crystal"
feature: "tuples"
category: "data-structures"
applicable: true
---

Crystal has first-class `Tuple` types: fixed-size, stack-allocated, and heterogeneous. The type of each element is tracked individually at compile time. Tuple literals use `{a, b, c}` syntax. `NamedTuple` adds compile-time symbol keys. Tuples are value types, so assignment copies them.

## Example

```crystal
# Tuple literal
pair = {1, "hello"}
pair[0]  # => 1    (type: Int32)
pair[1]  # => "hello" (type: String)

# Type
typeof(pair)  # => Tuple(Int32, String)

# Destructuring
x, y = {10, 20}
first, *rest = {1, 2, 3, 4}

# Multi-return (returning a tuple)
def divmod(a : Int32, b : Int32) : {Int32, Int32}
  {a // b, a % b}
end
q, r = divmod(17, 5)
puts "#{q} remainder #{r}"  # => "3 remainder 2"

# NamedTuple
point = {x: 3, y: 4}
point[:x]  # => 3
point[:y]  # => 4
typeof(point)  # => NamedTuple(x: Int32, y: Int32)

# Tuple to array
{1, 2, 3}.to_a  # => [1, 2, 3]
```

## Gotchas

- Tuple indices must be compile-time constants when accessing by index with `[]`; dynamic indices require converting to an array.
- `{x: 1}` is a `NamedTuple`, not a `Hash`; keys are symbols, not strings.
- Tuples are value types: assigning a tuple copies all elements.
