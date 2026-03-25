---
title: "Classes"
language: "scheme"
feature: "classes"
category: "oop"
applicable: false
---

Standard R7RS Scheme has no class system. Scheme intentionally provides minimal primitives (closures, `define-record-type`) and lets programmers build abstractions on top. Object-oriented programming in Scheme is typically done via closure-based message-passing objects. Extended implementations provide class systems: **Racket** has `class`, **Guile** has GOOPS (Generic Object-Oriented Programming System), and **SRFI-99** defines a portable class-like record system.

## Example

```scheme
;;; Closure-based "class" (standard Scheme OOP idiom)
(define (make-bank-account owner initial-balance)
  ;; "Instance variables" in the closure
  (let ((balance initial-balance))

    ;; "Methods" as message dispatch
    (define (deposit amount)
      (set! balance (+ balance amount))
      balance)

    (define (withdraw amount)
      (if (>= balance amount)
          (begin (set! balance (- balance amount)) balance)
          (error "Insufficient funds" balance)))

    (define (get-balance) balance)

    ;; Dispatch procedure — the "object"
    (lambda (msg . args)
      (cond
        ((eq? msg 'deposit)  (apply deposit args))
        ((eq? msg 'withdraw) (apply withdraw args))
        ((eq? msg 'balance)  (get-balance))
        ((eq? msg 'owner)    owner)
        (else (error "Unknown message" msg))))))

(define acc (make-bank-account "Alice" 1000))
(acc 'deposit 500)    ; => 1500
(acc 'withdraw 200)   ; => 1300
(acc 'balance)        ; => 1300
(acc 'owner)          ; => "Alice"
```

## Gotchas

- The closure-based object pattern was influential in programming language theory — it demonstrates that objects and closures are duals.
- This pattern has no inheritance, no method lookup tables, and no type predicates — each "class" factory must implement all behavior itself.
- For production OOP in Scheme, use a concrete implementation: Racket's `(class ...)` form, Guile's GOOPS, or Chicken Scheme with a class SRFI.
