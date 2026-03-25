---
title: "Threads"
language: "lua"
feature: "threads"
category: "concurrency"
applicable: true
---

Standard Lua is single-threaded. True OS threads require either the `lua-llthreads2` library, LuaJIT's `lanes` library, or embedding Lua in a multi-threaded host. Within a single OS thread, Lua coroutines provide cooperative multitasking. Each coroutine gets its own stack but shares the same global state.

## Example

```lua
-- Coroutines as lightweight cooperative "threads"
local function producer()
    local items = {"apple", "banana", "cherry"}
    for _, item in ipairs(items) do
        coroutine.yield(item)
    end
end

local co = coroutine.create(producer)

while true do
    local ok, value = coroutine.resume(co)
    if not ok or value == nil then break end
    print("Consumed:", value)
end

-- Coroutine status
local co2 = coroutine.create(function()
    coroutine.yield()
end)
print(coroutine.status(co2))          -- suspended
coroutine.resume(co2)
print(coroutine.status(co2))          -- suspended (yielded again? no — it yielded once)
coroutine.resume(co2)
print(coroutine.status(co2))          -- dead

-- coroutine.wrap for iterator-style usage
local function range(n)
    return coroutine.wrap(function()
        for i = 1, n do coroutine.yield(i) end
    end)
end

for v in range(5) do io.write(v .. " ") end
print()  -- 1 2 3 4 5

-- lua-lanes (external library) for true threading:
--[[
local lanes = require "lanes".configure()
local function worker(x) return x * 2 end
local gen = lanes.gen("*", worker)
local future = gen(21)
print(future[1])  -- 42  (blocks until done)
--]]
```

## Gotchas

- Coroutines are **not** OS threads; they do not run in parallel and provide no speedup on multi-core CPUs
- `coroutine.resume` on a dead coroutine returns `false, "cannot resume dead coroutine"`
- Shared mutable state across OS threads (via lua-lanes or similar) requires careful synchronisation; each lane typically gets its own Lua state to avoid data races
