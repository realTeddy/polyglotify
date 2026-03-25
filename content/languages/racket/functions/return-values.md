---
title: "Return Values"
language: "racket"
feature: "return-values"
category: "functions"
applicable: true
---

Racket functions return the value of their last expression. There is no `return` keyword. Multiple values can be returned with `values` and destructured with `define-values` or `call-with-values`. Returning `(void)` is idiomatic when a function is called purely for side effects.

## Example

```racket
#lang racket

; Implicit return of last expression
(define (add x y) (+ x y))

; Multiple return values
(define (min-max lst)
  (values (apply min lst) (apply max lst)))

(define-values (lo hi) (min-max '(3 1 4 1 5 9)))
lo  ; => 1
hi  ; => 9

; Using call-with-values
(call-with-values
  (lambda () (values 4 5))
  (lambda (a b) (* a b)))  ; => 20

; Early exit via continuation (escape continuation)
(define (find-first pred lst)
  (call/cc
    (lambda (return)
      (for-each (lambda (x)
                  (when (pred x) (return x)))
                lst)
      #f)))

(find-first even? '(1 3 4 7))  ; => 4
```

## Gotchas

- `values` is not a list; you cannot pass a `values` result to a function expecting a single argument without using `call-with-values` or `define-values`.
- `(void)` is a distinct value (displayed as nothing in the REPL); it is not `#f` or `'()`.
- Early return via `call/cc` (continuations) is powerful but should be used sparingly; for simple cases, restructuring with `cond` is cleaner.
