---
title: "Structs & Classes"
language: "racket"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Racket provides `struct` for defining record types with named fields. Structs are immutable by default; individual fields or the whole struct can be made mutable. Struct definitions automatically generate a constructor, a predicate, and field accessors. The `#:transparent` option makes structs print their contents and enables `equal?` comparison by field values.

## Example

```racket
#lang racket

; Basic immutable struct
(struct point (x y) #:transparent)

(define p (point 3 4))
(point-x p)      ; => 3
(point-y p)      ; => 4
(point? p)       ; => #t
p                ; => (point 3 4)  (transparent printing)

; Mutable fields
(struct counter ([value #:mutable]) #:transparent)

(define c (counter 0))
(set-counter-value! c (+ (counter-value c) 1))
(counter-value c)  ; => 1

; Struct with computed constructor
(struct circle (center radius) #:transparent)
(define (make-circle x y r) (circle (point x y) r))

(define circ (make-circle 0 0 5))
(point-x (circle-center circ))  ; => 0
(circle-radius circ)             ; => 5

; Pattern matching
(require racket/match)
(match p
  [(point x y) (format "~a, ~a" x y)])  ; => "3, 4"
```

## Gotchas

- Without `#:transparent`, structs print as opaque `#<point>` and two structs with identical fields are not `equal?`.
- Accessor names are prefixed with the struct name: `(struct foo (bar))` generates `foo-bar`, not just `bar`.
- `#:prefab` makes structs "prefabricated" (interned across modules and processes), useful for serialization.
