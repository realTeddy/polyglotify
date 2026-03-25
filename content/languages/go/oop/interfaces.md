---
title: "Interfaces & Traits"
language: "go"
feature: "interfaces"
category: "oop"
applicable: true
---

Go interfaces are satisfied implicitly — a type implements an interface simply by having all the required methods, with no `implements` declaration needed. This makes interfaces highly composable and decoupled. Small, focused interfaces (often one or two methods) are idiomatic in Go.

## Example

```go
package main

import (
    "fmt"
    "math"
)

type Shape interface {
    Area() float64
    Perimeter() float64
}

type Circle struct{ Radius float64 }
type Rectangle struct{ Width, Height float64 }

func (c Circle) Area() float64      { return math.Pi * c.Radius * c.Radius }
func (c Circle) Perimeter() float64 { return 2 * math.Pi * c.Radius }

func (r Rectangle) Area() float64      { return r.Width * r.Height }
func (r Rectangle) Perimeter() float64 { return 2 * (r.Width + r.Height) }

func printShape(s Shape) {
    fmt.Printf("Area: %.2f, Perimeter: %.2f\n", s.Area(), s.Perimeter())
}

func main() {
    printShape(Circle{Radius: 5})
    printShape(Rectangle{Width: 4, Height: 6})
}
```

## Gotchas

- A nil interface value and an interface holding a nil pointer are not the same; an interface value is only nil when both the type and value components are nil.
- The empty interface `interface{}` (or `any` in Go 1.18+) accepts any value but requires type assertions to use, losing compile-time type safety.
- Adding a method to an existing interface breaks all types that previously satisfied it; prefer adding new interfaces over modifying existing ones.
