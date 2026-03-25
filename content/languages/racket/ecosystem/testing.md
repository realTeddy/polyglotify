---
title: "Testing"
language: "racket"
feature: "testing"
category: "ecosystem"
applicable: true
---

Racket's standard testing library is **RackUnit** (`rackunit`). It provides `check-equal?`, `check-true`, `check-exn`, and other assertion forms. Tests are grouped into `test-case` and `test-suite` blocks. `raco test` discovers and runs all test files automatically. RackUnit integrates with DrRacket's GUI test runner.

## Example

```racket
#lang racket
(require rackunit
         rackunit/text-ui)

(define (factorial n)
  (if (<= n 1) 1 (* n (factorial (- n 1)))))

(define factorial-tests
  (test-suite "factorial"
    (test-case "base cases"
      (check-equal? (factorial 0) 1)
      (check-equal? (factorial 1) 1))

    (test-case "positive numbers"
      (check-equal? (factorial 5) 120)
      (check-equal? (factorial 10) 3628800))

    (test-case "raises on negative"
      (check-exn exn:fail?
                 (lambda () (factorial -1))))))

; Run and print results
(run-tests factorial-tests)
```

```bash
# Run all tests in current package
raco test .

# Run a specific file
raco test tests/factorial-test.rkt

# Verbose output
raco test --submodule test .
```

## Gotchas

- `check-equal?` uses `equal?` for comparison; use `check-eqv?` or `check-eq?` for numeric/identity checks.
- RackUnit test failures are non-fatal by default; the suite continues after a failure.
- Tests can also be placed in a `test` submodule: `(module+ test (require rackunit) (check-equal? ...))` — these run with `raco test` but not during normal `require`.
