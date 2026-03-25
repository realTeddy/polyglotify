---
title: "Testing"
language: "vlang"
feature: "testing"
category: "ecosystem"
applicable: true
---

V has a built-in testing framework. Test files must end with `_test.v`. Test functions must start with `test_` and take no parameters. Assertions use `assert`. `v test` discovers and runs all test files. Tests can check for panics using `?` syntax. The framework is simple and fast.

## Example

```v
// math_test.v
module main

fn add(x int, y int) int {
    return x + y
}

fn factorial(n int) int {
    if n <= 1 { return 1 }
    return n * factorial(n - 1)
}

fn test_add() {
    assert add(2, 3) == 5
    assert add(0, 0) == 0
    assert add(-1, 1) == 0
}

fn test_factorial() {
    assert factorial(0) == 1
    assert factorial(1) == 1
    assert factorial(5) == 120
    assert factorial(10) == 3628800
}

fn test_add_message() {
    result := add(2, 3)
    assert result == 5, 'expected 5 but got $result'
}
```

```bash
# Run all tests in current directory
v test .

# Run tests in a specific file
v test math_test.v

# Run with verbose output
v -stats test .

# Run a specific test function
v test . -run test_factorial
```

## Gotchas

- Test files and functions follow strict naming conventions: `_test.v` suffix and `test_` prefix.
- `assert` prints a helpful error with the actual values when it fails (not just "assertion failed").
- V's test framework is minimalist; there are no built-in mocking, fixture, or parametrize features.
