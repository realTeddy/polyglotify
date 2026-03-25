---
title: "Variables & Declaration"
language: "racket"
feature: "variables"
category: "basics"
applicable: true
---

Racket uses `define` to bind names to values at the top level or inside `let`-family forms for local bindings. All bindings are immutable by default; mutable state requires `define` paired with `set!` or the explicit `box`/`vector` types. `let`, `let*`, and `letrec` create lexically scoped local variables with slightly different evaluation rules.

## Example

```racket
#lang racket

; Top-level binding (immutable by default)
(define pi 3.14159)

; Mutable binding
(define counter 0)
(set! counter (+ counter 1))

; Local bindings
(let ([x 10]
      [y 20])
  (+ x y))   ; => 30

; let* evaluates sequentially, so later bindings can use earlier ones
(let* ([x 5]
       [y (* x 2)])
  y)  ; => 10

; letrec allows mutual recursion
(letrec ([even? (lambda (n) (if (= n 0) #t (odd?  (- n 1))))]
         [odd?  (lambda (n) (if (= n 0) #f (even? (- n 1))))])
  (even? 10))  ; => #t
```

## Gotchas

- `set!` is considered un-idiomatic in functional Racket; prefer returning new values over mutating existing ones.
- `let` evaluates all bindings in parallel (relative to the enclosing scope), so bindings cannot reference each other; use `let*` for sequential dependencies.
- Top-level `define` inside a module is module-scoped, not global across files.
