---
title: "Result Types"
language: "lua"
feature: "result-types"
category: "error-handling"
applicable: true
---

Lua does not have a formal Result type, but the idiomatic pattern is to return `value, nil` on success and `nil, errorMessage` on failure. This mirrors Rust's `Result` or Go's `value, err` convention and is used throughout the standard library.

## Example

```lua
-- Idiomatic nil+error return pattern
local function readFile(path)
    local file, err = io.open(path, "r")
    if not file then
        return nil, "cannot open file: " .. err
    end
    local content = file:read("*a")
    file:close()
    return content, nil
end

local content, err = readFile("/tmp/test.txt")
if err then
    print("Error:", err)
else
    print("Content:", content)
end

-- Chain of fallible operations
local function parseInt(s)
    local n = tonumber(s)
    if not n or math.floor(n) ~= n then
        return nil, "not an integer: " .. tostring(s)
    end
    return math.floor(n), nil
end

local function doubleString(s)
    local n, err = parseInt(s)
    if err then return nil, err end
    return tostring(n * 2), nil
end

local val, err2 = doubleString("21")
print(val, err2)   -- "42"   nil

-- Result-like wrapper table (optional, more explicit)
local function Ok(v)  return {ok = true,  value = v}   end
local function Err(e) return {ok = false, error = e}   end

local function safeSqrt(x)
    if x < 0 then return Err("negative input") end
    return Ok(math.sqrt(x))
end

local res = safeSqrt(-1)
if res.ok then
    print("Result:", res.value)
else
    print("Error:", res.error)
end
```

## Gotchas

- Always check the error before using the value; ignoring the second return is a common bug
- `false` is a valid first return; use `== nil` not just truthiness checks when `false` is meaningful
- The table-based `Result` pattern adds overhead but is more explicit; pick one style and be consistent
