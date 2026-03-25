---
title: "Common Patterns"
language: "racket"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Idiomatic Racket favors recursion over loops, higher-order functions over manual iteration, and immutable data over mutation. `match` for pattern matching, `for` comprehensions for iteration, `define-syntax`/`syntax-rules` for macros, and tail calls for loops are the idiomatic tools. The "language-oriented programming" philosophy means defining DSLs with `#lang` when appropriate.

## Example

```racket
#lang racket

; Pattern matching (very idiomatic)
(require racket/match)
(define (shape-area s)
  (match s
    [(list 'circle r)    (* pi r r)]
    [(list 'rect w h)    (* w h)]
    [(list 'square s)    (* s s)]
    [_ (error "unknown shape")]))

(shape-area '(circle 5))   ; => ~78.5
(shape-area '(rect 3 4))   ; => 12

; For comprehensions
(for/list ([x (in-range 5)]
           #:when (odd? x))
  (* x x))  ; => '(1 9 25)

; Threading with ~> (from threading package)
; (require threading)
; (~> '(1 2 3 4 5)
;     (filter odd? _)
;     (map (lambda (x) (* x x)) _))

; Accumulator pattern with named let
(define (flatten lst)
  (let loop ([lst lst] [acc '()])
    (cond
      [(null? lst) (reverse acc)]
      [(pair? (car lst))
       (loop (append (car lst) (cdr lst)) acc)]
      [else (loop (cdr lst) (cons (car lst) acc))])))

(flatten '(1 (2 3) (4 (5 6))))  ; => '(1 2 3 4 5 6)
```

## Gotchas

- Prefer `match` over nested `cond` for destructuring; it is more readable and exhaustive-checked in Typed Racket.
- Use `for/fold` instead of `foldl` when you need multiple accumulators.
- Macros are powerful but should be used sparingly; prefer functions when possible, reach for macros only when you need syntax transformation.
