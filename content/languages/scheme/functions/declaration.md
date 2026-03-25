---
title: "Function Declaration"
language: "scheme"
feature: "declaration"
category: "functions"
applicable: true
---

In Scheme, functions are defined with `define`. The shorthand `(define (name args) body)` is syntactic sugar for `(define name (lambda (args) body))`. All functions are first-class values. Scheme guarantees proper tail-call optimization — a tail-recursive function runs in O(1) stack space. Internal `define` forms at the start of a procedure body create local bindings.

## Example

```scheme
;;; Function definition (shorthand)
(define (square x)
  (* x x))

;;; Equivalent lambda form
(define square (lambda (x) (* x x)))

;;; Multiple-expression body (implicit begin)
(define (greet name)
  (display "Hello, ")
  (display name)
  (newline)
  name)   ; return value is the last expression

;;; Recursive function (proper tail call)
(define (factorial n)
  (define (iter n acc)       ; inner helper
    (if (= n 0)
        acc
        (iter (- n 1) (* acc n))))   ; tail call
  (iter n 1))

(factorial 10)   ; => 3628800

;;; Higher-order function
(define (compose f g)
  (lambda (x) (f (g x))))

(define add1-then-double (compose (lambda (x) (* 2 x)) (lambda (x) (+ x 1))))
(add1-then-double 5)   ; => 12

;;; Variadic with dot notation
(define (show first . rest)
  (display first)
  (for-each (lambda (x) (display " ") (display x)) rest)
  (newline))

(show 1 2 3 4)   ; prints: 1 2 3 4
```

## Gotchas

- Scheme is a Lisp-1 — functions and variables share the same namespace. There is no `#'function-name` syntax; you just use the name directly.
- The `define` shorthand `(define (f x) ...)` is exactly equivalent to `(define f (lambda (x) ...))` — use whichever is clearer.
- Proper tail-call optimization is mandatory in R5RS/R6RS/R7RS — every conforming implementation must support it. This makes tail-recursive functions loop in constant space.
