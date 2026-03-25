---
title: "Generics"
language: "racket"
feature: "generics"
category: "oop"
applicable: true
---

Racket is dynamically typed, so functions are naturally polymorphic — a function that works on any value requiring only a `+` operation will work on any type that supports `+`. For struct-based polymorphism, `racket/generic` defines generic interfaces that structs can implement, similar to typeclasses. In Typed Racket, parametric polymorphism is expressed with `All` types.

## Example

```racket
#lang racket
(require racket/generic)

; Define a generic interface
(define-generics container
  (container-empty?  container)
  (container-add     container item)
  (container-to-list container))

; Implement for a custom stack struct
(struct stack (items)
  #:methods gen:container
  [(define (container-empty? s)
     (null? (stack-items s)))
   (define (container-add s item)
     (stack (cons item (stack-items s))))
   (define (container-to-list s)
     (stack-items s))])

(define s (stack '()))
(define s2 (container-add s 1))
(define s3 (container-add s2 2))
(container-to-list s3)   ; => '(2 1)
(container-empty? s)     ; => #t

; Typed Racket parametric polymorphism
; #lang typed/racket
; (: identity (All (A) (-> A A)))
; (define (identity x) x)
; (identity 42)      ; => 42
; (identity "hello") ; => "hello"
```

## Gotchas

- `define-generics` generates a predicate `container?` automatically.
- Dynamic dispatch via generics has a small overhead compared to direct method calls.
- In untyped Racket, "generics" are implicit — any function accepting a value and calling generic operations on it is already polymorphic.
