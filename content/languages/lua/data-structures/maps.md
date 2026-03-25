---
title: "Maps & Dictionaries"
language: "lua"
feature: "maps"
category: "data-structures"
applicable: true
---

Lua tables serve as hash maps when keyed with non-integer keys. They are the universal data structure in Lua, used for objects, namespaces, and dictionaries. Keys can be any value except `nil`.

## Example

```lua
-- Table as a map
local person = {
    name  = "Alice",
    age   = 30,
    email = "alice@example.com",
}

-- Access
print(person.name)         -- Alice
print(person["age"])       -- 30  (bracket syntax for dynamic keys)

-- Insert / update
person.city = "Berlin"
person["age"] = 31

-- Delete (set to nil)
person.email = nil

-- Check existence
if person.city ~= nil then
    print("Has city:", person.city)
end

-- Iterate all key-value pairs (order not guaranteed)
for k, v in pairs(person) do
    print(k, v)
end

-- Nested maps
local config = {
    database = { host = "localhost", port = 5432 },
    app      = { debug = true, port = 8080 },
}
print(config.database.host)  -- localhost

-- Dynamic key
local key = "name"
print(person[key])  -- Alice
```

## Gotchas

- `pairs` iteration order is **not deterministic**; do not rely on insertion order
- Setting a key to `nil` removes it; there is no `delete` function
- Integer keys coexist with string keys; a table can be both an array and a map simultaneously
