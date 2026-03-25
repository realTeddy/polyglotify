---
title: "Exceptions & Try/Catch"
language: "scheme"
feature: "exceptions"
category: "error-handling"
applicable: true
---

R7RS Scheme provides a condition system via `raise`, `error`, `guard` (the equivalent of try/catch), and condition predicates. `guard` catches conditions raised with `raise` or `error`. R6RS has a more elaborate condition hierarchy. `with-exception-handler` is the lower-level primitive. `dynamic-wind` provides cleanup (like `finally`) even when continuations are involved.

## Example

```scheme
;;; Raising an error
(define (safe-divide a b)
  (when (= b 0)
    (error "Division by zero" a b))
  (/ a b))

;;; GUARD — like try/catch (R7RS)
(guard (exn
        ((string? (condition/report-string exn))
         (display "Caught: ")
         (display (condition/report-string exn))
         (newline)
         #f))
  (safe-divide 10 0))

;;; More complete guard with condition types
(guard (exn
        ((error-object? exn)
         (format #t "Error: ~a~%" (error-object-message exn))
         (format #t "Irritants: ~a~%" (error-object-irritants exn))
         'error)
        (#t
         (display "Unknown exception")
         'unknown))
  (error "Bad input" 42 "invalid"))

;;; with-exception-handler (lower level)
(with-exception-handler
  (lambda (exn)
    (display "Handler called")
    (newline))
  (lambda ()
    (raise "something went wrong")))

;;; dynamic-wind (ensure cleanup — like finally)
(define (with-open-file path thunk)
  (let ((port (open-input-file path)))
    (dynamic-wind
      (lambda () #f)                ; before
      (lambda () (thunk port))      ; body
      (lambda () (close-port port)))))  ; after (always runs)
```

## Gotchas

- R7RS's `guard` catches conditions raised by `raise` (any value) and by `error` (an error object). The condition variable in `guard` is bound to whatever was raised.
- `error` creates an error object with a message string and optional irritant values. `error-object?`, `error-object-message`, and `error-object-irritants` inspect it.
- If no guard clause matches and you re-raise with `raise`, the original handler (possibly the top-level error reporter) is called.
