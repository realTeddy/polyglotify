---
title: "Return Values"
language: "lua"
feature: "return-values"
category: "functions"
applicable: true
---

Lua supports multiple return values natively — no need to wrap results in a table. Multiple returns are used extensively in the standard library, especially for returning a value plus an error message.

## Example

```lua
-- Multiple return values
local function minmax(t)
    local min, max = t[1], t[1]
    for _, v in ipairs(t) do
        if v < min then min = v end
        if v > max then max = v end
    end
    return min, max
end

local lo, hi = minmax({3, 1, 4, 1, 5, 9})
print(lo, hi)  -- 1   9

-- Only first value used when not all are captured
local first = minmax({3, 1, 5})
print(first)   -- 1  (only min)

-- Standard error-return pattern
local function safeDivide(a, b)
    if b == 0 then
        return nil, "division by zero"
    end
    return a / b
end

local result, err = safeDivide(10, 0)
if err then
    print("Error:", err)
else
    print("Result:", result)
end

-- Multiple returns truncated when not the last expression
local function two() return 1, 2 end
local t = {two(), 3}   -- t = {1, 3}  (first return only in non-tail position)
local t2 = {3, two()}  -- t2 = {3, 1, 2}  (last expression expands)
print(#t, #t2)  -- 2   3
```

## Gotchas

- Multiple returns are **truncated to one** when the call is not in the last position of an expression list
- Wrapping a call in parentheses forces a single return value: `(two())` yields only `1`
- The `nil, errmsg` pattern is idiomatic Lua error handling for recoverable errors
