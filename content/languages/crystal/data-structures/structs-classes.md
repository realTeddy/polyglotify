---
title: "Structs & Classes"
language: "crystal"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Crystal has both `struct` (value type, stack-allocated, immutable by default, no inheritance) and `class` (reference type, heap-allocated, mutable, supports inheritance). Structs are ideal for small data containers; classes are used for objects with identity and behavior. Both support methods, generics, and modules.

## Example

```crystal
# Struct — value type
struct Point
  getter x : Float64
  getter y : Float64

  def initialize(@x : Float64, @y : Float64)
  end

  def distance_to(other : Point) : Float64
    Math.sqrt((@x - other.x) ** 2 + (@y - other.y) ** 2)
  end
end

p1 = Point.new(0.0, 0.0)
p2 = Point.new(3.0, 4.0)
p1.distance_to(p2)  # => 5.0

# Struct is a value type — assignment copies
p3 = p1   # copy, not alias

# Class — reference type
class Rectangle
  property width  : Float64
  property height : Float64

  def initialize(@width : Float64, @height : Float64)
  end

  def area : Float64
    @width * @height
  end
end

r = Rectangle.new(3.0, 4.0)
r.area      # => 12.0
r.width = 5.0
r.area      # => 20.0
```

## Gotchas

- Structs cannot inherit from other structs (only include modules); use classes for inheritance hierarchies.
- `getter` generates a read-only accessor; `setter` generates write-only; `property` generates both.
- Structs passed to methods are copied; mutations inside the method do not affect the original.
