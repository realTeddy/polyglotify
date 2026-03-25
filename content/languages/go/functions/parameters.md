---
title: "Parameters & Arguments"
language: "go"
feature: "parameters"
category: "functions"
applicable: true
---

Go passes all arguments by value. To mutate a caller's variable you pass a pointer explicitly. Consecutive parameters sharing a type can be written compactly. Variadic functions accept a variable number of arguments using `...T` as the last parameter, and a slice can be spread into a variadic call with `slice...`.

## Example

```go
package main

import "fmt"

func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func increment(n *int) {
    *n++
}

func main() {
    fmt.Println(sum(1, 2, 3, 4))

    nums := []int{10, 20, 30}
    fmt.Println(sum(nums...)) // spread slice

    x := 5
    increment(&x)
    fmt.Println(x) // 6
}
```

## Gotchas

- Slices and maps passed as arguments share the underlying data with the caller; assigning a new slice to the parameter does not affect the caller, but modifying elements does.
- There are no named/keyword arguments in Go; arguments must always be positional.
- `...T` is only allowed as the final parameter; using it in other positions is a compile error.
