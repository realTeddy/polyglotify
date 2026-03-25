---
title: "Parameters & Arguments"
language: "lua"
feature: "parameters"
category: "functions"
applicable: true
---

Lua functions accept any number of arguments regardless of the declared parameter list. Extra arguments are silently discarded; missing arguments become `nil`. Variadic functions use `...` to accept a variable number of arguments.

## Example

```lua
-- Basic parameters
local function add(a, b)
    return a + b
end
print(add(3, 4))    -- 7
print(add(3))       -- attempt to perform arithmetic on a nil value (b is nil)

-- Default values via or idiom
local function greet(name, greeting)
    greeting = greeting or "Hello"
    print(greeting .. ", " .. name)
end
greet("Alice")           -- Hello, Alice
greet("Bob", "Hi")       -- Hi, Bob

-- Variadic functions
local function sum(...)
    local total = 0
    for _, v in ipairs({...}) do
        total = total + v
    end
    return total
end
print(sum(1, 2, 3, 4))  -- 10

-- select with varargs
local function firstAndCount(...)
    print("First:", (select(1, ...)))
    print("Count:", select("#", ...))
end
firstAndCount("a", "b", "c")

-- Named-parameter style using a table
local function createUser(opts)
    local name = opts.name or "Anonymous"
    local age  = opts.age  or 0
    return name .. " (" .. age .. ")"
end
print(createUser{name = "Alice", age = 30})
```

## Gotchas

- `{...}` loses trailing `nil` arguments; use `select("#", ...)` for the true count
- The `or` default-value idiom fails when `false` is a legitimate value; use explicit `if arg == nil then` in that case
- Passing a table as the only argument allows optional named parameters but adds slight overhead
