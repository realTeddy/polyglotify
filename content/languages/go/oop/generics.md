---
title: "Generics"
language: "go"
feature: "generics"
category: "oop"
applicable: true
---

Go added generics in version 1.18 via type parameters. Type parameters appear in square brackets after the function or type name and are constrained by interfaces. The `any` constraint accepts any type; `comparable` requires types that support `==`. The `golang.org/x/exp/constraints` package provides common numeric constraints.

## Example

```go
package main

import "fmt"

// Generic function
func Map[T, U any](s []T, f func(T) U) []U {
    result := make([]U, len(s))
    for i, v := range s {
        result[i] = f(v)
    }
    return result
}

// Generic type
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(v T)  { s.items = append(s.items, v) }
func (s *Stack[T]) Pop() T    { n := len(s.items) - 1; v := s.items[n]; s.items = s.items[:n]; return v }
func (s *Stack[T]) Len() int  { return len(s.items) }

func main() {
    doubled := Map([]int{1, 2, 3}, func(n int) int { return n * 2 })
    fmt.Println(doubled)

    var st Stack[string]
    st.Push("a")
    st.Push("b")
    fmt.Println(st.Pop())
}
```

## Gotchas

- Type inference works for functions but not for generic type instantiation; `Stack[string]{}` requires the explicit type argument.
- Generic functions cannot use operators like `+` or `<` unless the type parameter is constrained to types that support them.
- Method type parameters are not supported; only the receiver type can be parameterized, which limits some patterns available in other languages.
