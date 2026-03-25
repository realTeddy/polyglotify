---
title: "Return Values"
language: "mojo"
feature: "return-values"
category: "functions"
applicable: true
---

Mojo functions return a single value specified after `->` in the signature. Multiple values are returned via tuples or structs. `fn` functions that don't return anything omit the `->` clause (implicitly returns `None`). Mojo supports named result variables declared after `->` in some versions.

## Example

```mojo
# Single return value
fn square(x: Int) -> Int:
    return x * x

# Multiple return via tuple
fn divmod(a: Int, b: Int) -> (Int, Int):
    return a // b, a % b

# Optional return (using Optional type)
fn find(arr: List[Int], target: Int) -> Optional[Int]:
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return None

# Early return
fn first_positive(nums: List[Int]) -> Optional[Int]:
    for n in nums:
        if n[] > 0:
            return n[]
    return None

fn main():
    print(square(5))       # 25

    var q, r = divmod(17, 5)
    print(q, r)            # 3 2

    var idx = find(List[Int](10, 20, 30), 20)
    if idx:
        print("found at index", idx.value())
    else:
        print("not found")
```

## Gotchas

- Mojo's `Optional[T]` wraps a value that may be absent; check with an `if` before calling `.value()`.
- Returning tuples `(T1, T2)` is the idiomatic way to return multiple values; destructure with `var a, b = fn()`.
- A `fn` without a `->` return type implicitly returns `None` (like Python `None`).
