---
title: "Types & Type Systems"
language: "mojo"
feature: "types"
category: "basics"
applicable: true
---

Mojo has a two-tier type system: a **Python-compatible dynamic layer** (`object`, `PythonObject`) and a **high-performance static layer** with value semantics and MLIR-backed types. The static layer includes `Int`, `Float64`, `Bool`, `String`, `SIMD[DType, N]` for vectorized types, and user-defined `struct` types. `DType` is an enum of hardware numeric types (`float32`, `int64`, etc.).

## Example

```mojo
fn type_examples():
    # Numeric types
    var i: Int    = 42          # platform-width int (64-bit on 64-bit systems)
    var f: Float64 = 3.14
    var b: Bool   = True

    # SIMD types (hardware vectors)
    var v = SIMD[DType.float32, 4](1.0, 2.0, 3.0, 4.0)
    var doubled = v * 2.0       # operates on all 4 elements simultaneously

    # String
    var s = String("hello")
    var length = len(s)

    # Type checking at compile time
    # Mojo's type system prevents mixing incompatible types without explicit casts

    # StringLiteral vs String
    var literal: StringLiteral = "compile-time string"
    var dynamic: String = String("runtime string")

    # DType
    alias dtype = DType.float32
    var x = SIMD[dtype, 1](3.14)

    # Python interop
    from python import Python
    var py_list = Python.evaluate("[1, 2, 3]")
```

## Gotchas

- `Int` in Mojo is a signed integer with the platform's native width; use `SIMD[DType.int64, 1]` for an explicit 64-bit integer.
- `String` and `StringLiteral` are distinct types; `StringLiteral` is a compile-time string stored in the binary.
- Mojo's type system is still evolving rapidly; some types and traits are added or renamed between releases.
