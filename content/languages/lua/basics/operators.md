---
title: "Operators"
language: "lua"
feature: "operators"
category: "basics"
applicable: true
---

Lua provides the standard arithmetic, relational, and logical operators, plus the string concatenation operator `..` and the length operator `#`. Notably Lua uses `~=` for not-equal and `not`, `and`, `or` as keywords for logical operators.

## Example

```lua
-- Arithmetic
print(10 + 3)   -- 13
print(10 - 3)   -- 7
print(10 * 3)   -- 30
print(10 / 3)   -- 3.3333... (always float division in Lua 5.3+)
print(10 // 3)  -- 3  (floor division, Lua 5.3+)
print(10 % 3)   -- 1
print(2 ^ 10)   -- 1024.0 (power, always float)

-- Relational
print(1 == 1)   -- true
print(1 ~= 2)   -- true  (not equal, NOT !=)
print(1 < 2)    -- true
print(1 >= 1)   -- true

-- Logical (short-circuit, return one of the operands)
print(true and "yes")   -- "yes"
print(false and "yes")  -- false
print(false or "default") -- "default"
print(not true)           -- false

-- String concatenation
local greeting = "Hello" .. ", " .. "World!"
print(greeting)  -- Hello, World!

-- Length operator
local t = {10, 20, 30}
print(#t)          -- 3
print(#"hello")    -- 5
```

## Gotchas

- `/` always returns a float in Lua 5.3+; use `//` for integer floor division
- `^` always returns a float
- `and`/`or` return one of their operands, not necessarily `true`/`false`; useful for idioms like `x = x or default`
- `==` never coerces types: `1 == "1"` is `false`
