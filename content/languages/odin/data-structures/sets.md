---
title: "Sets"
language: "odin"
feature: "sets"
category: "data-structures"
applicable: true
---

Odin does not have a built-in set type, but provides two idiomatic alternatives: `bit_set` for small enum-based sets (very efficient), and `map[T]struct{}` for general-purpose sets of arbitrary keys. `bit_set` is the preferred choice when the universe of values is a known enum.

## Example

```odin
package main

import "core:fmt"

Permission :: enum { Read, Write, Execute }
PermSet :: bit_set[Permission]

main :: proc() {
    // --- bit_set (preferred for enum-based sets) ---
    user_perms: PermSet = {.Read, .Write}
    root_perms: PermSet = {.Read, .Write, .Execute}

    // Membership
    fmt.println(.Read in user_perms)     // true
    fmt.println(.Execute in user_perms)  // false

    // Set operations (bit manipulation)
    union_perms := user_perms + root_perms      // union
    inter_perms := user_perms & root_perms      // intersection
    diff_perms  := root_perms - user_perms      // difference

    fmt.println(union_perms)
    fmt.println(inter_perms)
    fmt.println(diff_perms)

    // Add / remove
    user_perms += {.Execute}
    user_perms -= {.Write}
    fmt.println(user_perms)

    // --- map[T]struct{} for general sets ---
    string_set := make(map[string]struct{})
    defer delete(string_set)

    string_set["apple"] = {}
    string_set["banana"] = {}

    fmt.println("apple" in string_set)   // true
    fmt.println("cherry" in string_set)  // false

    delete_key(&string_set, "apple")
}
```

## Gotchas

- `bit_set` only works with enum types or integer ranges — it is backed by a single integer bitmask and is extremely fast.
- For `map`-based sets, the value type `struct{}` occupies zero bytes.
- There is no standard library `Set` type — you build it yourself with the above patterns.
- `bit_set` operations use `+` (union), `-` (difference), `&` (intersection), not named methods.
