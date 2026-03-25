---
title: "Common Patterns"
language: "mojo"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Mojo idioms center on **performance**: use `fn` over `def`, `SIMD` for number crunching, `parallelize` for multi-core, `alias` for compile-time constants, and traits for zero-overhead polymorphism. Python interop is used for non-performance-critical code. The `@parameter` decorator enables metaprogramming and compile-time specialization.

## Example

```mojo
from algorithm import parallelize, vectorize
from math import sqrt

# SIMD vectorized computation — key Mojo pattern
fn vectorized_norm(data: List[Float64]) -> Float64:
    alias simd_w = 4
    var sum_sq = SIMD[DType.float64, simd_w](0.0)

    var i = 0
    while i + simd_w <= len(data):
        var chunk = SIMD[DType.float64, simd_w].load(data, i)
        sum_sq += chunk * chunk
        i += simd_w

    # Handle remainder
    var tail = 0.0
    while i < len(data):
        tail += data[i] * data[i]
        i += 1

    return sqrt(sum_sq.reduce_add() + tail)

# Compile-time specialization
fn process[dtype: DType, width: Int](data: SIMD[dtype, width]) -> SIMD[dtype, width]:
    return data * data + data

# Python interop for non-critical code
fn load_data_from_csv(path: String) -> List[Float64]:
    from python import Python
    var pd = Python.import_module("pandas")
    var df = pd.read_csv(path)
    var result = List[Float64]()
    # convert pandas column to Mojo list...
    return result

# Ownership pattern — move instead of copy for large data
fn process_owned(owned data: List[Float64]) -> List[Float64]:
    # data is moved in, we own it
    for i in range(len(data)):
        data[i] = data[i] * 2.0
    return data  # moved out
```

## Gotchas

- Always use `fn` for performance-critical code; `def` introduces dynamic overhead.
- Profile before optimizing; `parallelize` has scheduling overhead — for small arrays, sequential SIMD is faster.
- The `@parameter` decorator marks compile-time-evaluated code; it is essential for generic SIMD widths and loop unrolling.
