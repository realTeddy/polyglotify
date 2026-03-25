---
title: "Channels & Message Passing"
language: "lua"
feature: "channels"
category: "concurrency"
applicable: true
---

Lua has no built-in channel or message-passing primitives. Within a single thread, the producer/consumer pattern is implemented with coroutines and shared tables. Across OS threads (lua-lanes), Linda objects provide a thread-safe key-value channel.

## Example

```lua
-- Intra-coroutine channel using coroutine.yield / resume
-- The sender yields a value; the receiver resumes it.

local function makeChannel()
    local buf = {}
    local function send(v)    buf[#buf + 1] = v end
    local function receive()
        if #buf == 0 then return nil end
        local v = buf[1]
        table.remove(buf, 1)
        return v
    end
    return send, receive
end

local send, receive = makeChannel()

-- Producer coroutine
local producer = coroutine.create(function()
    for i = 1, 5 do
        send(i * 10)
        coroutine.yield()
    end
end)

-- Consumer (main thread)
for i = 1, 5 do
    coroutine.resume(producer)
    local v = receive()
    if v then print("Received:", v) end
end

-- lua-lanes Linda (shared memory channel, pseudo-code)
--[[
local lanes = require("lanes").configure()
local linda = lanes.linda()

-- In worker lane:
local function worker(ld)
    ld:send("results", compute())
end

-- In main thread:
local gen = lanes.gen("*", worker)
gen(linda)
local _, result = linda:receive("results")
print(result)
--]]
```

## Gotchas

- The table-based channel above is not thread-safe; only use it within a single OS thread with coroutines
- For multi-threaded message passing, use lua-lanes' `linda` or implement via sockets/pipes
- Coroutine-based channels are purely cooperative; a blocked coroutine suspends the entire OS thread
