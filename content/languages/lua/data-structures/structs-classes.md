---
title: "Structs & Classes"
language: "lua"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Lua has no struct or class keywords. Records (structs) and classes are built using tables. A struct is simply a table with named fields. Classes add a metatable with an `__index` pointing to a prototype table that holds methods.

## Example

```lua
-- Plain struct / record
local point = {x = 3, y = 4}
print(point.x, point.y)  -- 3   4

-- Constructor function for consistency
local function newPoint(x, y)
    return {x = x, y = y}
end

-- Class pattern using metatables
local Animal = {}
Animal.__index = Animal

function Animal.new(name, sound)
    local self = setmetatable({}, Animal)
    self.name  = name
    self.sound = sound
    return self
end

function Animal:speak()
    print(self.name .. " says " .. self.sound)
end

function Animal:getName()
    return self.name
end

local dog = Animal.new("Rex", "Woof")
dog:speak()            -- Rex says Woof
print(dog:getName())   -- Rex

-- Instance check (manual)
local function isAnimal(obj)
    return getmetatable(obj) == Animal
end
print(isAnimal(dog))   -- true
```

## Gotchas

- `self` is just a convention; `:` syntax desugars to passing the table as the first argument
- Forget `setmetatable` and methods won't be found via `__index`
- Fields are public by default; "private" fields are a naming convention (prefix `_`)
