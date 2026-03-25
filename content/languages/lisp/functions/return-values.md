---
title: "Return Values"
language: "lisp"
feature: "return-values"
category: "functions"
applicable: true
---

In Common Lisp, every form returns a value — the value of the last expression in the body. Functions can return multiple values using `values`. Callers receive multiple values with `multiple-value-bind`, `multiple-value-list`, or `nth-value`. There is no explicit `return` statement (though `return-from` exits a named block early with a value).

## Example

```common-lisp
;;; Implicit return — last form's value
(defun double (x) (* 2 x))
(double 5)   ; => 10

;;; Multiple return values
(defun divide (a b)
  (values (floor a b)    ; quotient
          (mod a b)))    ; remainder

(divide 17 5)            ; => 17, 2  (two values)

;;; Consuming multiple values
(multiple-value-bind (q r)
    (divide 17 5)
  (format t "~a quotient ~a remainder" q r))  ; "3 quotient 2 remainder"

;;; As a list
(multiple-value-list (divide 17 5))  ; => (3 2)

;;; Just the nth value
(nth-value 1 (divide 17 5))   ; => 2 (the remainder)

;;; Early exit with RETURN-FROM
(defun find-first-positive (lst)
  (dolist (x lst nil)       ; nil is the "not found" return
    (when (plusp x)
      (return-from find-first-positive x))))

(find-first-positive '(-3 -1 0 4 7))   ; => 4

;;; Standard library functions that return multiple values
(floor 3.7)      ; => 3, 0.7  (integer part and remainder)
(ceiling 3.2)    ; => 4, -0.8
(round 3.5)      ; => 4, -0.5
(gethash 'key table)  ; => value, found-p
```

## Gotchas

- If a function returning multiple values is used in a single-value context (e.g., as an argument to another function), only the first value is used and the rest are silently discarded.
- `(values)` with no arguments returns zero values; using it in a context that expects one value returns `nil`.
- `return-from` requires knowing the enclosing block's name — `defun` implicitly creates a block with the same name as the function.
