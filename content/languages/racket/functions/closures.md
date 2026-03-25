---
title: "Closures & Lambdas"
language: "racket"
feature: "closures"
category: "functions"
applicable: true
---

Closures are a fundamental feature of Racket. Every `lambda` closes over the variables in its lexical environment. Closures can capture mutable state, enabling patterns like objects and generators. Higher-order functions (`map`, `filter`, `foldl`, `compose`) are idiomatic and built-in.

## Example

```racket
#lang racket

; Basic closure capturing a variable
(define (make-adder n)
  (lambda (x) (+ x n)))

(define add5 (make-adder 5))
(add5 10)  ; => 15

; Closure over mutable state
(define (make-counter)
  (let ([count 0])
    (lambda ()
      (set! count (+ count 1))
      count)))

(define c (make-counter))
(c)  ; => 1
(c)  ; => 2
(c)  ; => 3

; Higher-order composition
(define inc (lambda (x) (+ x 1)))
(define double (lambda (x) (* x 2)))
(define inc-then-double (compose double inc))

(inc-then-double 3)  ; => 8

; Currying with curry
(define add (curry +))
(define add10 (add 10))
(add10 5)   ; => 15
(map add10 '(1 2 3))  ; => '(11 12 13)
```

## Gotchas

- Closures share the same mutable binding, not a copy of it: if two lambdas close over the same `let`-bound variable and one mutates it with `set!`, the other sees the change.
- `compose` applies functions right-to-left: `(compose f g)` is `f(g(x))`.
- Racket's `curry` from `racket/function` automatically curries any procedure.
