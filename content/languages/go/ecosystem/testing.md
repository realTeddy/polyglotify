---
title: "Testing"
language: "go"
feature: "testing"
category: "ecosystem"
applicable: true
---

Go has a built-in testing framework in the `testing` package. Test files end in `_test.go` and test functions are named `TestXxx`. The `go test` command discovers and runs tests automatically. Table-driven tests are the idiomatic pattern for testing multiple cases. The `testify` library is popular for assertions, and `go test -race` runs the data-race detector.

## Example

```go
// math_test.go
package math

import "testing"

func Add(a, b int) int { return a + b }

func TestAdd(t *testing.T) {
    cases := []struct {
        a, b, want int
    }{
        {1, 2, 3},
        {0, 0, 0},
        {-1, 1, 0},
    }
    for _, tc := range cases {
        got := Add(tc.a, tc.b)
        if got != tc.want {
            t.Errorf("Add(%d, %d) = %d; want %d", tc.a, tc.b, got, tc.want)
        }
    }
}

func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(1, 2)
    }
}
```

## Gotchas

- `t.Fatal` and `t.Error` differ in that `Fatal` stops the current test function immediately; use `Fatal` for setup failures and `Error` to continue collecting failures.
- Test files with `package foo_test` (external test package) can only access exported symbols — use this to test the public API in isolation.
- `go test ./...` runs all tests in the module; `-count=1` disables the test cache for fresh runs.
