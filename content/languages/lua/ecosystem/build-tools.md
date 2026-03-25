---
title: "Build Tools"
language: "lua"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Lua projects typically use **LuaRocks** for packaging and distribution, and shell scripts or **Makefiles** for build automation. For embedding Lua in C projects, the Lua source compiles with a single `make` command. **amalg.lua** can bundle multiple modules into a single file for distribution.

## Example

```makefile
# Makefile for a Lua project
LUA     ?= lua
BUSTED  ?= busted
LUAROCKS ?= luarocks

.PHONY: test lint install clean

test:
	$(BUSTED) --verbose

lint:
	luacheck src/ spec/

install:
	$(LUAROCKS) make

clean:
	rm -rf lua_modules/ luacov.*.out *.rock
```

```bash
# Build and install a rock from a rockspec
luarocks make myproject-1.0-1.rockspec

# Pack into a .rock archive for distribution
luarocks pack myproject-1.0-1.rockspec

# Bundle all requires into one file with amalg.lua
luarocks install amalg
amalg.lua -o bundle.lua -s main.lua myproject myproject.utils

# Compile Lua to bytecode (speeds startup slightly)
luac -o app.luac main.lua
lua app.luac

# Check Lua syntax without running
luac -p main.lua && echo "Syntax OK"
```

```lua
-- myproject-1.0-1.rockspec (build descriptor)
package    = "myproject"
version    = "1.0-1"
source     = { url = "git://github.com/user/myproject", tag = "v1.0" }
description = { summary = "My Lua project" }
dependencies = { "lua >= 5.3", "luasocket" }
build = {
    type    = "builtin",
    modules = {
        ["myproject"]       = "myproject/init.lua",
        ["myproject.utils"] = "myproject/utils.lua",
    },
}
```

## Gotchas

- `luac` bytecode is **not portable** across Lua versions or CPU architectures; distribute source, not bytecode
- LuaRocks `make` reads the first `.rockspec` in the current directory; ensure only one is present
- `luacheck` (static analyser) is separate from LuaRocks but highly recommended for catching globals and type errors
