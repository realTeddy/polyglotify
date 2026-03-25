---
title: "Arrays & Lists"
language: "mojo"
feature: "arrays"
category: "data-structures"
applicable: true
---

Mojo has several sequence types: `List[T]` (dynamic, heap-allocated, like Python `list`), `InlinedFixedVector[T, N]` (stack-allocated fixed capacity), and `StaticTuple[T, N]` (compile-time-sized stack array). `SIMD[DType, N]` is a fixed-length hardware vector for numeric workloads. Python's `list` is accessible via `PythonObject` for interop.

## Example

```mojo
fn array_examples():
    # List[T] — dynamic array
    var nums = List[Int]()
    nums.append(1)
    nums.append(2)
    nums.append(3)

    # Literal initialization
    var strs = List[String]()
    strs.append("a")
    strs.append("b")

    # Access
    print(nums[0])          # 1
    print(len(nums))        # 3

    # Iteration
    for i in range(len(nums)):
        print(nums[i])

    # Slicing (returns new List)
    # var sub = nums[1:3]   # depends on Mojo version

    # StaticTuple — fixed-size, stack-allocated
    var rgb = StaticTuple[Int, 3](255, 128, 0)
    print(rgb[0])  # 255

    # SIMD — hardware vector (key to Mojo's performance)
    var v = SIMD[DType.float32, 8](1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0)
    var doubled = v * 2.0   # vectorized multiply across all 8 lanes
    print(doubled)

    # Sum via reduction
    var total = v.reduce_add()
    print(total)  # 36.0
```

## Gotchas

- `List[T]` requires the element type `T` to be specified as a type parameter; `List` without a type argument is a compile error in `fn` context.
- `SIMD[DType, N]` requires N to be a power of 2 matching hardware capabilities; operations are literally single CPU instructions.
- Mojo's `List` is value-semantic — assigning copies the list; use references to avoid copies.
