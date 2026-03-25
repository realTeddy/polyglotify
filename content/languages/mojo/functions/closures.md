---
title: "Closures & Lambdas"
language: "mojo"
feature: "closures"
category: "functions"
applicable: true
---

Mojo supports closures as first-class values via `fn` or `def` expressions. Captured variables follow ownership rules. Mojo closures can capture by reference (for `borrowed`) or by copy (for owned values). Higher-order functions accept function types as parameters. Mojo's closure support is more limited than Python's due to ownership semantics.

## Example

```mojo
fn apply(f: fn(Int) -> Int, x: Int) -> Int:
    return f(x)

fn main():
    # Lambda-style closure using captured variable
    var factor = 3

    # Closure as a def (Python-compatible, captures freely)
    def triple(x: Int) -> Int:
        return x * factor

    print(apply(triple, 7))  # 21

    # Inline function passed directly
    fn double(x: Int) -> Int:
        return x * 2

    print(apply(double, 5))  # 10

    # List comprehension (Python-compatible in def context)
    var nums = [1, 2, 3, 4, 5]
    var squares = [x * x for x in nums]
    print(squares)

    # Functional operations
    var evens = list(filter(lambda x: x % 2 == 0, nums))
    var doubled = list(map(lambda x: x * 2, nums))
    print(evens)    # [2, 4]
    print(doubled)  # [2, 4, 6, 8, 10]
```

## Gotchas

- Mojo closures defined with `fn` follow strict ownership rules; capturing a `var` by mutable reference requires `inout` semantics which closures do not currently support in all contexts.
- `def` closures are more flexible (Python-like) but sacrifice performance guarantees.
- Mojo's closure and lambda support is still maturing; complex closure patterns may require `def` functions rather than `fn`.
