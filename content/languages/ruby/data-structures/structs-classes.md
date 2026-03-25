---
title: "Structs & Classes"
language: "ruby"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Ruby provides `Struct` for quickly creating value-object classes with named attributes and `Data` (Ruby 3.2+) for immutable value objects. Both generate accessor methods automatically. For full-featured objects with behavior, a regular `class` is used.

## Example

```ruby
# Struct — mutable value object
Point = Struct.new(:x, :y) do
  def distance_to_origin
    Math.sqrt(x**2 + y**2)
  end
end

p = Point.new(3, 4)
p.x    # => 3
p.distance_to_origin  # => 5.0

# Data — immutable (Ruby 3.2+)
Color = Data.define(:r, :g, :b)
red = Color.new(r: 255, g: 0, b: 0)
red.r      # => 255
red.frozen? # => true

# Regular class with attr_accessor
class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age  = age
  end
end

alice = Person.new("Alice", 30)
alice.name  # => "Alice"
```

## Gotchas

- `Struct` creates a new class assigned to a constant; assigning to a local variable creates an anonymous struct
- `Struct` members are mutable by default; use `Data` when immutability is needed
- `Struct#==` compares attribute values, not object identity
