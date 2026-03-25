---
title: "Tuples"
language: "go"
feature: "tuples"
category: "data-structures"
applicable: false
---

Go does not have a tuple type. The closest equivalent is multiple return values from a function, which can be immediately destructured into named variables. For grouping heterogeneous values as data (not just return values), the idiomatic approach is to define a named struct.

## Example

```go
package main

import "fmt"

// Named struct instead of a tuple
type Point struct {
    X, Y float64
}

// Multiple return as a "temporary tuple"
func swap(a, b string) (string, string) {
    return b, a
}

func main() {
    x, y := swap("hello", "world")
    fmt.Println(x, y)

    p := Point{3.0, 4.0}
    fmt.Println(p.X, p.Y)
}
```

## Gotchas

- Multiple return values cannot be stored in a single variable, passed as one argument, or nested — they are only usable at the call site via immediate assignment.
- Using `interface{}` slices or `any` slices as ad-hoc tuples loses type safety and requires type assertions to retrieve values.
