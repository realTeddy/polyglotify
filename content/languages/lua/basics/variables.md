---
title: "Variables & Declaration"
language: "lua"
feature: "variables"
category: "basics"
applicable: true
---

Lua variables are global by default. Use the `local` keyword to declare a variable scoped to the current block. Local variables are faster to access than globals and are strongly preferred in production code.

## Example

```lua
-- Global variable (avoid when possible)
globalVar = "I am global"

-- Local variable (preferred)
local name = "Alice"
local age = 30
local isActive = true

-- Multiple assignment
local x, y, z = 1, 2, 3

-- Swap values idiomatically
x, y = y, x

-- Uninitialized local is nil
local uninit
print(uninit)  -- nil

-- Constants are a convention only (no const keyword)
local MAX_RETRIES = 3
```

## Gotchas

- Forgetting `local` silently creates a global, which can cause hard-to-track bugs across files
- Lua has no block-scoped `const`; constants are just a naming convention
- Multiple assignment is right-evaluated first: `a, b = b, a` swaps safely
