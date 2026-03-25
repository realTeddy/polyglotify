---
title: "Generics"
language: "scheme"
feature: "generics"
category: "oop"
applicable: false
---

Standard R7RS Scheme has no generic function system. Polymorphism is achieved through dynamic dispatch in closure-based objects (message passing) or with `cond`/`case` type-dispatch in procedures. Guile's GOOPS provides a generic function system similar to CLOS. Racket has `generic-interface`. For portable Scheme, procedures that accept any type and use type predicates (`number?`, `string?`, `pair?`) provide an informal form of generic programming.

## Example

```scheme
;;; Informal generics via type dispatch
(define (to-string x)
  (cond
    ((number?    x) (number->string x))
    ((string?    x) x)
    ((symbol?    x) (symbol->string x))
    ((boolean?   x) (if x "#t" "#f"))
    ((null?      x) "()")
    ((pair?      x) (string-append "(" (to-string (car x)) " ...)" ))
    ((vector?    x) "#(...)")
    (else           "<unknown>")))

(to-string 42)      ; => "42"
(to-string "hi")    ; => "hi"
(to-string 'foo)    ; => "foo"
(to-string #t)      ; => "#t"
(to-string '(1 2))  ; => "(1 ...)"

;;; Generic container operations (duck-typed)
;;; Any object responding to 'add and 'size works
(define (fill-and-count container items)
  (for-each (lambda (item) (container 'add item)) items)
  (container 'size))

;;; Guile GOOPS (NOT standard Scheme)
;; (use-modules (oop goops))
;; (define-generic to-string)
;; (define-method (to-string (n <number>)) (number->string n))
;; (define-method (to-string (s <string>)) s)
```

## Gotchas

- The `cond`-based dispatch approach must be updated for every new type — it does not scale to open extension the way CLOS generic functions do.
- Guile's GOOPS and Racket's generic interfaces provide open generic functions, but they are not portable across Scheme implementations.
- Scheme's philosophy is minimalism — if you need a sophisticated generic function system, you should probably use a language or implementation that provides one natively (Common Lisp, Racket).
