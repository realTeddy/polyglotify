---
title: "Result Types"
language: "lisp"
feature: "result-types"
category: "error-handling"
applicable: false
---

Common Lisp does not have a Result/Option type in the functional sense. The idiomatic approach is to use the condition system (`error`/`handler-case`) for error handling, or to return multiple values where the second value is a status indicator (as `gethash` does with its `found-p` second value). Some libraries define `Either`-style types, but they are not idiomatic Common Lisp — the condition system is far more expressive.

## Example

```common-lisp
;;; The Common Lisp idiom: multiple values as optional result
;;; Analogous to Result<T, E>

(defun safe-divide (a b)
  "Returns (values result nil) on success, (values nil error-string) on failure."
  (if (zerop b)
      (values nil "Division by zero")
      (values (/ a b) nil)))

;; The gethash pattern (standard CL idiom)
(multiple-value-bind (result error)
    (safe-divide 10 3)
  (if error
      (format t "Error: ~a~%" error)
      (format t "Result: ~a~%" result)))

;;; Some libraries define a Result type:
;;; (from the "serapeum" utility library)
;; (deftype result ()
;;   '(or (cons (eql :ok) t) (cons (eql :err) t)))
;; (defun ok  (v) (cons :ok  v))
;; (defun err (e) (cons :err e))

(defun ok  (v) (cons :ok  v))
(defun err (e) (cons :err e))

(defun result-bind (r f)
  (if (eq (car r) :ok)
      (funcall f (cdr r))
      r))

(defun safe-sqrt (x)
  (if (minusp x)
      (err (format nil "Cannot sqrt negative: ~a" x))
      (ok  (sqrt x))))

;; Chaining
(result-bind (safe-sqrt -4)
  (lambda (v) (ok (* v 2))))   ; => (:ERR . "Cannot sqrt negative: -4")
```

## Gotchas

- The multiple-values pattern (`gethash`, `floor`, `round`) is more idiomatic than a Result wrapper in Common Lisp.
- Using `ignore-errors` returns `(values nil condition)` when an error occurs, which is the closest built-in to an Option type.
- The condition system's restart mechanism provides richer recovery options than a simple Result type — rather than propagating an error up, you can offer multiple recovery strategies at the call site.
