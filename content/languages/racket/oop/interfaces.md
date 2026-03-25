---
title: "Interfaces & Traits"
language: "racket"
feature: "interfaces"
category: "oop"
applicable: true
---

Racket's class system provides `interface` for declaring contracts that classes must satisfy. A class implements an interface by listing it in `(class base% (... implements interface%) ...)`. The `is-a?` predicate checks interface membership. Interfaces only specify method names, not signatures. For struct-based code, generic interfaces are expressed via higher-order functions or `racket/generic`.

## Example

```racket
#lang racket
(require racket/class)

; Define an interface
(define drawable<%>
  (interface ()
    draw
    bounding-box))

; Implement the interface
(define circle%
  (class* object% (drawable<%>)
    (super-new)
    (init-field radius)

    (define/public (draw)
      (printf "Drawing circle with radius ~a\n" radius))

    (define/public (bounding-box)
      (list (* -1 radius) (* -1 radius) radius radius))))

(define c (new circle% [radius 5]))
(send c draw)
(is-a? c drawable<%>)   ; => #t

; Using racket/generic for struct-based polymorphism
(require racket/generic)
(define-generics printable
  (pretty-print printable))

(struct point (x y)
  #:methods gen:printable
  [(define (pretty-print p)
     (printf "(~a, ~a)\n" (point-x p) (point-y p)))])

(pretty-print (point 3 4))  ; => (3, 4)
```

## Gotchas

- Interfaces in `racket/class` are duck-typed at instantiation time; the class must define all interface methods or an error is raised when loading the module.
- `class*` is the form for listing implemented interfaces: `(class* base% (iface1 iface2) ...)`.
- `racket/generic` provides a more functional, struct-friendly alternative for polymorphism without the full class system.
