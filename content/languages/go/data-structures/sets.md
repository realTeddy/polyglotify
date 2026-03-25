---
title: "Sets"
language: "go"
feature: "sets"
category: "data-structures"
applicable: true
---

Go has no built-in set type. The idiomatic substitute is a `map[T]struct{}`, using an empty struct as the value because it occupies zero bytes. Helper operations (add, contains, delete) are just map operations. For small sets, a slice with a linear search may also be appropriate.

## Example

```go
package main

import "fmt"

func main() {
    set := make(map[string]struct{})

    // Add
    set["apple"] = struct{}{}
    set["banana"] = struct{}{}
    set["apple"] = struct{}{} // duplicate — ignored

    // Contains
    if _, ok := set["apple"]; ok {
        fmt.Println("apple is in the set")
    }

    // Delete
    delete(set, "banana")

    fmt.Println("Size:", len(set)) // 1
}
```

## Gotchas

- Using `map[T]bool` is also common but wastes a byte per entry and makes union/intersection logic slightly more error-prone than `map[T]struct{}`.
- There are no built-in union, intersection, or difference operations; they must be implemented manually.
- The `golang.org/x/exp/maps` and third-party packages offer generic set types if the boilerplate is undesirable.
