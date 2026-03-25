---
title: "Structs & Classes"
language: "go"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Go uses structs as its primary composite data type. There are no classes; behavior is added by defining methods with a receiver on a struct type. Structs are value types by default — assignment copies all fields. Methods that mutate state use pointer receivers (`*T`).

## Example

```go
package main

import (
    "fmt"
    "math"
)

type Circle struct {
    X, Y   float64
    Radius float64
}

func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

func (c *Circle) Scale(factor float64) {
    c.Radius *= factor
}

func main() {
    c := Circle{X: 0, Y: 0, Radius: 5}
    fmt.Printf("Area: %.2f\n", c.Area())
    c.Scale(2)
    fmt.Printf("New radius: %.1f\n", c.Radius)
}
```

## Gotchas

- Mixing pointer and value receivers on the same type is legal but confusing; the convention is to use one or the other consistently.
- Struct embedding (anonymous fields) provides composition and method promotion, which is Go's alternative to class inheritance.
- Unexported fields (lowercase names) are inaccessible outside the package, including by the `encoding/json` package unless custom marshalling is provided.
