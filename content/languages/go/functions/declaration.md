---
title: "Function Declaration"
language: "go"
feature: "declaration"
category: "functions"
applicable: true
---

Functions in Go are declared with the `func` keyword, followed by the name, parameter list, and optional return type(s). Functions are first-class values and can be assigned to variables or passed as arguments. Exported functions (visible outside the package) begin with an uppercase letter.

## Example

```go
package main

import "fmt"

func add(a, b int) int {
    return a + b
}

func greet(name string) {
    fmt.Printf("Hello, %s!\n", name)
}

// Functions are first-class
func apply(f func(int, int) int, x, y int) int {
    return f(x, y)
}

func main() {
    fmt.Println(add(3, 4))
    greet("Go")
    fmt.Println(apply(add, 10, 5))
}
```

## Gotchas

- Go has no function overloading; each function name in a package must be unique.
- Methods on types are functions with a receiver, not declared inside a class body; they can be defined anywhere in the same package.
- A function that is never called but declared at the package level does not cause a compile error (only unused *variables* do).
