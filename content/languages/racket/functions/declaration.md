---
title: "Function Declaration"
language: "racket"
feature: "declaration"
category: "functions"
applicable: true
---

Functions in Racket are first-class values created with `lambda`. The `define` shorthand `(define (name args...) body...)` is syntactic sugar for `(define name (lambda (args...) body...))`. Functions implicitly return the value of their last expression. Tail calls are guaranteed to be optimized, making tail-recursive functions as efficient as loops.

## Example

```racket
#lang racket

; Explicit lambda
(define square (lambda (x) (* x x)))

; Shorthand define form
(define (cube x)
  (* x x x))

; Multi-expression body — last value is returned
(define (describe n)
  (define label (if (>= n 0) "positive" "negative"))
  (string-append (number->string n) " is " label))

; Tail-recursive factorial
(define (factorial n [acc 1])
  (if (= n 0)
      acc
      (factorial (- n 1) (* n acc))))

(factorial 10)  ; => 3628800

; Variadic function
(define (sum . args)
  (apply + args))

(sum 1 2 3 4)  ; => 10
```

## Gotchas

- Every `lambda` body may contain internal `define` forms; these become local to that function.
- Racket guarantees proper tail calls, but only for self-tail-calls in `#lang racket`; mutual tail recursion also works.
- The shorthand `(define (f x) body)` is identical to `(define f (lambda (x) body))` — they produce the same binding.
