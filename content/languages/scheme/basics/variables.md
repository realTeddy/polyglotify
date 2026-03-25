---
title: "Variables & Declaration"
language: "scheme"
feature: "variables"
category: "basics"
applicable: true
---

Scheme uses `define` for top-level bindings and `let`/`let*`/`letrec` for local bindings. All bindings are lexically scoped. There is no distinction between "variable" and "function" binding — `define` handles both. `set!` mutates an existing binding (the `!` suffix is a Scheme convention for mutation). `define-record-type` (R7RS) creates structured data.

## Example

```scheme
;;; Top-level definitions
(define pi 3.14159265)
(define greeting "Hello, Scheme!")
(define counter 0)

;;; Mutation with set!
(set! counter 42)
(set! counter (+ counter 1))  ; counter = 43

;;; Local bindings with let (parallel binding)
(let ((x 10)
      (y 20))
  (+ x y))   ; => 30

;;; let* (sequential binding — each can reference previous)
(let* ((base  5)
       (sq    (* base base))
       (cube  (* sq base)))
  (list base sq cube))  ; => (5 25 125)

;;; letrec (for mutually recursive local functions)
(letrec ((even? (lambda (n)
                  (if (= n 0) #t (odd? (- n 1)))))
         (odd?  (lambda (n)
                  (if (= n 0) #f (even? (- n 1))))))
  (even? 10))   ; => #t

;;; Internal defines (equivalent to letrec*)
(define (compute x)
  (define base (* x 2))   ; internal define
  (define result (+ base 1))
  result)

(compute 5)   ; => 11
```

## Gotchas

- Scheme is a Lisp-1: functions and variables share the same namespace, unlike Common Lisp. This means you cannot have a variable and a function with the same name.
- `let` binds all init forms before any binding is visible — use `letrec` or `letrec*` for mutually recursive definitions.
- `define` inside a `lambda`/procedure body creates local bindings (internal defines), not top-level ones — they are equivalent to `letrec*`.
