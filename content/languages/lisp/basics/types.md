---
title: "Types & Type Systems"
language: "lisp"
feature: "types"
category: "basics"
applicable: true
---

Common Lisp is dynamically typed — every value carries its type at runtime. The type hierarchy is rich and includes: numbers (integers of arbitrary precision, rationals, floats, complex), characters, strings, symbols, lists (conses), arrays, vectors, hash tables, structs, and CLOS objects. The `type-of` function returns an object's type. `typep` tests membership. `declare` and `the` provide optional type annotations for compiler optimization.

## Example

```common-lisp
;;; Every value has a type
(type-of 42)              ; => FIXNUM (or INTEGER on some impls)
(type-of 3/4)             ; => RATIO
(type-of 3.14)            ; => SINGLE-FLOAT
(type-of 3.14d0)          ; => DOUBLE-FLOAT
(type-of #\A)             ; => CHARACTER
(type-of "hello")         ; => (SIMPLE-ARRAY CHARACTER (5))
(type-of 'foo)            ; => SYMBOL
(type-of '(1 2 3))        ; => CONS
(type-of #(1 2 3))        ; => (SIMPLE-VECTOR 3)
(type-of t)               ; => BOOLEAN (or SYMBOL in some impls)

;;; Type checking
(typep 42 'integer)       ; => T
(typep 3.14 'float)       ; => T
(typep '(1 2) 'list)      ; => T
(integerp 42)             ; => T   (type predicate shorthand)
(stringp "hi")            ; => T

;;; Type declarations (optimization hints, not enforced)
(defun fast-add (x y)
  (declare (type fixnum x y)
           (optimize (speed 3) (safety 0)))
  (+ x y))

;;; The type specifier system
(typep 5 '(integer 1 10))      ; T — 5 is between 1 and 10
(typep #(1 2) '(vector * 2))   ; T — a vector of length 2
```

## Gotchas

- Type declarations with `declare` are hints to the compiler for optimization; they do not prevent wrong types from being passed at runtime (safety level 0 removes checks entirely).
- Common Lisp integers are arbitrary-precision by default (bignums); `fixnum` is the limited-range, fast integer type. `(type-of 10000000000000000000)` returns `BIGNUM`.
- `nil` is both the empty list and the boolean false — `(null nil)`, `(listp nil)`, and `(not nil)` are all `T`.
