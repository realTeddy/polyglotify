---
title: "Arrays & Lists"
language: "go"
feature: "arrays"
category: "data-structures"
applicable: true
---

Go has fixed-size arrays (`[N]T`) and dynamically-sized slices (`[]T`). Arrays are value types — assigning or passing an array copies all elements. Slices are the idiomatic workhorse: they are a view over an underlying array with a length and capacity, and grow automatically via `append`. Most Go code works with slices, not arrays directly.

## Example

```go
package main

import "fmt"

func main() {
    // Array (fixed size, value type)
    arr := [3]int{1, 2, 3}
    copy := arr // full copy
    copy[0] = 99
    fmt.Println(arr[0]) // 1 — unaffected

    // Slice (dynamic, reference semantics)
    s := []int{10, 20, 30}
    s = append(s, 40, 50)
    fmt.Println(s)        // [10 20 30 40 50]
    fmt.Println(s[1:3])   // [20 30]

    // Make with length and capacity
    s2 := make([]int, 0, 8)
    s2 = append(s2, 1, 2, 3)
    fmt.Println(len(s2), cap(s2)) // 3 8
}
```

## Gotchas

- Slices share the underlying array; a sub-slice modification affects the original until `append` causes a reallocation.
- `append` may or may not return the same slice — always reassign the result (`s = append(s, ...)`).
- Comparing two slices with `==` is a compile error; use `reflect.DeepEqual` or iterate manually (arrays of the same size and type can be compared with `==`).
