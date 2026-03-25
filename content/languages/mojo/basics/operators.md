---
title: "Operators"
language: "mojo"
feature: "operators"
category: "basics"
applicable: true
---

Mojo operators are Python-compatible for basic arithmetic, comparison, and boolean logic. Operators are implemented as dunder methods (`__add__`, `__mul__`, etc.) and can be overloaded via `struct` definitions. SIMD types support all arithmetic operators in a vectorized fashion. Mojo adds `@` for matrix multiplication (as in Python 3.5+).

## Example

```mojo
fn operator_examples():
    # Arithmetic
    var a = 10
    var b = 3
    print(a + b)   # 13
    print(a - b)   # 7
    print(a * b)   # 30
    print(a // b)  # 3  (floor division)
    print(a % b)   # 1
    print(a ** b)  # 1000

    # Float division
    print(10.0 / 3.0)  # 3.3333...

    # Comparison
    print(a > b)   # True
    print(a == b)  # False
    print(a != b)  # True

    # Boolean
    print(True and False)  # False
    print(True or False)   # True
    print(not True)        # False

    # Bitwise
    print(0b1010 & 0b1100)  # 8
    print(0b1010 | 0b1100)  # 14
    print(1 << 4)           # 16

    # SIMD vectorized operators
    var v1 = SIMD[DType.float32, 4](1.0, 2.0, 3.0, 4.0)
    var v2 = SIMD[DType.float32, 4](10.0, 20.0, 30.0, 40.0)
    var sum = v1 + v2    # [11, 22, 33, 44] — vectorized
    var prod = v1 * v2   # [10, 40, 90, 160]
```

## Gotchas

- `/` performs floor division for integers (like Python 2), not true division — use `10.0 / 3` for float result.
- Operator overloading is supported via `fn __add__(self, other: Self) -> Self` in a `struct`.
- SIMD operators apply element-wise across the vector; this is the key to Mojo's performance for numeric workloads.
