---
title: "Interfaces & Traits"
language: "crystal"
feature: "interfaces"
category: "oop"
applicable: true
---

Crystal does not have explicit interfaces. The equivalent is **modules** used as mixins, combined with **abstract methods**. A module can define abstract methods that including classes must implement. This provides interface-like contracts with the added ability to include default method implementations. Duck typing also works via union types.

## Example

```crystal
module Drawable
  abstract def draw : Nil
  abstract def bounding_box : {Float64, Float64, Float64, Float64}

  def visible? : Bool
    true  # default implementation
  end
end

module Serializable
  abstract def to_json : String
end

class Circle
  include Drawable
  include Serializable

  def initialize(@cx : Float64, @cy : Float64, @r : Float64)
  end

  def draw : Nil
    puts "Drawing circle at (#{@cx}, #{@cy}) r=#{@r}"
  end

  def bounding_box : {Float64, Float64, Float64, Float64}
    {@cx - @r, @cy - @r, @cx + @r, @cy + @r}
  end

  def to_json : String
    %[{"cx":#{@cx},"cy":#{@cy},"r":#{@r}}]
  end
end

c = Circle.new(0.0, 0.0, 5.0)
c.draw
c.visible?  # => true  (default from module)
c.to_json
```

## Gotchas

- A class that `include`s a module with abstract methods must implement them or be declared `abstract` itself.
- Modules can include other modules, enabling interface hierarchies.
- Crystal uses structural typing for blocks and Procs; any callable that matches the signature is acceptable.
