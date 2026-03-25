---
title: "Inheritance"
language: "lua"
feature: "inheritance"
category: "oop"
applicable: true
---

Inheritance in Lua is achieved by chaining metatables. A subclass table sets its own `__index` to the parent table, so method lookups fall through to the parent when not found on the subclass.

## Example

```lua
-- Base class
local Animal = {}
Animal.__index = Animal

function Animal.new(name)
    return setmetatable({name = name}, Animal)
end

function Animal:speak()
    print(self.name .. " makes a sound")
end

function Animal:getName()
    return self.name
end

-- Subclass
local Dog = setmetatable({}, {__index = Animal})
Dog.__index = Dog

function Dog.new(name, breed)
    local self = Animal.new(name)   -- call parent constructor
    self.breed = breed
    return setmetatable(self, Dog)
end

-- Override method
function Dog:speak()
    print(self.name .. " barks!")
end

-- New method
function Dog:fetch(item)
    print(self.name .. " fetches the " .. item)
end

-- Usage
local dog = Dog.new("Rex", "Labrador")
dog:speak()           -- Rex barks!  (overridden)
print(dog:getName())  -- Rex         (inherited)
dog:fetch("ball")     -- Rex fetches the ball

-- Call parent method explicitly
function Dog:speakPolitely()
    Animal.speak(self)  -- explicit parent call
end
dog:speakPolitely()  -- Rex makes a sound
```

## Gotchas

- The double-metatable chain (`setmetatable({}, {__index = Animal})`) is required so that the Dog table itself can find Animal methods during class definition
- There is no `super` keyword; call the parent method with `ParentClass.method(self, ...)`
- Multiple inheritance is possible but requires a custom `__index` function to search multiple parents
