---
title: "Style Conventions"
language: "lua"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Lua has no official style guide, but the community has converged on conventions documented in the Lua style guide by Olivine Labs and the LuaRocks community. Key tools: **luacheck** for linting, **StyLua** for formatting.

## Example

```lua
-- Naming conventions
local myVariable    = "camelCase for locals"
local MY_CONSTANT   = 42          -- SCREAMING_SNAKE for constants
local MyClass       = {}          -- PascalCase for classes
local _privateField = "internal"  -- leading _ for private/internal

-- Indentation: 2 or 4 spaces (community uses both; pick one and be consistent)
local function calculate(x, y)
    if x > 0 then
        return x + y
    else
        return y
    end
end

-- Spaces around operators and after commas
local result = (a + b) * c
local t = {1, 2, 3}

-- Semicolons: never (Lua allows them but they are not idiomatic)

-- String quotes: single or double — pick one, double is slightly more common
local s1 = "double quotes"
local s2 = 'single quotes'

-- Always use `local`; avoid globals outside the top-level script
local M = {}  -- module table

-- Short files, one module per file
-- File matches require path: myproject/utils.lua → require("myproject.utils")

-- Prefer explicit returns; avoid relying on fall-through nil
local function safeName(obj)
    if type(obj) ~= "table" then return "" end
    return obj.name or ""
end

-- Comments: -- for line comments, --[[ ]] for blocks
-- Document public API with a brief description above the function
```

```bash
# Lint
luacheck src/ --globals MY_GLOBAL

# Format (StyLua)
stylua src/
```

## Gotchas

- `luacheck` will warn about unset globals and unused variables; fix them rather than suppressing warnings
- StyLua uses its own defaults (2-space indent, double quotes); configure `.stylua.toml` to match your project
- There is no enforced standard library for logging; `print` is fine for scripts, but use a structured logger for applications
