---
title: "Tuples"
language: "lua"
feature: "tuples"
category: "data-structures"
applicable: true
---

Lua has no dedicated tuple type. Tuples are represented either as multiple return values (for transient use) or as small sequential tables (for storing). Multiple return values are the idiomatic choice when you just need to pass several values together.

## Example

```lua
-- Multiple return values as a "tuple"
local function rgb()
    return 255, 128, 0
end

local r, g, b = rgb()
print(r, g, b)  -- 255   128   0

-- Table as a fixed-size tuple
local point = {10, 20}      -- x=point[1], y=point[2]
local color  = {255, 0, 128}

-- Destructure via table
local function swap(pair)
    return pair[2], pair[1]
end
local a, b = swap({1, 2})
print(a, b)  -- 2   1

-- Named tuple style (table with named keys)
local function makePoint(x, y)
    return {x = x, y = y}
end
local p = makePoint(3, 4)
print(p.x, p.y)  -- 3   4

-- Returning nil+error as a 2-tuple is conventional
local function parse(s)
    local n = tonumber(s)
    if not n then return nil, "not a number: " .. s end
    return n, nil
end
local val, err = parse("42")
```

## Gotchas

- Multiple returns are truncated when not in the last expression slot; wrap in `{}` to store all values: `local t = {rgb()}`
- Sequential tables are mutable; unlike true tuples, elements can be changed
- No pattern matching or destructuring syntax; unpack with `table.unpack(t)` (or `unpack` in Lua 5.1)
