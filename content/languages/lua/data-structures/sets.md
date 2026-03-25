---
title: "Sets"
language: "lua"
feature: "sets"
category: "data-structures"
applicable: true
---

Lua has no built-in set type. Sets are idiomatically implemented as tables where keys are the set members and values are `true`. Membership check becomes a simple table lookup.

## Example

```lua
-- Create a set
local function Set(list)
    local set = {}
    for _, v in ipairs(list) do
        set[v] = true
    end
    return set
end

local fruits = Set{"apple", "banana", "cherry"}

-- Membership test  O(1)
print(fruits["apple"])   -- true
print(fruits["grape"])   -- nil (not in set)

-- Add element
fruits["mango"] = true

-- Remove element
fruits["banana"] = nil

-- Union
local function union(a, b)
    local result = {}
    for k in pairs(a) do result[k] = true end
    for k in pairs(b) do result[k] = true end
    return result
end

-- Intersection
local function intersection(a, b)
    local result = {}
    for k in pairs(a) do
        if b[k] then result[k] = true end
    end
    return result
end

local vegs = Set{"carrot", "apple"}  -- apple in both
local both = intersection(fruits, vegs)
for k in pairs(both) do print(k) end  -- apple
```

## Gotchas

- Values must be comparable as table keys; tables and functions are compared by reference
- Iteration over a set via `pairs` has no guaranteed order
- No built-in difference or symmetric-difference; implement manually
