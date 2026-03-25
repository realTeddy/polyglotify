---
title: "Maps & Dictionaries"
language: "dlang"
feature: "maps"
category: "data-structures"
applicable: true
---

D's built-in associative array type uses the syntax `Value[Key]`. Any hashable type can be a key. Associative arrays are hash-map backed, with average O(1) lookup. The `in` operator returns a pointer to the value (or `null`), enabling safe presence checks without double-lookup.

## Example

```d
import std.stdio;

void main()
{
    // Declaration and literal
    int[string] scores = ["Alice": 95, "Bob": 87, "Carol": 92];

    // Insert / update
    scores["Dave"] = 78;
    scores["Alice"] = 99;

    // Access (throws RangeError if key missing)
    writeln(scores["Bob"]);

    // Safe access with `in`
    if (auto p = "Eve" in scores)
        writeln(*p);
    else
        writeln("Eve not found");

    // Default value via .get
    writeln(scores.get("Eve", 0));

    // Iteration
    foreach (name, score; scores)
        writef("%s: %d\n", name, score);

    // Keys and values
    writeln(scores.keys);
    writeln(scores.values);

    // Length and removal
    writeln(scores.length);
    scores.remove("Dave");
    writeln(scores.length);

    // Membership check
    writeln("Alice" in scores ? "present" : "absent");
}
```

## Gotchas

- Accessing a missing key with `[]` throws a `core.exception.RangeError` at runtime; always use `in` for conditional access.
- `in` returns a pointer (`Value*`), not a `bool` — use `if (auto p = key in map)` and then `*p` to read the value.
- Associative arrays are reference types; assigning one to another copies only the reference, not the data.
- There is no guaranteed iteration order.
