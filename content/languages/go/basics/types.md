---
title: "Types & Type Systems"
language: "go"
feature: "types"
category: "basics"
applicable: true
---

Go is statically typed with a strong type system and no implicit conversions. Built-in types include integers (`int`, `int8`–`int64`), unsigned integers, floats, `complex`, `bool`, `string`, `byte` (alias for `uint8`), and `rune` (alias for `int32`). Custom types are created with the `type` keyword and are distinct from their underlying type even when structurally identical.

## Example

```go
package main

import "fmt"

type Celsius float64
type Fahrenheit float64

func main() {
    var temp Celsius = 100
    // fahrenheit := Fahrenheit(temp) // explicit conversion required
    fmt.Printf("Type: %T, Value: %v\n", temp, temp)

    var i int = 42
    var f float64 = float64(i) // explicit conversion
    fmt.Println(i, f)
}
```

## Gotchas

- There are no implicit numeric conversions; `int` and `int64` are distinct even on 64-bit platforms, and mixing them without an explicit cast is a compile error.
- `string` is an immutable sequence of bytes (UTF-8), not characters; iterating with `range` yields `rune` values decoded from UTF-8, not raw bytes.
- Named types based on the same underlying type are not interchangeable without an explicit conversion, which prevents accidental unit mixing (e.g., metres vs. feet).
