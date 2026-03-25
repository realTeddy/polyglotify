---
title: "Types & Type Systems"
language: "racket"
feature: "types"
category: "basics"
applicable: true
---

Racket is dynamically typed by default, but ships with **Typed Racket** (`#lang typed/racket`) for optional static typing. In untyped Racket, values carry their types at runtime and predicates like `number?`, `string?`, and `list?` are used for type checks. Core types include booleans, numbers (exact integers, inexact floats, rationals, complex), characters, strings, symbols, pairs, lists, vectors, hash tables, and procedures.

## Example

```racket
#lang racket

; Booleans
#t  #f

; Numbers — exact and inexact
42          ; exact integer
3.14        ; inexact (float)
1/3         ; exact rational
2+3i        ; complex

; Strings (mutable)
(string-length "hello")  ; => 5

; Symbols (interned, immutable)
'foo

; Pairs and lists
(cons 1 (cons 2 '()))   ; => '(1 2)
(list 1 2 3)            ; => '(1 2 3)

; Predicates
(number? 42)     ; => #t
(string? "hi")   ; => #t
(pair? '(1 2))   ; => #t
(null? '())      ; => #t

; Typed Racket snippet
; #lang typed/racket
; (: add (-> Integer Integer Integer))
; (define (add x y) (+ x y))
```

## Gotchas

- In Racket, `0`, `""`, and `'()` are all truthy — only `#f` is falsy.
- Strings are mutable; symbols are immutable and interned (same symbol literal always produces the same object).
- Exact arithmetic never loses precision: `(/ 1 3)` returns the rational `1/3`, not `0.333...`.
