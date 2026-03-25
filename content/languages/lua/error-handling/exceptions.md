---
title: "Exceptions & Try/Catch"
language: "lua"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Lua uses `error()` to raise errors and `pcall` / `xpcall` as the try/catch mechanism. `pcall` (protected call) catches any error and returns a status boolean plus the result or error object.

## Example

```lua
-- Basic pcall
local ok, result = pcall(function()
    return 10 / 2
end)
print(ok, result)  -- true   5.0

-- Catching an error
local ok2, err = pcall(function()
    error("something went wrong")
end)
print(ok2, err)
-- false   input:7: something went wrong

-- error() with a table for structured errors
local function riskyOp(x)
    if x < 0 then
        error({code = "NEGATIVE", msg = "value must be non-negative", value = x})
    end
    return math.sqrt(x)
end

local ok3, result3 = pcall(riskyOp, -1)
if not ok3 then
    if type(result3) == "table" then
        print("Error code:", result3.code)
        print("Error msg:",  result3.msg)
    else
        print("Error:", result3)
    end
end

-- xpcall with a traceback handler
local function errorHandler(err)
    return debug.traceback("Error: " .. tostring(err), 2)
end

local ok4, msg = xpcall(function()
    error("boom")
end, errorHandler)
print(msg)  -- full stack trace

-- error() level parameter
local function checkPositive(n)
    if n <= 0 then
        error("expected positive number", 2)  -- blame the caller
    end
end
```

## Gotchas

- `error("msg")` adds the file/line prefix; pass a non-string (e.g. table) to avoid it, or use level `0`
- `pcall` does **not** resume coroutines; use `coroutine.resume` for coroutine error handling
- Errors inside `__gc` metamethods cannot be caught with `pcall`
