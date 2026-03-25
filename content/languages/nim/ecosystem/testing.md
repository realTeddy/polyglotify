---
title: "Testing"
language: "nim"
feature: "testing"
category: "ecosystem"
applicable: true
---

Nim has two testing frameworks: `unittest` (built-in, simple `test` blocks) and `testament` (the official test runner used by Nim itself, supports expected output, compilation errors, etc.). `unittest` is suitable for unit tests; `testament` for integration and compiler tests. Run with `nimble test` or `nim c -r tests/test.nim`.

## Example

```nim
# tests/test_math.nim
import unittest

proc factorial(n: int): int =
  if n <= 1: 1
  else: n * factorial(n - 1)

proc clamp(x, lo, hi: int): int =
  max(lo, min(hi, x))

suite "factorial":
  test "base cases":
    check factorial(0) == 1
    check factorial(1) == 1

  test "positive numbers":
    check factorial(5) == 120
    check factorial(6) == 720

  test "is positive":
    check factorial(10) > 0

suite "clamp":
  test "below range":
    check clamp(-5, 0, 10) == 0

  test "above range":
    check clamp(15, 0, 10) == 10

  test "within range":
    check clamp(5, 0, 10) == 5

# Run: nim c -r tests/test_math.nim
# Or:  nimble test
```

## Gotchas

- `check` evaluates an expression and reports a failure with the expression source if it's false.
- `expect` inside a `test` block tests that an exception is raised: `expect ValueError: discard "abc".parseInt`.
- `unittest` tests run in the order declared; each `suite` groups related tests.
