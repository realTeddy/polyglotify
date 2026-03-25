---
title: "Generics"
language: "lua"
feature: "generics"
category: "oop"
applicable: true
---

Lua has no generic type system. Because Lua is dynamically typed, every function and table already operates generically — there is no need to parameterise over types. The equivalent of generics is simply writing functions that work on any value.

## Example

```lua
-- A "generic" stack that works with any type
local function Stack()
    local items = {}
    return {
        push = function(v) items[#items + 1] = v end,
        pop  = function()
            if #items == 0 then return nil end
            local v = items[#items]
            items[#items] = nil
            return v
        end,
        peek = function() return items[#items] end,
        size = function() return #items end,
    }
end

local numStack = Stack()
numStack.push(1)
numStack.push(2)
print(numStack.pop())  -- 2

local strStack = Stack()
strStack.push("hello")
strStack.push("world")
print(strStack.pop())  -- "world"

-- Generic map/filter/reduce
local function map(t, fn)
    local result = {}
    for i, v in ipairs(t) do result[i] = fn(v) end
    return result
end

local function filter(t, pred)
    local result = {}
    for _, v in ipairs(t) do
        if pred(v) then result[#result + 1] = v end
    end
    return result
end

local doubled  = map({1, 2, 3, 4}, function(x) return x * 2 end)
local evens    = filter({1, 2, 3, 4, 5, 6}, function(x) return x % 2 == 0 end)
```

## Gotchas

- The lack of a type system means generic code can silently receive wrong types; add assertions or `type()` checks where correctness matters
- No compile-time guarantees; all type errors are runtime errors
- For type-safe Lua, consider using type annotations with the Teal or typed Lua transpilers
