---
title: "Variables & Declaration"
language: "go"
feature: "variables"
category: "basics"
applicable: true
---

Go offers two ways to declare variables: the `var` keyword with an explicit type, and the short declaration operator `:=` which infers the type from the assigned value. Variables declared with `var` at the package level are zero-valued by default. The `:=` form is only available inside functions.

## Example

```go
package main

import "fmt"

var globalCount int = 0

func main() {
    var name string = "Alice"
    age := 30
    var x, y int = 1, 2

    fmt.Println(name, age, x, y, globalCount)
}
```

## Gotchas

- Declaring a variable with `:=` and never using it is a compile error — Go enforces that every declared local variable is used.
- `:=` inside an `if` or `for` block creates a new variable scoped to that block, shadowing any outer variable of the same name.
- The zero value for numeric types is `0`, for strings `""`, for booleans `false`, and for pointers/slices/maps/interfaces `nil`.
