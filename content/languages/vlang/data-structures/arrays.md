---
title: "Arrays & Lists"
language: "vlang"
feature: "arrays"
category: "data-structures"
applicable: true
---

V arrays are dynamic, homogeneous, and generic (`[]T`). They are value types — assignment copies the array. Array literals use `[1, 2, 3]`. Elements are accessed by index (0-based); out-of-bounds access panics at runtime. V provides `map`, `filter`, `any`, `all`, and other functional methods. Fixed-size arrays (`[3]int`) are stack-allocated.

## Example

```v
fn main() {
    // Array literal
    nums := [1, 2, 3, 4, 5]

    // Access
    println(nums[0])   // 1
    println(nums.last()) // 5
    println(nums[1..3])  // [2, 3]

    // Mutable array
    mut arr := [10, 20, 30]
    arr << 40            // append
    arr.prepend(0)       // prepend
    arr.delete(1)        // delete index
    println(arr.len)

    // Functional methods
    squares := nums.map(fn(x int) int { return x * x })
    evens   := nums.filter(fn(x int) bool { return x % 2 == 0 })
    total   := nums.reduce(fn(acc int, x int) int { return acc + x }, 0)

    println(squares)    // [1, 4, 9, 16, 25]
    println(evens)      // [2, 4]
    println(total)      // 15

    // Sorting
    mut s := [3, 1, 4, 1, 5]
    s.sort()
    s.sort(a > b)   // descending

    // Fixed array (stack-allocated)
    fixed := [3]int{init: 0}  // [0, 0, 0]
}
```

## Gotchas

- Arrays are value types; passing to a function copies the array unless you pass `mut arr []T`.
- `<<` appends in place and requires the array to be `mut`.
- Fixed arrays (`[N]T`) and dynamic arrays (`[]T`) are different types and are not interchangeable.
