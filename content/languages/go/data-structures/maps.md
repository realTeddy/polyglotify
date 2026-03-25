---
title: "Maps & Dictionaries"
language: "go"
feature: "maps"
category: "data-structures"
applicable: true
---

Go's built-in `map` type is an unordered hash map. Maps must be initialized before use (via `make` or a literal); reading from a nil map returns the zero value, but writing to a nil map panics. The two-value assignment form `v, ok := m[key]` distinguishes a missing key from a key mapped to the zero value.

## Example

```go
package main

import "fmt"

func main() {
    // Map literal
    scores := map[string]int{
        "Alice": 95,
        "Bob":   87,
    }

    scores["Carol"] = 91
    delete(scores, "Bob")

    if score, ok := scores["Alice"]; ok {
        fmt.Println("Alice:", score)
    }

    // Iterate (order is random)
    for name, s := range scores {
        fmt.Println(name, s)
    }
}
```

## Gotchas

- Map iteration order is intentionally randomized on each run to prevent reliance on ordering.
- Maps are not safe for concurrent reads and writes; use `sync.Map` or a `sync.RWMutex` when sharing across goroutines.
- Struct values stored in maps cannot have their fields updated in place; you must fetch, modify, and re-assign the whole struct.
