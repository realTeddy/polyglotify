---
title: "Common Patterns"
language: "scheme"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Scheme idioms emphasize recursion over iteration, higher-order functions over explicit loops, and continuation-passing for complex control flow. Classic patterns include: **named let** for iterative processes, **accumulator recursion** for building lists, **CPS (continuation-passing style)** for advanced flow control, **the Y combinator** for anonymous recursion, and **quasiquote/unquote** for code-as-data and macro writing.

## Example

```scheme
;;; Named let (idiomatic Scheme loop)
(define (sum-list lst)
  (let loop ((remaining lst) (acc 0))
    (if (null? remaining)
        acc
        (loop (cdr remaining) (+ acc (car remaining))))))
(sum-list '(1 2 3 4 5))   ; => 15

;;; Accumulator recursion (build list in reverse, then reverse)
(define (filter-map proc lst)
  (let loop ((remaining lst) (acc '()))
    (cond
      ((null? remaining) (reverse acc))
      ((proc (car remaining)) =>
       (lambda (v) (loop (cdr remaining) (cons v acc))))
      (else (loop (cdr remaining) acc)))))
(filter-map (lambda (x) (and (odd? x) (* x 10))) '(1 2 3 4 5))
; => (10 30 50)

;;; Quasiquote for data templating
(define (make-let-binding name val)
  `(,name ,val))
(make-let-binding 'x 42)   ; => (x 42)

(define (make-lambda params body)
  `(lambda ,params ,@body))
(make-lambda '(x y) '((+ x y)))   ; => (lambda (x y) (+ x y))

;;; Continuation for early exit
(define (find pred lst)
  (call/cc
    (lambda (return)
      (for-each (lambda (x) (when (pred x) (return x))) lst)
      #f)))
(find even? '(1 3 5 4 7))   ; => 4

;;; Y combinator (anonymous recursion)
(define Y
  (lambda (f)
    ((lambda (x) (f (lambda (v) ((x x) v))))
     (lambda (x) (f (lambda (v) ((x x) v)))))))

((Y (lambda (fact)
      (lambda (n)
        (if (= n 0) 1 (* n (fact (- n 1)))))))
 5)   ; => 120
```

## Gotchas

- Accumulator patterns with `(reverse acc)` at the end are O(n) overall — the intermediate list is built in reverse for O(1) `cons`, then reversed once.
- The `=>` clause in `cond` passes the truthy result of the test to the specified procedure: `((proc x) => (lambda (v) ...))` avoids calling `proc` twice.
- Quasiquote (`` ` ``) and unquote (`,`) are essential for macros — they allow building S-expressions as data while splicing in computed values.
