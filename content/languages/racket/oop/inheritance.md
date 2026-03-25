---
title: "Inheritance"
language: "racket"
feature: "inheritance"
category: "oop"
applicable: true
---

Racket's class system supports single inheritance via `(class parent% ...)`. A subclass calls `super-new` to initialize its parent and can override methods with `define/override`. `super` calls the parent's implementation. Mixins (functions from class to class) enable a form of multiple inheritance by layering behavior.

## Example

```racket
#lang racket
(require racket/class)

(define shape%
  (class object%
    (super-new)
    (define/public (area) 0)
    (define/public (describe)
      (format "Area: ~a" (send this area)))))

(define rectangle%
  (class shape%
    (super-new)
    (init-field width height)
    (define/override (area) (* width height))))

(define square%
  (class rectangle%
    (init-field side)
    (super-new [width side] [height side])))

; Mixin for logging
(define (logging-mixin base%)
  (class base%
    (super-new)
    (define/override (area)
      (define result (super area))
      (printf "area called, result: ~a\n" result)
      result)))

(define logged-rect% (logging-mixin rectangle%))
(define r (new logged-rect% [width 3] [height 4]))
(send r area)      ; prints "area called, result: 12" => 12
(send r describe)  ; => "Area: 12"
```

## Gotchas

- Racket supports only single inheritance; use mixins for reusable behavior across unrelated class hierarchies.
- `define/override` is required; using `define/public` on an already-public method from the parent raises an error.
- `(super method-name args...)` invokes the parent's version inside an override.
