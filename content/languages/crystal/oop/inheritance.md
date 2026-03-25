---
title: "Inheritance"
language: "crystal"
feature: "inheritance"
category: "oop"
applicable: true
---

Crystal supports single inheritance with `class Child < Parent`. The child inherits all methods and instance variables. `super` calls the parent's implementation. Methods are overridden by redefining them (no explicit `override` keyword). `abstract class` and `abstract def` enforce that subclasses implement specific methods.

## Example

```crystal
abstract class Shape
  abstract def area : Float64
  abstract def perimeter : Float64

  def describe : String
    "#{self.class.name}: area=#{area.round(2)}, perimeter=#{perimeter.round(2)}"
  end
end

class Circle < Shape
  def initialize(@radius : Float64)
  end

  def area : Float64
    Math::PI * @radius ** 2
  end

  def perimeter : Float64
    2 * Math::PI * @radius
  end
end

class Rectangle < Shape
  def initialize(@width : Float64, @height : Float64)
  end

  def area : Float64
    @width * @height
  end

  def perimeter : Float64
    2 * (@width + @height)
  end
end

shapes : Array(Shape) = [Circle.new(5.0), Rectangle.new(3.0, 4.0)]
shapes.each { |s| puts s.describe }
```

## Gotchas

- Crystal has single inheritance only; use modules for mixin-style reuse.
- Abstract methods must be implemented in all concrete subclasses, or the compiler will refuse to instantiate the subclass.
- `super` without arguments passes the same arguments that were passed to the current method; `super(args)` passes explicit arguments.
