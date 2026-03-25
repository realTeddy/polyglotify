---
title: "Maps & Dictionaries"
language: "vlang"
feature: "maps"
category: "data-structures"
applicable: true
---

V maps are generic hash maps with the type `map[Key]Value`. Keys must be `string`, integer types, or types implementing hashing. Map literals use `{'key': value}`. Maps are reference types. Accessing a missing key returns the zero value of the value type. The `or` keyword handles missing keys explicitly.

## Example

```v
fn main() {
    // Map literal
    scores := {
        'alice': 95,
        'bob':   87,
        'carol': 92,
    }

    // Access
    println(scores['alice'])  // 95

    // Safe access with or
    val := scores['dave'] or { 0 }
    println(val)  // 0

    // Mutable map
    mut m := map[string]int{}
    m['x'] = 10
    m['y'] = 20
    m.delete('x')

    // Check existence
    if 'y' in m {
        println('y exists: ${m['y']}')
    }

    // Iteration
    for k, v in scores {
        println('$k: $v')
    }

    // Keys and values
    println(scores.keys())    // ['alice', 'bob', 'carol']
    println(scores.values())  // [95, 87, 92]

    // Map size
    println(scores.len)
}
```

## Gotchas

- Accessing a missing key does not panic — it returns the zero value of the type (`0` for `int`, `''` for `string`).
- Use `key in map` to test existence before accessing, or use `map[key] or { default }`.
- Maps are reference types; assigning a map to another variable shares the underlying data.
