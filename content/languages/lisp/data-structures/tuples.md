---
title: "Tuples"
language: "lisp"
feature: "tuples"
category: "data-structures"
applicable: true
---

Common Lisp has no dedicated tuple type, but lists and `cons` cells serve the role naturally. A two-element list or a `cons` pair functions as a 2-tuple; fixed-length lists serve as n-tuples. For named fields, `defstruct` or CLOS classes provide more structure. `destructuring-bind` enables tuple-like unpacking of lists into named variables.

## Example

```common-lisp
;;; Cons pair as a 2-tuple
(let ((point (cons 3 4)))
  (car point)   ; => 3  (first)
  (cdr point))  ; => 4  (second)

;;; List as an n-tuple
(let ((rgb (list 255 128 0)))
  (first  rgb)   ; => 255
  (second rgb)   ; => 128
  (third  rgb))  ; => 0

;;; Multiple return values as "tuples"
(defun cartesian->polar (x y)
  (let ((r (sqrt (+ (* x x) (* y y))))
        (theta (atan y x)))
    (values r theta)))

(multiple-value-bind (r theta)
    (cartesian->polar 3.0 4.0)
  (format t "r=~a theta=~a" r theta))

;;; Destructuring-bind (tuple unpacking)
(destructuring-bind (a b c)
    '(10 20 30)
  (+ a b c))   ; => 60

(destructuring-bind (head &rest tail)
    '(1 2 3 4)
  (list head tail))   ; => (1 (2 3 4))

;;; Named tuple using DEFSTRUCT
(defstruct point3d
  x y z)

(let ((p (make-point3d :x 1.0 :y 2.0 :z 3.0)))
  (list (point3d-x p) (point3d-y p) (point3d-z p)))  ; => (1.0 2.0 3.0)
```

## Gotchas

- `cons` pairs (`car`/`cdr`) are the lowest-level 2-tuple; lists are chains of cons cells, so `(list a b c)` is `(cons a (cons b (cons c nil)))`.
- `destructuring-bind` will signal an error if the list has fewer elements than expected — unlike Python tuple unpacking which raises `ValueError`.
- For performance-critical code, use `defstruct` instead of lists as tuples — struct slot access is O(1) without walking a linked list.
