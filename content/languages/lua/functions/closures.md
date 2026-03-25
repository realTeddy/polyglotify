---
title: "Closures & Lambdas"
language: "lua"
feature: "closures"
category: "functions"
applicable: true
---

Every Lua function is a closure — it captures references to local variables from enclosing scopes (called *upvalues*). Anonymous functions (lambdas) are simply function expressions without a name.

## Example

```lua
-- Closure capturing an upvalue
local function makeCounter(start)
    local count = start or 0
    return function()
        count = count + 1
        return count
    end
end

local counter = makeCounter(10)
print(counter())  -- 11
print(counter())  -- 12
print(counter())  -- 13

-- Each call to makeCounter creates an independent closure
local c2 = makeCounter()
print(c2())  -- 1

-- Anonymous function (lambda) inline
local nums = {5, 3, 8, 1, 9}
table.sort(nums, function(a, b) return a < b end)
for _, v in ipairs(nums) do io.write(v .. " ") end
print()  -- 1 3 5 8 9

-- Partial application via closure
local function multiply(factor)
    return function(x) return x * factor end
end
local double = multiply(2)
local triple = multiply(3)
print(double(5))  -- 10
print(triple(5))  -- 15

-- Shared upvalues between closures
local function sharedState()
    local value = 0
    local function get() return value end
    local function set(v) value = v end
    return get, set
end
local get, set = sharedState()
set(42)
print(get())  -- 42
```

## Gotchas

- Upvalues are captured by **reference**, not by value; a loop variable captured in a closure changes with the loop
- Create a new local inside the loop body to capture the current iteration value: `local i = i`
- Closures with shared upvalues can be surprising; document intentional sharing
