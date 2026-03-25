---
title: "Function Declaration"
language: "mojo"
feature: "declaration"
category: "functions"
applicable: true
---

Mojo has two function declaration keywords: `fn` for strict, statically-typed functions (Mojo's high-performance mode) and `def` for Python-compatible, dynamically-typed functions. `fn` functions require type annotations, use value semantics by default, and generate optimized machine code. `def` functions allow omitting types and mirror Python behavior.

## Example

```mojo
# fn — strict, statically typed (preferred for performance)
fn add(x: Int, y: Int) -> Int:
    return x + y

# def — Python-compatible (dynamic, flexible)
def greet(name):
    print("Hello,", name)

# fn with no return value
fn log(message: String):
    print("[LOG]", message)

# Recursive fn
fn factorial(n: Int) -> Int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Generic fn (parameterized at compile time)
fn max_val[T: Comparable](a: T, b: T) -> T:
    if a > b:
        return a
    return b

fn main():
    print(add(3, 4))         # 7
    greet("Alice")           # Hello, Alice
    print(factorial(10))     # 3628800
    print(max_val(3, 7))     # 7
    print(max_val(3.14, 2.71))  # 3.14
```

## Gotchas

- `fn` functions are strict: all parameters must be typed, and passing the wrong type is a compile error.
- `def` functions behave like Python and can accept untyped arguments; they are slower than `fn` for numeric code.
- `fn` functions take arguments by immutable reference by default; use `inout` or `owned` to change ownership semantics.
