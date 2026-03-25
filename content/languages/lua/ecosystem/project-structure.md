---
title: "Project Structure"
language: "lua"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

Lua has no mandated project layout, but the community follows conventions influenced by LuaRocks. Modules live under a directory that mirrors the require path; a rockspec at the root describes the package.

## Example

```
myproject/
├── myproject-1.0-1.rockspec   -- LuaRocks package descriptor
├── myproject/                 -- source tree (matches require path)
│   ├── init.lua               -- require("myproject") loads this
│   ├── utils.lua              -- require("myproject.utils")
│   └── net/
│       └── http.lua           -- require("myproject.net.http")
├── spec/                      -- tests (busted convention)
│   ├── utils_spec.lua
│   └── http_spec.lua
├── bin/                       -- executable scripts
│   └── myapp
└── README.md
```

```lua
-- myproject/init.lua
local M = {}
M.version = "1.0.0"

function M.hello(name)
    return "Hello, " .. name
end

return M

-- usage
local mp = require("myproject")
print(mp.hello("World"))
```

```lua
-- myproject/utils.lua
local utils = {}

function utils.trim(s)
    return s:match("^%s*(.-)%s*$")
end

return utils
```

## Gotchas

- Lua's `require` uses `.` as a path separator (maps to `/` on disk); use `require("myproject.utils")` not `require("myproject/utils")`
- `package.path` must include the project root for relative requires to work; set it or use a launcher script
- For scripts run directly, `arg[0]` gives the script path; use it to set `package.path` relative to the script
