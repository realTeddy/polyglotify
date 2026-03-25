---
title: "Types & Type Systems"
language: "odin"
feature: "types"
category: "basics"
applicable: true
---

Odin is strongly and statically typed with no implicit conversions between distinct types. Built-in numeric types are sized and explicit (`i32`, `f64`, `u8`, etc.). Odin has distinct type definitions (`distinct`), enums, structs, unions, bit sets, and a `typeid` for runtime type information. The `any` type is an interface-like escape hatch.

## Example

```odin
package main

import "core:fmt"

// Enum
Direction :: enum { North, South, East, West }

// Struct
Point :: struct {
    x, y: f64,
}

// Union (tagged)
Value :: union {
    int,
    f64,
    string,
}

// Distinct type (not interchangeable with base type)
Meters :: distinct f64
Seconds :: distinct f64

// Bit set
Permissions :: bit_set[enum { Read, Write, Execute }]

main :: proc() {
    p := Point{x: 1.0, y: 2.0}
    d := Direction.North
    v: Value = 42           // tagged union
    dist: Meters = 100.0

    perm := Permissions{.Read, .Write}
    fmt.println(p, d, v, dist, perm)

    // Type switch on union
    switch val in v {
    case int:    fmt.println("int:", val)
    case f64:    fmt.println("float:", val)
    case string: fmt.println("string:", val)
    }
}
```

## Gotchas

- `int` and `i32` are distinct types — you cannot mix them without explicit cast.
- `distinct` creates a new nominal type that cannot be used interchangeably with its base type, even if layout-compatible.
- Odin's `union` is a tagged discriminated union by default — safer than C unions.
- `any` holds a pointer to data and a `typeid`; using it bypasses static type checking.
