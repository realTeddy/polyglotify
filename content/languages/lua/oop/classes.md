---
title: "Classes"
language: "lua"
feature: "classes"
category: "oop"
applicable: true
---

Lua implements classes through the metatable/prototype pattern. A class is a table; instances are tables whose metatable's `__index` points to the class table. This is prototype-based OOP, similar to JavaScript's pre-class syntax.

## Example

```lua
-- Class definition
local Vector = {}
Vector.__index = Vector

-- Constructor
function Vector.new(x, y)
    return setmetatable({x = x, y = y}, Vector)
end

-- Methods
function Vector:length()
    return math.sqrt(self.x^2 + self.y^2)
end

function Vector:add(other)
    return Vector.new(self.x + other.x, self.y + other.y)
end

function Vector:__tostring()
    return string.format("Vector(%g, %g)", self.x, self.y)
end

-- Usage
local v1 = Vector.new(3, 4)
local v2 = Vector.new(1, 2)
print(v1:length())         -- 5.0
local v3 = v1:add(v2)
print(tostring(v3))        -- Vector(4, 6)

-- Class-level (static) method
function Vector.zero()
    return Vector.new(0, 0)
end
print(Vector.zero():length())  -- 0.0
```

## Gotchas

- The `:` syntax is shorthand — `v:length()` is the same as `v.length(v)`
- `__tostring` requires `tostring()` to trigger; `print` calls `tostring` automatically
- There is no access control; all fields and methods are effectively public
