---
title: "Maps & Dictionaries"
language: "odin"
feature: "maps"
category: "data-structures"
applicable: true
---

Odin has a built-in `map` type: `map[KeyType]ValueType`. Maps are heap-allocated hash tables that must be initialized with `make` and freed with `delete`. The `in` operator checks key existence; accessing a missing key returns the zero value of the value type. Maps are reference-like (the map value holds a pointer internally).

## Example

```odin
package main

import "core:fmt"

main :: proc() {
    // Create a map
    scores := make(map[string]int)
    defer delete(scores)

    // Insert
    scores["Alice"] = 95
    scores["Bob"]   = 82
    scores["Carol"] = 88

    // Lookup (returns zero value if missing)
    fmt.println(scores["Alice"])  // 95
    fmt.println(scores["Dave"])   // 0 (not found)

    // Check existence
    val, ok := scores["Alice"]
    fmt.println(val, ok)   // 95 true

    val2, ok2 := scores["Dave"]
    fmt.println(val2, ok2) // 0 false

    // Delete a key
    delete_key(&scores, "Bob")

    // Iterate
    for key, value in scores {
        fmt.printf("%s: %d\n", key, value)
    }

    // Map literal
    capitals := map[string]string{
        "France" = "Paris",
        "Japan"  = "Tokyo",
        "Brazil" = "Brasília",
    }
    defer delete(capitals)
    fmt.println(len(capitals))
}
```

## Gotchas

- Maps must be initialized with `make` before use — a nil map panics on write.
- Accessing a missing key returns the zero value silently (not an error). Always use the two-value form `val, ok := m[key]` to distinguish zero from missing.
- Maps must be freed with `delete` — they are not garbage collected.
- Map iteration order is **not guaranteed** to be consistent between runs.
