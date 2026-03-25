---
title: "Closures & Lambdas"
language: "scheme"
feature: "closures"
category: "functions"
applicable: true
---

Closures are a core feature of Scheme and one of its key contributions to programming language theory. Every `lambda` creates a closure that captures its lexical environment. Closures underlie Scheme's approach to object-oriented programming (objects as closures with shared mutable state), iterators, and continuations. Scheme was instrumental in establishing closures as a mainstream programming concept.

## Example

```scheme
;;; Basic closure
(define (make-adder n)
  (lambda (x) (+ x n)))   ; n is captured

(define add5  (make-adder 5))
(define add10 (make-adder 10))
(add5  3)    ; => 8
(add10 3)    ; => 13

;;; Closure with mutable state (object via closure)
(define (make-counter)
  (let ((count 0))
    (lambda (msg)
      (cond
        ((eq? msg 'inc!)  (set! count (+ count 1)) count)
        ((eq? msg 'dec!)  (set! count (- count 1)) count)
        ((eq? msg 'reset!) (set! count 0) count)
        ((eq? msg 'get)   count)
        (else (error "Unknown message" msg))))))

(define c (make-counter))
(c 'inc!)   ; => 1
(c 'inc!)   ; => 2
(c 'inc!)   ; => 3
(c 'dec!)   ; => 2
(c 'get)    ; => 2

;;; Two closures sharing the same captured environment
(define (make-account balance)
  (define (withdraw amount)
    (if (>= balance amount)
        (begin (set! balance (- balance amount)) balance)
        (error "Insufficient funds")))
  (define (deposit amount)
    (set! balance (+ balance amount))
    balance)
  (define (dispatch msg)
    (cond ((eq? msg 'withdraw) withdraw)
          ((eq? msg 'deposit)  deposit)
          ((eq? msg 'balance)  balance)
          (else (error "Unknown message" msg))))
  dispatch)

(define acc (make-account 100))
((acc 'deposit)  50)    ; => 150
((acc 'withdraw) 30)    ; => 120
(acc 'balance)          ; => 120
```

## Gotchas

- Closures capture variables by reference — if the captured variable is mutated with `set!`, the closure sees the new value.
- The message-passing object pattern above is one of Scheme's classic idioms for OOP without a class system.
- Creating closures in a loop requires care: `(map (lambda (i) (lambda () i)) '(0 1 2))` works correctly because each iteration of `map` creates a fresh `i` binding.
