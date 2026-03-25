---
title: "Tuples"
language: "racket"
feature: "tuples"
category: "data-structures"
applicable: false
---

Racket does not have a dedicated tuple type. The idiomatic substitute is a **cons pair** for two values, a **list** for ordered heterogeneous collections, or a **struct** for named fields. The `values` form can return multiple values from a function but is not a first-class tuple object.

## Example

```racket
#lang racket

; Pair as 2-tuple
(define point (cons 3 4))
(car point)  ; => 3
(cdr point)  ; => 4

; List as n-tuple
(define rgb '(255 128 0))
(first  rgb)  ; => 255
(second rgb)  ; => 128
(third  rgb)  ; => 0

; Struct for named access (preferred for clarity)
(struct point2d (x y) #:transparent)
(define p (point2d 3 4))
(point2d-x p)  ; => 3
(point2d-y p)  ; => 4

; Multiple return values (not a tuple object)
(define-values (q r) (values 7 3))
q  ; => 7
r  ; => 3
```

## Gotchas

- `values` cannot be stored in a variable directly; you must destructure with `define-values` or `call-with-values`.
- Lists are the most flexible tuple substitute, but they provide no type safety or named-field access.
- Prefer structs when the tuple has semantic meaning; they self-document and support pattern matching with `match`.
