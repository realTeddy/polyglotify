---
title: "Testing"
language: "scheme"
feature: "testing"
category: "ecosystem"
applicable: true
---

Scheme testing is implementation-dependent but several portable frameworks exist. **SRFI-64** defines a standard test API supported by many implementations. **Gauche** ships `gautest`. **Racket** has `rackunit`. **Chicken** has the `test` egg. Simple testing with `assert` or a minimal `check` macro is common in portable R7RS code.

## Example

```scheme
;;; SRFI-64 — portable test framework
;;; (import (srfi 64))

(test-begin "My project tests")

(test-equal "addition" 5 (+ 2 3))
(test-equal "string concat" "hello world"
            (string-append "hello" " " "world"))
(test-assert "positive number" (positive? 42))
(test-error  "division by zero" (/ 1 0))

(test-group "list operations"
  (test-equal "length" 3 (length '(a b c)))
  (test-equal "reverse" '(3 2 1) (reverse '(1 2 3)))
  (test-equal "map" '(2 4 6) (map (lambda (x) (* 2 x)) '(1 2 3))))

(test-end "My project tests")

;;; Minimal check macro (portable, no library needed)
(define-syntax check
  (syntax-rules (=>)
    ((check expr => expected)
     (let ((actual expr))
       (if (equal? actual expected)
           (begin (display "PASS: ") (display 'expr) (newline))
           (begin (display "FAIL: ") (display 'expr)
                  (display " => ") (display actual)
                  (display " (expected: ") (display expected) (display ")")
                  (newline)))))))

(check (+ 1 2)          => 3)
(check (reverse '(1 2)) => '(2 1))
(check (string-length "hello") => 5)
```

## Gotchas

- SRFI-64 availability varies — check `(import (srfi 64))` works in your implementation (Guile, MIT Scheme, Gauche, and others support it; Chicken requires `(import (test))`).
- `test-error` tests that an exception is raised; the exact condition type check varies by implementation.
- The minimal `check` macro above is zero-dependency and works in any R7RS implementation, making it ideal for portable libraries that include their own tests.
