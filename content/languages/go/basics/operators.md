---
title: "Operators"
language: "go"
feature: "operators"
category: "basics"
applicable: true
---

Go supports the standard arithmetic (`+`, `-`, `*`, `/`, `%`), comparison (`==`, `!=`, `<`, `>`, `<=`, `>=`), logical (`&&`, `||`, `!`), and bitwise operators. The language also has `&^` (bit-clear/AND NOT) which is uncommon in other languages. Go does not have a ternary operator (`? :`).

## Example

```go
package main

import "fmt"

func main() {
    a, b := 10, 3
    fmt.Println(a+b, a-b, a*b, a/b, a%b)

    // Bitwise
    fmt.Println(a & b)  // 2
    fmt.Println(a | b)  // 11
    fmt.Println(a ^ b)  // XOR: 9
    fmt.Println(a &^ b) // bit-clear: 8

    // Increment/decrement are statements, not expressions
    a++
    b--
    fmt.Println(a, b)
}
```

## Gotchas

- `++` and `--` are statements, not expressions; `x = a++` is a compile error.
- There is no ternary operator; use a full `if/else` block instead.
- Integer division truncates toward zero; `-7 / 2` equals `-3`, not `-4`.
