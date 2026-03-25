---
title: "Result Types"
language: "scheme"
feature: "result-types"
category: "error-handling"
applicable: false
---

Standard Scheme has no Result/Option monad. Idiomatic Scheme error handling uses the condition system (`guard`/`raise`/`error`). A common convention for functions that may fail is to return `#f` on failure and the result on success (the "false-or-value" pattern), or return multiple values where the second is a success flag. SRFI-189 defines a portable `Maybe` and `Either` type for Scheme.

## Example

```scheme
;;; Idiomatic: return #f on failure (the common Scheme convention)
(define (safe-divide a b)
  (if (= b 0) #f (/ a b)))

(let ((result (safe-divide 10 3)))
  (if result
      (display result)
      (display "Division failed")))

;;; Multiple values for success/failure
(define (safe-parse-number str)
  (guard (exn (#t (values #f exn)))
    (values (string->number str) #f)))

(define-values (n err)
  (safe-parse-number "42abc"))
;; n = #f, err = <condition>

;;; SRFI-189 Maybe/Either (portable if available)
;;; (import (srfi 189))
;; (just 42)          ; => Maybe containing 42
;; (nothing)          ; => empty Maybe
;; (right 42)         ; => Right Either (success)
;; (left "error msg") ; => Left Either (failure)

;; Chaining with >>= (monadic bind)
;; (maybe-bind (just 4)
;;             (lambda (x) (if (> x 0) (just (sqrt x)) (nothing))))
;; => (just 2.0)

;;; Simple Result type using tagged lists (portable)
(define (ok v)   (list 'ok v))
(define (fail e) (list 'fail e))
(define (ok? r)   (eq? (car r) 'ok))
(define (fail? r) (eq? (car r) 'fail))
(define (result-value r) (cadr r))

(define (safe-sqrt x)
  (if (negative? x)
      (fail "Cannot sqrt negative")
      (ok (sqrt x))))

(let ((r (safe-sqrt -4)))
  (if (ok? r)
      (display (result-value r))
      (display (string-append "Error: " (result-value r)))))
```

## Gotchas

- The `#f`-on-failure pattern is the most common Scheme convention (used by `assoc`, `member`, `string->number`, etc.) but it cannot distinguish between "not found" and a legitimate `#f` value.
- `string->number` returns `#f` on parse failure, not an exception — this is Scheme's most common built-in use of the false-or-value pattern.
- SRFI-189 is available in some implementations but not universal; for truly portable Result types, the tagged-list approach above works everywhere.
