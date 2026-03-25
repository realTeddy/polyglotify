---
title: "Exceptions & Try/Catch"
language: "racket"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Racket uses `raise` to throw any value as an exception and `with-handlers` to catch exceptions. The built-in `error` function raises an `exn:fail` struct with a message. Exception types form a hierarchy of structs descended from `exn`. `guard-exn`, `parameterize`, and `dynamic-wind` provide additional control over exception semantics.

## Example

```racket
#lang racket

; Basic error
(define (divide a b)
  (when (= b 0)
    (error "divide" "division by zero: ~a / ~a" a b))
  (/ a b))

; with-handlers — like try/catch
(with-handlers ([exn:fail? (lambda (e)
                              (printf "Caught: ~a\n"
                                      (exn-message e))
                              -1)])
  (divide 10 0))
; prints "Caught: divide: division by zero: 10 / 0"
; => -1

; Custom exception type
(struct exn:app:not-found exn:fail (key)
  #:extra-constructor-name make-not-found)

(define (lookup ht key)
  (hash-ref ht key
    (lambda ()
      (raise (make-not-found
               (format "key not found: ~a" key)
               (current-continuation-marks)
               key)))))

(with-handlers ([exn:app:not-found?
                 (lambda (e) (exn:app:not-found-key e))])
  (lookup (hash 'a 1) 'b))
; => 'b  (the missing key)
```

## Gotchas

- `with-handlers` handlers are tested in order; the first matching predicate wins.
- Unlike `try/catch`, `with-handlers` does not unwind the stack before testing predicates — the stack is still live when the predicate is evaluated.
- Use `dynamic-wind` for guaranteed cleanup (equivalent to `finally`).
