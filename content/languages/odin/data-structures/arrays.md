---
title: "Arrays & Lists"
language: "odin"
feature: "arrays"
category: "data-structures"
applicable: true
---

Odin distinguishes between **fixed-size arrays** (`[N]T`), **slices** (`[]T` — a view into memory), and **dynamic arrays** (`[dynamic]T`). There is no built-in linked list. Arrays are value types (copied on assignment); slices are reference-like (pointer + length). Dynamic arrays require explicit allocation and deallocation.

## Example

```odin
package main

import "core:fmt"

main :: proc() {
    // Fixed-size array (value type)
    arr: [5]int = {1, 2, 3, 4, 5}
    arr[0] = 10
    fmt.println(arr)
    fmt.println(len(arr))  // 5

    // Slice (view into array or heap memory)
    s := arr[1:4]  // {2, 3, 4}
    fmt.println(s)

    // Dynamic array (heap-allocated, growable)
    dyn := make([dynamic]int)
    defer delete(dyn)

    append(&dyn, 10)
    append(&dyn, 20)
    append(&dyn, 30)
    fmt.println(dyn[:])  // as slice

    // Pop
    val := pop(&dyn)
    fmt.println(val, len(dyn))  // 30, 2

    // 2D array
    matrix: [3][3]int
    matrix[1][2] = 42
    fmt.println(matrix)

    // Iterate
    for v, i in arr {
        fmt.printf("[%d]=%d ", i, v)
    }
}
```

## Gotchas

- Fixed arrays are **value types** — assigning one copies the entire array. Use slices or pointers to avoid copies.
- Slices do not own their memory — the backing array must outlive the slice.
- Dynamic arrays must be freed with `delete(dyn)` — there is no garbage collector.
- Out-of-bounds access panics in debug mode; in release builds with `-no-bounds-check`, it is undefined behavior.
- `append` takes a pointer to the dynamic array (`&dyn`) because it may reallocate.
