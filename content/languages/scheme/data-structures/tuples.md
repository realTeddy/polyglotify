---
title: "Tuples"
language: "scheme"
feature: "tuples"
category: "data-structures"
applicable: true
---

Scheme has no dedicated tuple type, but cons pairs and lists naturally fill this role. A `cons` pair is a 2-tuple; a fixed-length list is an n-tuple. `define-record-type` (R7RS) provides named tuples with typed fields. Multiple return values (`values`) serve as anonymous tuples at the function boundary. Destructuring is done with `car`/`cdr`/`list-ref` or `let-values`.

## Example

```scheme
;;; Cons pair as 2-tuple
(define point (cons 3.0 4.0))
(car point)   ; => 3.0  (x)
(cdr point)   ; => 4.0  (y)

;;; List as n-tuple
(define rgb '(255 128 0))
(car rgb)     ; => 255  (red)
(cadr rgb)    ; => 128  (green)
(caddr rgb)   ; => 0    (blue)

;;; Multiple values as unnamed tuple
(define (polar->cartesian r theta)
  (values (* r (cos theta))
          (* r (sin theta))))

(let-values (((x y) (polar->cartesian 5.0 0.6435)))
  (list x y))   ; => (4.000... 3.000...)

;;; define-record-type (R7RS named tuple)
(define-record-type <point>
  (make-point x y)   ; constructor
  point?             ; predicate
  (x point-x)        ; field + accessor
  (y point-y))

(define p (make-point 3.0 4.0))
(point-x p)    ; => 3.0
(point-y p)    ; => 4.0
(point? p)     ; => #t
(point? '(3 4)) ; => #f

;;; Pattern-like destructuring with let
(let ((p '(3.0 4.0)))
  (let ((x (car p)) (y (cadr p)))
    (sqrt (+ (* x x) (* y y)))))   ; => 5.0
```

## Gotchas

- `define-record-type` creates an opaque type — you cannot access its fields with `car`/`cdr`; use only the generated accessors.
- `values` returns zero or more values at a function boundary; the receiving form must match the count exactly or behavior is undefined.
- R7RS `define-record-type` does not support inheritance; for extensible record types use SRFI-9, SRFI-131, or your implementation's extension.
