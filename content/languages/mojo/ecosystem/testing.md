---
title: "Testing"
language: "mojo"
feature: "testing"
category: "ecosystem"
applicable: true
---

Mojo has a built-in `testing` module with `assert_equal`, `assert_true`, `assert_false`, `assert_almost_equal`, and `assert_raises`. Tests are `fn` or `def` functions that call these assertions. The `mojo test` command discovers and runs test files. Integration with pytest is possible via Python interop.

## Example

```mojo
# test/test_math.mojo
from testing import assert_equal, assert_true, assert_almost_equal, assert_raises

fn add(x: Int, y: Int) -> Int:
    return x + y

fn factorial(n: Int) -> Int:
    if n <= 1: return 1
    return n * factorial(n - 1)

fn safe_sqrt(x: Float64) raises -> Float64:
    if x < 0.0:
        raise Error("negative input")
    return x ** 0.5

fn test_add():
    assert_equal(add(2, 3), 5)
    assert_equal(add(0, 0), 0)
    assert_equal(add(-1, 1), 0)

fn test_factorial():
    assert_equal(factorial(0), 1)
    assert_equal(factorial(5), 120)
    assert_equal(factorial(10), 3628800)

fn test_sqrt():
    assert_almost_equal(safe_sqrt(4.0), 2.0, atol=1e-9)
    assert_almost_equal(safe_sqrt(2.0), 1.41421356, atol=1e-6)

fn test_sqrt_raises():
    with assert_raises(contains="negative"):
        _ = safe_sqrt(-1.0)

fn main():
    test_add()
    test_factorial()
    test_sqrt()
    test_sqrt_raises()
    print("All tests passed!")
```

```bash
# Run a test file
mojo test/test_math.mojo

# Run via magic
magic run mojo test/test_math.mojo
```

## Gotchas

- Mojo's test runner is basic compared to pytest; there is no automatic test discovery for functions named `test_*` yet — call them explicitly or use `main()`.
- `assert_almost_equal` is essential for floating-point tests; never use `assert_equal` with floats.
- For complex test scenarios, using Python's `pytest` via interop provides fixtures, parametrize, and rich reporting.
