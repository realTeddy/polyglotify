---
title: "Arrays & Lists"
language: "scheme"
feature: "arrays"
category: "data-structures"
applicable: true
---

Scheme has two primary sequence types: **lists** (linked cons cells, fundamental to the language) and **vectors** (fixed-size, random-access arrays). Lists are built from `cons` pairs ending in `'()`. Vectors are created with `make-vector` or the `#(...)` literal. R7RS adds **bytevectors** for binary data. Higher-order functions (`map`, `for-each`, `filter`, `fold`) are the idiomatic way to process lists.

## Example

```scheme
;;; Lists
'(1 2 3 4 5)                    ; list literal
(list 1 2 3 4 5)                ; constructor
(cons 0 '(1 2 3))               ; => (0 1 2 3)
(car '(1 2 3))                  ; => 1  (head)
(cdr '(1 2 3))                  ; => (2 3) (tail)
(cadr '(1 2 3))                 ; => 2  (second)
(length '(a b c))               ; => 3
(append '(1 2) '(3 4))          ; => (1 2 3 4)
(reverse '(1 2 3))              ; => (3 2 1)
(list-ref '(a b c d) 2)         ; => c  (0-based)

;;; List processing
(map (lambda (x) (* x x)) '(1 2 3 4 5))
; => (1 4 9 16 25)

(filter odd? '(1 2 3 4 5))      ; => (1 3 5)

(fold-right + 0 '(1 2 3 4 5))   ; => 15  (right fold with initial 0)
; R7RS: (fold-right + 0 '(1 2 3 4 5))

;;; Vectors (O(1) access)
(make-vector 5 0)               ; => #(0 0 0 0 0)
#(10 20 30 40 50)               ; literal
(vector-ref #(10 20 30) 1)      ; => 20 (0-based)
(vector-length #(1 2 3))        ; => 3

(let ((v (vector 1 2 3 4 5)))
  (vector-set! v 2 99)          ; mutate index 2
  v)                            ; => #(1 2 99 4 5)

;;; Bytevectors (R7RS)
(make-bytevector 4 0)           ; => #u8(0 0 0 0)
#u8(1 2 3 255)                  ; literal
```

## Gotchas

- Lists are linked lists — `list-ref` is O(n). Use vectors for indexed access.
- `append` creates a new list sharing structure with the last argument; all intermediate lists are copied.
- Standard Scheme does not have `filter` and `fold` in R5RS — they are in SRFI-1 (list library) and R7RS's `(scheme list)`. Check your Scheme implementation.
