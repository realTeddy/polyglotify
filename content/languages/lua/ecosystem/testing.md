---
title: "Testing"
language: "lua"
feature: "testing"
category: "ecosystem"
applicable: true
---

**Busted** is the most popular Lua testing framework, providing BDD-style `describe`/`it` blocks, assertions, spies, and stubs. **LuaUnit** is a simpler xUnit-style alternative.

## Example

```lua
-- spec/math_spec.lua  (Busted)
local mymath = require("myproject.math")

describe("mymath", function()
    describe("add", function()
        it("adds two positive numbers", function()
            assert.are.equal(5, mymath.add(2, 3))
        end)

        it("handles zero", function()
            assert.are.equal(0, mymath.add(0, 0))
        end)
    end)

    describe("divide", function()
        it("returns a float", function()
            assert.is_near(3.333, mymath.divide(10, 3), 0.001)
        end)

        it("errors on division by zero", function()
            assert.has_error(function()
                mymath.divide(1, 0)
            end, "division by zero")
        end)
    end)
end)
```

```bash
# Install busted
luarocks install busted

# Run all tests
busted

# Run specific file
busted spec/math_spec.lua

# Verbose output
busted --verbose

# With coverage (requires luacov)
busted --coverage
luacov
cat luacov.report.out
```

```lua
-- LuaUnit alternative
local lu = require("luaunit")
TestMath = {}
function TestMath:testAdd()
    lu.assertEquals(mymath.add(2, 3), 5)
end
os.exit(lu.LuaUnit.run())
```

## Gotchas

- Busted automatically discovers files matching `*_spec.lua` or `*_test.lua` in the `spec/` directory
- Use `before_each` and `after_each` hooks to set up and tear down shared state
- `assert.spy` and `assert.stub` require the `luassert` library (bundled with busted)
