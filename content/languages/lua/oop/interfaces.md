---
title: "Interfaces & Traits"
language: "lua"
feature: "interfaces"
category: "oop"
applicable: true
---

Lua has no interface or trait keyword. Interfaces are implemented via **duck typing** — if an object has the required methods, it satisfies the interface. Explicit interface contracts can be enforced at runtime with validation functions.

## Example

```lua
-- Duck typing: anything with :area() and :perimeter() is a "Shape"
local function printShapeInfo(shape)
    -- Runtime check (optional but useful for debugging)
    assert(type(shape.area)      == "function", "shape must have area()")
    assert(type(shape.perimeter) == "function", "shape must have perimeter()")

    print(string.format("Area: %.2f, Perimeter: %.2f",
        shape:area(), shape:perimeter()))
end

-- Circle "implements" Shape
local Circle = {}
Circle.__index = Circle
function Circle.new(r) return setmetatable({r = r}, Circle) end
function Circle:area()      return math.pi * self.r^2 end
function Circle:perimeter() return 2 * math.pi * self.r end

-- Rectangle "implements" Shape
local Rect = {}
Rect.__index = Rect
function Rect.new(w, h) return setmetatable({w=w, h=h}, Rect) end
function Rect:area()      return self.w * self.h end
function Rect:perimeter() return 2 * (self.w + self.h) end

printShapeInfo(Circle.new(5))
printShapeInfo(Rect.new(4, 6))

-- Mixin pattern as reusable "trait"
local Serializable = {}
function Serializable:serialize()
    local parts = {}
    for k, v in pairs(self) do
        parts[#parts+1] = k .. "=" .. tostring(v)
    end
    return "{" .. table.concat(parts, ", ") .. "}"
end

-- Mix into a class
local Point = {__index = {}}
for k, v in pairs(Serializable) do Point.__index[k] = v end
```

## Gotchas

- Duck typing means errors surface at call time, not at object-creation time; add assertions for early feedback
- Mixins can cause method name collisions; document which names are reserved
- Lua has no compile-time interface checking; use tests to verify contracts
