---
title: "Async/Await"
language: "lua"
feature: "async-await"
category: "concurrency"
applicable: true
---

Lua has no native `async/await` syntax, but coroutines provide the same cooperative-concurrency semantics. Frameworks like OpenResty (nginx), LÖVE, and libraries such as `cqueues` or `lua-async` implement async I/O on top of coroutines. The pattern mirrors async/await closely.

## Example

```lua
-- Coroutine-based async simulation
-- In real code, the scheduler is provided by the framework (e.g., OpenResty, cqueues)

local function asyncTask(name, steps)
    return coroutine.create(function()
        for i = 1, steps do
            print(name .. ": step " .. i)
            coroutine.yield()  -- "await" — suspend until resumed
        end
        return name .. " done"
    end)
end

-- Simple round-robin scheduler
local tasks = {
    asyncTask("A", 3),
    asyncTask("B", 2),
}

local running = true
while running do
    running = false
    local next = {}
    for _, t in ipairs(tasks) do
        local ok, val = coroutine.resume(t)
        if coroutine.status(t) ~= "dead" then
            running = true
            next[#next+1] = t
        else
            print("Finished:", val)
        end
    end
    tasks = next
end

-- OpenResty / ngx.timer style (pseudo-code)
--[[
local function fetchData(url)
    local res = ngx.location.capture(url)  -- yields internally
    return res.body
end

local co = coroutine.wrap(function()
    local body = fetchData("/api/data")
    ngx.say(body)
end)
co()
--]]
```

## Gotchas

- Lua coroutines are cooperative, not preemptive; a coroutine that never yields blocks the entire thread
- `coroutine.yield` cannot cross C call boundaries in standard Lua (5.1); LuaJIT and Lua 5.2+ relax this
- For production async I/O, use a framework that integrates an event loop (libuv, epoll, etc.) with the coroutine scheduler
