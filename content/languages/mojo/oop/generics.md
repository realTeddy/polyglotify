---
title: "Generics"
language: "mojo"
feature: "generics"
category: "oop"
applicable: true
---

Mojo generics use compile-time **parameters** in square brackets `[T: Trait]`. This enables zero-overhead abstraction through monomorphization — the compiler generates specialized code for each type. Both functions and structs can be parameterized. Compile-time integer parameters (`[N: Int]`) enable fixed-size generic types like `SIMD[DType, N]`.

## Example

```mojo
# Generic function with trait constraint
fn maximum[T: Comparable](a: T, b: T) -> T:
    if a > b:
        return a
    return b

# Generic struct
struct Pair[T: Copyable]:
    var first:  T
    var second: T

    fn __init__(inout self, first: T, second: T):
        self.first  = first
        self.second = second

    fn swap(self) -> Self:
        return Pair(self.second, self.first)

# Value parameter (Int at compile time)
struct FixedBuffer[size: Int]:
    var data: StaticTuple[Int, size]

    fn __init__(inout self):
        self.data = StaticTuple[Int, size]()

    fn capacity(self) -> Int:
        return size

fn main():
    print(maximum(3, 7))          # 7
    print(maximum(3.14, 2.71))    # 3.14
    print(maximum("apple", "banana"))  # banana

    var p = Pair(10, 20)
    var swapped = p.swap()
    print(swapped.first, swapped.second)  # 20 10

    var buf = FixedBuffer[128]()
    print(buf.capacity())  # 128

    # SIMD is a built-in parameterized type
    var v = SIMD[DType.float32, 4](1.0, 2.0, 3.0, 4.0)
```

## Gotchas

- Mojo generics are monomorphized — each unique set of type parameters generates a separate compiled function/type, similar to C++ templates.
- Compile-time parameters `[N: Int]` must be compile-time constants; passing runtime values is a compile error.
- Trait constraints on type parameters are optional; unconstrained `[T]` can only call methods common to all types (currently very limited).
