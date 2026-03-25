---
title: "Common Patterns"
language: "lua"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Lua idioms are shaped by its minimalist design: everything is a table or a function. Key patterns include the module pattern, the `nil or default` idiom, method chaining, memoisation, and the class/prototype pattern.

## Example

```lua
-- 1. Module pattern
local M = {}

function M.greet(name)
    return "Hello, " .. name
end

return M  -- always return the module table

-- 2. Default parameter with or
local function connect(opts)
    local host    = opts.host    or "localhost"
    local port    = opts.port    or 3306
    local timeout = opts.timeout or 30
    return host .. ":" .. port
end

-- 3. Memoisation
local function memoize(fn)
    local cache = {}
    return function(x)
        if cache[x] == nil then cache[x] = fn(x) end
        return cache[x]
    end
end

local slowFib
slowFib = memoize(function(n)
    if n < 2 then return n end
    return slowFib(n-1) + slowFib(n-2)
end)
print(slowFib(30))  -- 832040

-- 4. Method chaining (fluent interface)
local Builder = {}
Builder.__index = Builder
function Builder.new()     return setmetatable({parts={}}, Builder) end
function Builder:add(s)    self.parts[#self.parts+1] = s; return self end
function Builder:build()   return table.concat(self.parts, " ") end

print(Builder.new():add("Hello"):add("World"):build())

-- 5. Callable table (__call metamethod)
local Formatter = setmetatable({}, {
    __call = function(_, template, ...)
        return string.format(template, ...)
    end
})
print(Formatter("Pi is %.4f", math.pi))

-- 6. Ternary idiom
local x = 5
local label = (x > 0) and "positive" or "non-positive"
```

## Gotchas

- The `and/or` ternary fails when the "true" branch is `false`; use an explicit `if` in that case
- Always `return M` at the end of a module file; forgetting it makes `require` return `true`
- Memoisation with `nil` results is tricky because `cache[x] == nil` is always true; use a sentinel value
