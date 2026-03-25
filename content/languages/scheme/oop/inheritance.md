---
title: "Inheritance"
language: "scheme"
feature: "inheritance"
category: "oop"
applicable: false
---

Standard R7RS Scheme has no inheritance. The language provides no mechanism for one record type to extend another. Inheritance can be simulated in closure-based objects by delegating unknown messages to a "parent" object, but this is manual and fragile. Implementations with class systems (Racket, Guile/GOOPS) provide real single and multiple inheritance.

## Example

```scheme
;;; Manual delegation (simulated inheritance) — standard Scheme
(define (make-animal name sound)
  (lambda (msg . args)
    (cond
      ((eq? msg 'speak)
       (display (string-append sound "!"))
       (newline))
      ((eq? msg 'name) name)
      (else (error "Unknown message" msg)))))

(define (make-dog name breed)
  (let ((parent (make-animal name "Woof")))
    (lambda (msg . args)
      (cond
        ((eq? msg 'breed) breed)
        ((eq? msg 'fetch)
         (display (string-append name " fetches the ball!"))
         (newline))
        ;; Delegate unknown messages to parent
        (else (apply parent (cons msg args)))))))

(define rex (make-dog "Rex" "Labrador"))
(rex 'speak)    ; => Woof!        (delegated to parent)
(rex 'name)     ; => "Rex"       (delegated to parent)
(rex 'breed)    ; => "Labrador"  (own method)
(rex 'fetch)    ; => Rex fetches the ball!

;;; Racket class syntax (NOT standard Scheme)
;; (define dog%
;;   (class animal%
;;     (init breed)
;;     (define/override (speak) (displayln "Woof!"))
;;     (define/public (fetch) (displayln "Fetching!"))))
```

## Gotchas

- The delegation pattern above is not true inheritance — there is no type relationship, no method resolution order, and no type predicate that recognizes a dog as an animal.
- Message delegation must be explicitly programmed for every "subclass" — it does not happen automatically.
- If you need real inheritance in Scheme, commit to a specific implementation (Racket, Guile) or use a macro library that provides a class system.
