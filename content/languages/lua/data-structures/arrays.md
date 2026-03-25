---
title: "Arrays & Lists"
language: "lua"
feature: "arrays"
category: "data-structures"
applicable: true
---

Lua has no dedicated array type. Arrays are tables with consecutive integer keys starting at 1. The standard library's `table` module provides manipulation functions. The length operator `#` works correctly on sequences (no holes).

## Example

```lua
-- Array literal (1-based indexing)
local fruits = {"apple", "banana", "cherry"}
print(fruits[1])  -- apple
print(#fruits)    -- 3

-- Append
fruits[#fruits + 1] = "date"
table.insert(fruits, "elderberry")  -- append
table.insert(fruits, 2, "avocado")  -- insert at position 2

-- Remove
table.remove(fruits, 2)  -- removes "avocado"
local last = table.remove(fruits)  -- removes and returns last element

-- Iteration
for i, v in ipairs(fruits) do
    print(i, v)
end

-- Concatenate strings from array
print(table.concat(fruits, ", "))

-- Stack (LIFO)
local stack = {}
table.insert(stack, "a")
table.insert(stack, "b")
print(table.remove(stack))  -- "b"

-- Queue (FIFO) with table.remove(q, 1) -- O(n); prefer offset trick for perf
local queue = {}
table.insert(queue, "first")
table.insert(queue, "second")
print(table.remove(queue, 1))  -- "first"
```

## Gotchas

- Arrays are **1-indexed** by default; `arr[0]` is valid but breaks `#` and `ipairs`
- `#` is only reliable on sequences (no nil holes); with holes, use an explicit counter
- `ipairs` stops at the first `nil`; `pairs` iterates all keys (unordered)
