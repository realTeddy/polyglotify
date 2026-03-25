---
title: "Sets"
language: "scheme"
feature: "sets"
category: "data-structures"
applicable: false
---

Standard R7RS Scheme has no built-in set type. Sets are represented as lists with uniqueness maintained by convention, or as hash tables keyed by the element with a dummy value. **SRFI-113** defines a portable set API. Many Scheme implementations provide sorted tree-based sets as extensions. For small sets, list-based operations with `member` suffice.

## Example

```scheme
;;; List-based set (portable, O(n) operations)
(define (set-add elt s)
  (if (member elt s) s (cons elt s)))

(define (set-member? elt s)
  (if (member elt s) #t #f))

(define (set-union s1 s2)
  (fold-right set-add s2 s1))   ; requires SRFI-1 fold-right

(define (set-intersection s1 s2)
  (filter (lambda (x) (member x s2)) s1))

(define (set-difference s1 s2)
  (filter (lambda (x) (not (member x s2))) s1))

;;; Using it
(define s1 (list 1 2 3 4 5))
(define s2 (list 3 4 5 6 7))

(set-member? 3 s1)              ; => #t
(set-add 6 s1)                  ; => (6 1 2 3 4 5)
(set-intersection s1 s2)        ; => (3 4 5)
(set-difference s1 s2)          ; => (1 2)

;;; Hash-table based set (O(1) membership)
(define (make-set)
  (let ((ht (make-hash-table)))  ; SRFI-69
    ht))

(define (ht-set-add! s elt)
  (hash-table-set! s elt #t))

(define (ht-set-member? s elt)
  (hash-table-ref/default s elt #f))
```

## Gotchas

- `member` uses `equal?` by default — use `memv` (eqv?) for numbers/chars or `memq` (eq?) for symbols.
- The list-based set operations are O(n²) for intersection/union — fine for small sets, but switch to a hash-table set for large data.
- SRFI-113 (`(import (srfi 113))`) provides a portable, efficient set API if available in your Scheme implementation.
