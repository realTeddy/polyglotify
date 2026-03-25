---
title: "Arrays & Lists"
language: "racket"
feature: "arrays"
category: "data-structures"
applicable: true
---

Racket has two primary sequential types: **lists** (immutable linked lists, the lingua franca of Racket code) and **vectors** (mutable, fixed-length arrays with O(1) random access). Lists are constructed with `cons`/`list` and are processed recursively or with higher-order functions. Vectors are created with `vector` or `make-vector` and accessed with `vector-ref`/`vector-set!`.

## Example

```racket
#lang racket

; Lists (immutable singly-linked)
(define lst '(1 2 3 4 5))
(car lst)           ; => 1       (first element)
(cdr lst)           ; => '(2 3 4 5) (rest)
(length lst)        ; => 5
(list-ref lst 2)    ; => 3       (0-indexed)
(append '(1 2) '(3 4))  ; => '(1 2 3 4)
(reverse '(1 2 3))  ; => '(3 2 1)
(member 3 '(1 2 3 4))   ; => '(3 4)  (sublist or #f)

; Functional transforms
(map    (lambda (x) (* x 2)) '(1 2 3))  ; => '(2 4 6)
(filter odd? '(1 2 3 4 5))              ; => '(1 3 5)
(foldl + 0 '(1 2 3 4 5))               ; => 15

; Vectors (mutable, O(1) access)
(define v (vector 10 20 30))
(vector-ref v 1)        ; => 20
(vector-set! v 1 99)
v                       ; => #(10 99 30)
(vector-length v)       ; => 3
(vector->list v)        ; => '(10 99 30)
```

## Gotchas

- Lists in Racket are O(n) for random access; use vectors when you need indexed access.
- `append` creates a new list by copying all but the last list; appending many lists in a loop is O(n²).
- Quoted lists `'(1 2 3)` are immutable; `(list 1 2 3)` constructs a fresh mutable pair chain (though pairs themselves aren't mutable without `set-car!`/`set-cdr!`).
