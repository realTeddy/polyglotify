---
title: "Types & Type Systems"
language: "nim"
feature: "types"
category: "basics"
applicable: true
---

Nim is statically typed with strong type inference. Primitive types include `int`, `int8`–`int64`, `uint`–`uint64`, `float`, `float32`, `float64`, `bool`, `char`, and `string`. Nim supports distinct types (newtype pattern), enums, objects, tuples, and ref types (heap-allocated). The type system includes subrange types, set types, and generic types.

## Example

```nim
# Basic types
let i: int    = 42
let f: float  = 3.14
let b: bool   = true
let c: char   = 'A'
let s: string = "hello"

# Distinct type — wraps another type, prevents mixing
type Meters   = distinct float
type Seconds  = distinct float

let d = 100.0.Meters
let t = 9.8.Seconds
# let ratio = d / t  # compile error — Meters / Seconds is not defined

# Enum
type Color = enum
  Red, Green, Blue

let col = Green
echo col         # Green

# Type introspection
echo typeof(42)          # int
echo typeof("hello")     # string

# Subrange type
type SmallInt = range[0..255]
let small: SmallInt = 100

# Conversion
let n: int = 10
let fl = float(n)
echo fl   # 10.0
```

## Gotchas

- `int` size depends on the platform (32-bit on 32-bit systems, 64-bit on 64-bit systems); use `int64` for portable code.
- Distinct types do not inherit operations from their base type; define operators explicitly with `{.borrow.}` pragma or manually.
- Nim does not allow implicit narrowing conversions; use explicit `T(value)` syntax.
