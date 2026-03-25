---
title: "Control Flow"
language: "lua"
feature: "control-flow"
category: "basics"
applicable: true
---

Lua provides `if/elseif/else`, `while`, `repeat/until`, and numeric/generic `for` loops. There is no `switch` statement; use `if/elseif` chains or a dispatch table instead. All blocks end with `end`.

## Example

```lua
-- if / elseif / else
local score = 85
if score >= 90 then
    print("A")
elseif score >= 80 then
    print("B")
elseif score >= 70 then
    print("C")
else
    print("F")
end

-- while loop
local i = 1
while i <= 5 do
    io.write(i .. " ")
    i = i + 1
end
print()  -- newline

-- repeat / until (condition checked AFTER body)
local n = 1
repeat
    io.write(n .. " ")
    n = n + 1
until n > 5
print()

-- Numeric for: for var = start, limit, step do
for i = 1, 5 do
    io.write(i .. " ")
end
print()

-- Generic for with ipairs (array-style)
local fruits = {"apple", "banana", "cherry"}
for index, value in ipairs(fruits) do
    print(index, value)
end

-- Generic for with pairs (all keys)
local person = {name = "Alice", age = 30}
for key, value in pairs(person) do
    print(key, value)
end

-- break exits the nearest loop; no continue (use goto in Lua 5.2+)
for i = 1, 10 do
    if i == 5 then break end
    io.write(i .. " ")
end
```

## Gotchas

- `repeat/until` keeps local variables declared inside the body in scope for the condition
- Lua has no `continue`; use `goto continue` + `::continue::` label in Lua 5.2+
- Numeric `for` evaluates the limit and step once at the start; modifying loop vars doesn't affect iteration
