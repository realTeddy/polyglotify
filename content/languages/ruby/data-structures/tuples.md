---
title: "Tuples"
language: "ruby"
feature: "tuples"
category: "data-structures"
applicable: false
---

Ruby does not have a dedicated tuple type. Fixed-size, heterogeneous collections are typically represented using plain arrays, which can be destructured in assignments. For semantically named fields, a `Struct` or `Data` (Ruby 3.2+) is the idiomatic alternative.

## Example

```ruby
# Arrays used as tuples
point = [10, 20]
x, y = point     # destructuring

# Struct as a named tuple
Point = Struct.new(:x, :y)
p = Point.new(10, 20)
p.x   # => 10

# Data class (Ruby 3.2+) — immutable named tuple
Point = Data.define(:x, :y)
p = Point.new(x: 10, y: 20)
p.x      # => 10
p.frozen? # => true

# Returning multiple values (implicit tuple)
def bounds(arr)
  [arr.min, arr.max]
end
low, high = bounds([3, 1, 4])
```

## Gotchas

- Plain arrays used as tuples are mutable; nothing prevents accidental modification
- `Data.define` (Ruby 3.2+) provides truly immutable value objects and is the closest equivalent to tuples in other languages
