---
title: "Testing"
language: "odin"
feature: "testing"
category: "ecosystem"
applicable: true
---

Odin has a built-in testing framework in `core:testing`. Test procedures are annotated with `@(test)` and accept a `^testing.T` parameter. Run tests with `odin test`. The `testing` package provides `expect`, `expect_value`, `fail`, `error`, and logging helpers.

## Example

```odin
package math_test

import "core:testing"

// The package under test
add :: proc(a, b: int) -> int { return a + b }
divide :: proc(a, b: int) -> (int, bool) {
    if b == 0 { return 0, false }
    return a / b, true
}

@(test)
test_add :: proc(t: ^testing.T) {
    testing.expect_value(t, add(2, 3), 5)
    testing.expect_value(t, add(-1, 1), 0)
    testing.expect_value(t, add(0, 0), 0)
}

@(test)
test_divide_ok :: proc(t: ^testing.T) {
    result, ok := divide(10, 2)
    testing.expect(t, ok, "Expected divide to succeed")
    testing.expect_value(t, result, 5)
}

@(test)
test_divide_by_zero :: proc(t: ^testing.T) {
    _, ok := divide(10, 0)
    testing.expect(t, !ok, "Expected divide by zero to fail")
}
```

```sh
odin test .            # Run all tests in current package
odin test . -v         # Verbose output
odin test ./...        # Run tests in all sub-packages (shell glob)
```

## Gotchas

- Test files can be in the same package as production code, or in a separate `_test` package.
- `testing.expect` does not stop the test — call `testing.fail_now` or return early for that.
- Tests run sequentially by default; there is no parallel test execution built in.
- Benchmarking support is available via `testing.Benchmark` and `@(benchmark)`.
