---
title: "Exceptions & Try/Catch"
language: "mojo"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Mojo supports Python-compatible exceptions in `def` functions. `raise` throws an exception; `try`/`except`/`finally` catches it. In `fn` functions, Mojo uses a result-based error propagation with the `raises` keyword and `Error` type instead of exceptions, since exceptions interact poorly with value semantics and performance guarantees.

## Example

```mojo
# Python-compatible exceptions in def functions
def risky_divide(a: Float64, b: Float64) -> Float64:
    if b == 0.0:
        raise Error("Division by zero")
    return a / b

def main_with_exceptions():
    try:
        result = risky_divide(10.0, 0.0)
        print(result)
    except e:
        print("Caught:", str(e))
    finally:
        print("Cleanup")

# fn function with raises keyword
fn safe_sqrt(x: Float64) raises -> Float64:
    if x < 0.0:
        raise Error("sqrt of negative number: " + str(x))
    return x ** 0.5

fn main():
    try:
        var r = safe_sqrt(-1.0)
        print(r)
    except e:
        print("Error:", str(e))

    # Python interop exceptions
    from python import Python
    try:
        var py_int = Python.evaluate("int('not_a_number')")
    except:
        print("Python exception caught")
```

## Gotchas

- `fn` functions that can raise must declare `raises` in their signature; calling a `raises` function from a non-`raises` context requires a `try`/`except` block.
- Mojo's `Error` type is a simple string-based error; it is not a hierarchy like Python exceptions.
- In performance-critical `fn` code, prefer the `Optional` or result-based patterns over exception throwing for expected failure cases.
