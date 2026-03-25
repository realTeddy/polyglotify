---
title: "Tuples"
language: "mojo"
feature: "tuples"
category: "data-structures"
applicable: true
---

Mojo supports tuples as heterogeneous, fixed-size value types. Tuple types are expressed as `(T1, T2, ...)`. `StaticTuple[T, N]` is a homogeneous fixed-size array on the stack. Python-style tuple packing/unpacking works in `def` functions and at the top level.

## Example

```mojo
fn tuple_examples():
    # Tuple literal
    var pair = (1, "hello")

    # Access by index
    print(pair.get[0, Int]())    # 1
    print(pair.get[1, String]()) # hello

    # Multiple return values (tuple unpacking)
    var q, r = divmod_fn(17, 5)
    print(q, r)  # 3 2

    # Python-style tuple in def context
def py_style():
    t = (1, 2.0, "three")
    a, b, c = t
    print(a, b, c)

    # Nested tuple
    point3d = ((1, 2), 3)
    x, y = point3d[0]
    z = point3d[1]

fn divmod_fn(a: Int, b: Int) -> (Int, Int):
    return a // b, a % b

fn main():
    tuple_examples()
    py_style()
```

## Gotchas

- Accessing tuple elements in `fn` functions requires `tuple.get[index, Type]()` with explicit type; in `def` functions, Python-style indexing works.
- `StaticTuple[T, N]` is homogeneous (all elements same type); use a tuple `(T1, T2)` for heterogeneous data.
- Tuple unpacking in `fn` functions uses multiple assignment: `var a, b = fn_returning_tuple()`.
