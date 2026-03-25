---
title: "Types & Type Systems"
language: "lua"
feature: "types"
category: "basics"
applicable: true
---

Lua is dynamically typed with eight primitive types: `nil`, `boolean`, `number`, `string`, `function`, `table`, `thread`, and `userdata`. All variables can hold any type. Lua 5.3+ splits `number` into `integer` and `float` subtypes.

## Example

```lua
local n = nil          -- nil
local b = true         -- boolean
local i = 42           -- number (integer in Lua 5.3+)
local f = 3.14         -- number (float)
local s = "hello"      -- string
local t = {}           -- table
local fn = function() end  -- function

-- Check type at runtime
print(type(n))   -- "nil"
print(type(b))   -- "boolean"
print(type(i))   -- "number"
print(type(s))   -- "string"
print(type(t))   -- "table"
print(type(fn))  -- "function"

-- Strings and numbers coerce in arithmetic contexts
print("10" + 5)  -- 15  (string coerced to number)
print(10 .. "")  -- "10" (number coerced to string with ..)
```

## Gotchas

- `0` and `""` are both **truthy** in Lua; only `nil` and `false` are falsy
- String-to-number coercion in arithmetic is silent; use `tonumber()` explicitly for clarity
- `type()` returns a string, not an enum, so comparisons are string comparisons
