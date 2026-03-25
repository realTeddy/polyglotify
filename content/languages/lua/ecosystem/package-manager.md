---
title: "Package Manager"
language: "lua"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

**LuaRocks** is the standard package manager for Lua. It installs packages called *rocks* from a central repository. Each rock can include Lua modules, C extensions, and metadata.

## Example

```bash
# Install LuaRocks (varies by OS)
# macOS:   brew install luarocks
# Ubuntu:  apt install luarocks
# Windows: download installer from luarocks.org

# Install a package globally
luarocks install luasocket

# Install a specific version
luarocks install penlight 1.13.1

# Install locally to a project tree (--tree)
luarocks install --tree ./lua_modules inspect

# List installed rocks
luarocks list

# Search the repository
luarocks search json

# Show info about a rock
luarocks show luasocket

# Uninstall
luarocks remove luasocket

# Declare dependencies in a rockspec file
-- myproject-1.0-1.rockspec
package = "myproject"
version = "1.0-1"
source  = { url = "..." }
dependencies = {
    "lua >= 5.3",
    "luasocket >= 3.0",
    "penlight >= 1.13",
}
```

```lua
-- After installing locally, load the module
package.path = "./lua_modules/share/lua/5.4/?.lua;" .. package.path
local inspect = require("inspect")
print(inspect({1, 2, 3}))
```

## Gotchas

- Global vs local installs: system-wide installs may require `sudo`; prefer `--tree ./lua_modules` for project isolation
- LuaRocks manages per-Lua-version directories; ensure the version matches your interpreter
- No built-in lockfile like `package-lock.json`; pin versions in your rockspec for reproducibility
