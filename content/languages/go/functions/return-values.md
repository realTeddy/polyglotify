---
title: "Return Values"
language: "go"
feature: "return-values"
category: "functions"
applicable: true
---

Go functions can return multiple values, which is the idiomatic way to return a result alongside an error. Return values can optionally be named, in which case they act as pre-declared variables and a bare `return` sends their current values. The convention of returning `(value, error)` is pervasive across the standard library.

## Example

```go
package main

import (
    "errors"
    "fmt"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

// Named return values
func minMax(nums []int) (min, max int) {
    min, max = nums[0], nums[0]
    for _, n := range nums[1:] {
        if n < min { min = n }
        if n > max { max = n }
    }
    return // bare return
}

func main() {
    result, err := divide(10, 3)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("%.4f\n", result)
    }

    lo, hi := minMax([]int{3, 1, 4, 1, 5, 9})
    fmt.Println(lo, hi)
}
```

## Gotchas

- Named returns improve readability in short functions but can obscure logic in long ones; bare `return` in a large function is considered poor style.
- Ignoring an error return with `_` is syntactically valid but often a bug; linters like `errcheck` flag this.
- Multiple return values are not tuples; you cannot store them in a single variable or pass them as a single argument to another function (except `...interface{}`).
