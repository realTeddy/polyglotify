---
title: "Interfaces & Traits"
language: "scheme"
feature: "interfaces"
category: "oop"
applicable: false
---

Standard Scheme has no interfaces or traits. Scheme's polymorphism is entirely dynamic (duck typing): any object that responds to a message correctly can be used wherever that message is expected. This is behavioral polymorphism without static contract enforcement. Some Scheme programmers use convention-based "protocols" — a documented set of messages that an object should handle — but the language provides no enforcement.

## Example

```scheme
;;; Duck typing — no interface declaration needed
;;; Any object responding to 'area and 'perimeter works

(define (describe-shape shape)
  ;; Works with any object that handles 'area and 'perimeter messages
  (let ((a (shape 'area))
        (p (shape 'perimeter)))
    (format #t "Area: ~a, Perimeter: ~a~%" a p)))

;;; Circle — responds to the informal "shape protocol"
(define (make-circle r)
  (lambda (msg)
    (cond
      ((eq? msg 'area)      (* 3.14159 r r))
      ((eq? msg 'perimeter) (* 2 3.14159 r))
      ((eq? msg 'type)      'circle)
      (else (error "Unknown message" msg)))))

;;; Rectangle — also responds to the "shape protocol"
(define (make-rectangle w h)
  (lambda (msg)
    (cond
      ((eq? msg 'area)      (* w h))
      ((eq? msg 'perimeter) (* 2 (+ w h)))
      ((eq? msg 'type)      'rectangle)
      (else (error "Unknown message" msg)))))

;;; Polymorphic dispatch — no interface declaration
(define shapes (list (make-circle 5)
                     (make-rectangle 4 6)
                     (make-circle 3)))

(for-each describe-shape shapes)
;; Area: 78.539..., Perimeter: 31.415...
;; Area: 24, Perimeter: 20
;; Area: 28.274..., Perimeter: 18.849...
```

## Gotchas

- Duck typing means sending an unsupported message raises an error only at runtime — there is no compile-time check.
- The "error" raised by an unknown message is implementation-specific — some implementations signal a generic error; others provide a structured condition.
- For larger Scheme systems, documenting the expected protocol (set of messages) in comments or assertions is important for maintainability since there is no language-level contract.
