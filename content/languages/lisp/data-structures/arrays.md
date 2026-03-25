---
title: "Arrays & Lists"
language: "lisp"
feature: "arrays"
category: "data-structures"
applicable: true
---

Common Lisp has two distinct sequence types: **lists** (linked cons cells) and **arrays** (contiguous memory). Lists are the foundation of Lisp and excel at structural manipulation. Vectors (`make-array` with one dimension) provide O(1) indexed access. Arrays can be multi-dimensional. Adjustable arrays grow dynamically. Sequence functions (`map`, `reduce`, `sort`, `find`, `position`, `remove`) work on both lists and vectors.

## Example

```common-lisp
;;; Lists
(list 1 2 3 4 5)              ; => (1 2 3 4 5)
(cons 0 '(1 2 3))             ; => (0 1 2 3)
(car '(1 2 3))                ; => 1  (first element)
(cdr '(1 2 3))                ; => (2 3) (rest)
(cadr '(1 2 3))               ; => 2  (second)
(nth 2 '(a b c d))            ; => C  (0-based!)

;;; List operations
(append '(1 2) '(3 4))        ; => (1 2 3 4)
(reverse '(1 2 3))            ; => (3 2 1)
(length '(1 2 3))             ; => 3
(mapcar #'1+ '(1 2 3))        ; => (2 3 4)
(remove 2 '(1 2 3 2 4))       ; => (1 3 4)

;;; Vectors (one-dimensional arrays)
(make-array 5 :initial-element 0)     ; => #(0 0 0 0 0)
(make-array 5 :initial-contents '(a b c d e))  ; => #(A B C D E)
#(1 2 3 4 5)                          ; literal vector

(let ((v #(10 20 30)))
  (aref v 1))                          ; => 20 (0-based)

;;; Adjustable vector (like ArrayList)
(let ((v (make-array 0 :adjustable t :fill-pointer 0)))
  (vector-push-extend 'a v)
  (vector-push-extend 'b v)
  (vector-push-extend 'c v)
  v)                                   ; => #(A B C)

;;; Multi-dimensional array
(let ((mat (make-array '(3 3) :initial-element 0)))
  (setf (aref mat 1 2) 42)
  (aref mat 1 2))                      ; => 42

;;; Sequence functions (work on both lists and vectors)
(sort (list 3 1 4 1 5) #'<)           ; => (1 1 3 4 5)
(find 3 #(1 2 3 4 5))                 ; => 3
(reduce #'+ '(1 2 3 4 5))             ; => 15
```

## Gotchas

- Lists are linked lists — O(n) random access. Use vectors for index-heavy access patterns.
- `sort` is destructive — it may modify the original list. Use `(sort (copy-list lst) #'<)` to preserve the original.
- `nth` on a list is 0-based; `aref` on an array is also 0-based; Fortran programmers beware.
