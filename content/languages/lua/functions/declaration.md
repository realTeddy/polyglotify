---
title: "Function Declaration"
language: "lua"
feature: "declaration"
category: "functions"
applicable: true
---

Functions are first-class values in Lua. They can be assigned to variables, stored in tables, and passed around like any other value. There are two syntactic forms: the `function` statement and function expressions.

## Example

```lua
-- Standard function declaration (syntactic sugar for local greet = function(...))
local function greet(name)
    print("Hello, " .. name)
end

greet("Alice")  -- Hello, Alice

-- Function expression assigned to a variable
local add = function(a, b)
    return a + b
end
print(add(3, 4))  -- 7

-- Global function (avoid in modules)
function globalHello()
    print("hi")
end

-- Functions stored in tables (used for modules and OOP)
local Math = {}
function Math.square(x)
    return x * x
end
print(Math.square(5))  -- 25

-- Recursive function (must be local before use)
local function factorial(n)
    if n <= 1 then return 1 end
    return n * factorial(n - 1)
end
print(factorial(5))  -- 120
```

## Gotchas

- `function foo() end` at file scope creates a **global**; always prefer `local function foo() end`
- For mutual recursion, declare one variable first: `local isEven; local function isOdd(n) ... end; isEven = function(n) ... end`
- Functions are values; re-assigning `foo` changes what `foo` refers to everywhere
