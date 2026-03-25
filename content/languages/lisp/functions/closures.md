---
title: "Closures & Lambdas"
language: "lisp"
feature: "closures"
category: "functions"
applicable: true
---

Common Lisp has full lexical closures. A `lambda` form captures its lexical environment — variables from enclosing `let` or `defun` forms are captured by reference. Closures are first-class values, passable to and returnable from functions. This enables iterators, callbacks, memoization, and object systems built purely from closures.

## Example

```common-lisp
;;; Basic lambda (anonymous function)
(funcall (lambda (x) (* x x)) 5)   ; => 25

;;; Higher-order functions
(mapcar (lambda (x) (* x 2)) '(1 2 3 4 5))   ; => (2 4 6 8 10)
(remove-if (lambda (x) (evenp x)) '(1 2 3 4 5))  ; => (1 3 5)

;;; Closure capturing a variable
(defun make-adder (n)
  (lambda (x) (+ x n)))   ; n is captured from make-adder's scope

(let ((add5  (make-adder 5))
      (add10 (make-adder 10)))
  (funcall add5  3)    ; => 8
  (funcall add10 3))   ; => 13

;;; Mutable closure (shared state)
(defun make-counter ()
  (let ((count 0))
    (lambda ()
      (incf count)
      count)))

(let ((c (make-counter)))
  (funcall c)   ; => 1
  (funcall c)   ; => 2
  (funcall c))  ; => 3

;;; Two closures sharing the same environment
(defun make-account (balance)
  (values
    (lambda (amount) (decf balance amount) balance)  ; withdraw
    (lambda (amount) (incf balance amount) balance)  ; deposit
    (lambda ()        balance)))                      ; check

(multiple-value-bind (withdraw deposit check)
    (make-account 100)
  (funcall deposit 50)    ; => 150
  (funcall withdraw 30)   ; => 120
  (funcall check))        ; => 120
```

## Gotchas

- Closures capture variables by reference, not by value — if the captured variable is mutated after the closure is created, the closure sees the new value.
- `#'function-name` is the reader shorthand for `(function function-name)` and retrieves a function from the function namespace; `lambda` forms are in the function namespace implicitly.
- In a `loop` that creates closures, all closures may share the same loop variable unless you create a new binding per iteration: `(let ((i i)) (lambda () i))`.
