---
title: "Function Declaration"
language: "lisp"
feature: "declaration"
category: "functions"
applicable: true
---

Functions in Common Lisp are defined with `defun` at the top level or `flet`/`labels` for local functions. Functions are first-class values; `#'function-name` retrieves the function object. `lambda` creates anonymous functions. `labels` (unlike `flet`) allows mutual and self-recursion within the local scope. Functions defined with `defun` are stored in the global function namespace, separate from the variable namespace.

## Example

```common-lisp
;;; Top-level function definition
(defun greet (name)
  "Return a greeting string."   ; docstring (optional)
  (format nil "Hello, ~a!" name))

(greet "World")   ; => "Hello, World!"

;;; Local functions with FLET (no mutual recursion)
(flet ((square (x) (* x x))
       (cube   (x) (* x x x)))
  (+ (square 3) (cube 2)))  ; => 9 + 8 = 17

;;; Local functions with LABELS (allows recursion and mutual recursion)
(labels ((even? (n)
           (if (= n 0) t (odd? (- n 1))))
         (odd? (n)
           (if (= n 0) nil (even? (- n 1)))))
  (even? 10))   ; => T

;;; Retrieving a function as a value
(let ((fn #'greet))
  (funcall fn "Lisp"))   ; => "Hello, Lisp!"

;;; Multiple return values
(defun floor-and-remainder (n d)
  (floor n d))   ; floor returns two values: quotient and remainder

(multiple-value-bind (q r)
    (floor-and-remainder 17 5)
  (format t "~a remainder ~a" q r))  ; "3 remainder 2"
```

## Gotchas

- Common Lisp is a Lisp-2: functions and variables live in separate namespaces. `(let ((list #'list)) (funcall list 1 2))` — the variable `list` holds the function object; calling it requires `funcall`.
- `flet` and `labels` differ: in `flet`, the local function bodies cannot call other functions defined in the same `flet`. Use `labels` for recursive local functions.
- Docstrings in `defun` are accessible at runtime via `(documentation 'greet 'function)`.
