---
title: "Maps & Dictionaries"
language: "nim"
feature: "maps"
category: "data-structures"
applicable: true
---

Nim's standard dictionary is `Table[K, V]` (hash map) from `std/tables`. `OrderedTable[K, V]` preserves insertion order. `CountTable[K]` is a frequency counter. `toTable` converts a sequence of pairs. All table types support `[]`, `hasKey`, `del`, and iteration.

## Example

```nim
import std/tables

# Create
var t = initTable[string, int]()

# Or from pairs
let scores = {"Alice": 95, "Bob": 87, "Carol": 92}.toTable

# Insert / update
t["name"]  = 1
t["value"] = 42
t["name"]  = 2   # update

# Access
echo t["name"]                          # 2
echo t.getOrDefault("missing", -1)      # -1 (safe access)

# Membership
echo t.hasKey("name")   # true

# Delete
t.del("value")

# Iterate
for key, val in scores:
  echo key, " => ", val

# Keys and values
echo scores.keys.toSeq
echo scores.values.toSeq

# Merge
var m1 = {"a": 1, "b": 2}.toTable
let m2 = {"b": 3, "c": 4}.toTable
for k, v in m2:
  m1[k] = v
echo m1

# OrderedTable
var ot = initOrderedTable[string, int]()
ot["z"] = 1; ot["a"] = 2; ot["m"] = 3
for k, v in ot:
  echo k, ": ", v   # prints in insertion order
```

## Gotchas

- `t["missing"]` raises a `KeyError`; use `getOrDefault` or check with `hasKey` first.
- `Table` is a value type; passing it to a function copies it unless you use `var Table[K,V]`.
- `initTable[K, V]()` creates an empty table; the `toTable` conversion is for initializing from literal pairs.
