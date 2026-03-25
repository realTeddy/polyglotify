---
title: "Return Values"
language: "scheme"
feature: "return-values"
category: "functions"
applicable: true
---

In Scheme, the value of a function is the value of its last expression. Multiple return values are supported via `values` and received with `call-with-values` (R5RS/R7RS) or the more ergonomic `define-values`/`let-values` (R7RS). Early exit uses continuations (`call/cc`) rather than a `return` statement.

## Example

```scheme
;;; Implicit return — last expression
(define (double x) (* 2 x))
(double 5)   ; => 10

;;; Multiple return values
(define (quotient+remainder n d)
  (values (quotient n d) (remainder n d)))

;;; Receiving multiple values (R7RS)
(define-values (q r)
  (quotient+remainder 17 5))
q   ; => 3
r   ; => 2

;;; let-values (R7RS)
(let-values (((q r) (quotient+remainder 17 5)))
  (list q r))   ; => (3 2)

;;; call-with-values (R5RS compatible)
(call-with-values
  (lambda () (values 1 2 3))
  (lambda (a b c) (+ a b c)))   ; => 6

;;; Early return via call/cc
(define (find-first pred lst)
  (call-with-current-continuation
    (lambda (return)
      (for-each (lambda (x)
                  (when (pred x) (return x)))
                lst)
      #f)))   ; default if not found

(find-first even? '(1 3 5 4 7))   ; => 4
```

## Gotchas

- `values` with no arguments returns zero values; using it where one value is expected is implementation-defined behavior.
- `call-with-values` is available in R5RS but is verbose — R7RS's `let-values` and `define-values` are much more readable.
- Using `call/cc` for early return is idiomatic in Scheme but carries the full overhead of capturing a continuation — use named `let` loops with careful tail-recursion structure as an alternative.
