---
title: "Testing"
language: "dlang"
feature: "testing"
category: "ecosystem"
applicable: true
---

D has built-in unit testing via `unittest` blocks. Any `unittest` block in any source file is compiled and run when the program is built with `-unittest` (or via `dub test`). The standard `assert` is the primary assertion. The `std.exception` module provides `assertThrown` and `assertNotThrown`. Third-party frameworks like `unit-threaded` offer richer test organisation.

## Example

```d
// source/myapp/math.d
module myapp.math;

int factorial(int n)
{
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

unittest
{
    assert(factorial(0) == 1);
    assert(factorial(1) == 1);
    assert(factorial(5) == 120);
}

// Testing exceptions
import std.exception : assertThrown;

int safeDivide(int a, int b)
{
    if (b == 0) throw new Exception("division by zero");
    return a / b;
}

unittest
{
    assert(safeDivide(10, 2) == 5);
    assertThrown!Exception(safeDivide(10, 0));
}
```

```bash
dub test               # run all unittests
dub test --coverage    # with code coverage report
dmd -unittest -run source/myapp/math.d   # compile and run tests inline
```

## Gotchas

- `unittest` blocks are compiled into the binary only when `-unittest` is passed; they are stripped in release builds.
- Each `unittest` block runs independently — there is no shared setup/teardown unless you use a third-party framework.
- `assert` in non-`-release` builds throws `AssertError` (an `Error`, not `Exception`) on failure; in `-release` builds asserts are removed entirely.
- `unit-threaded` supports parallel test execution, fixtures, and named test cases — worth adding for larger projects.
