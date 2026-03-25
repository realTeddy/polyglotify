---
title: "Testing"
language: "lisp"
feature: "testing"
category: "ecosystem"
applicable: true
---

The most popular Common Lisp testing framework is **FiveAM**. **Parachute**, **prove**, and **rove** are modern alternatives. All provide test suites, test cases, and assertion macros. Tests are run interactively in the REPL as well as in CI. ASDF integrates test running via `(asdf:test-system :my-system)` when a `:test-system` is configured.

## Example

```lisp
;;; Using FiveAM
;;; (ql:quickload :fiveam)
(use-package :fiveam)

;;; Define a test suite
(def-suite my-project-suite
  :description "Tests for my-project")

(in-suite my-project-suite)

;;; Test cases
(test addition
  (is (= 4 (+ 2 2)))
  (is (= 0 (+ -1 1)))
  (is-false (= 5 (+ 2 2))))

(test string-ops
  (is (string= "hello world" (concatenate 'string "hello" " " "world")))
  (is (= 5 (length "hello"))))

(test error-handling
  (signals division-by-zero (/ 1 0))
  (finishes (ignore-errors (/ 1 0))))

;;; Run tests
(run! 'my-project-suite)     ; run all tests in suite, print results
(run! 'addition)             ; run a specific test

;;; Output:
;;;
;;; Running suite MY-PROJECT-SUITE (5 checks)
;;; .....
;;; Did 5 checks.
;;;    Pass: 5 (100%)
;;;    Skip: 0 ( 0%)
;;;    Fail: 0 ( 0%)

;;; In CI / ASDF
;;; (asdf:test-system :my-project)
;;; Configure in .asd with :in-order-to ((test-op (test-op :my-project/tests)))
```

## Gotchas

- FiveAM tests defined with `test` are registered globally by name — running the same test file twice in a REPL redefines the test (no stale test accumulation, unlike some frameworks).
- `run!` returns a list of test results and also prints a summary; use `run` (without `!`) to get only the results without printing.
- Interactive REPL-driven development means tests are typically run incrementally as code is developed, not just in a final CI batch — this is a significant workflow difference from compiled languages.
