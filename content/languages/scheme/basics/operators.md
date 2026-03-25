---
title: "Operators"
language: "scheme"
feature: "operators"
category: "basics"
applicable: true
---

Scheme uses prefix notation for all operations. Arithmetic (`+`, `-`, `*`, `/`), comparison (`=`, `<`, `<=`, `>`, `>=`), and logical operations (`and`, `or`, `not`) are all regular procedures or special forms. Comparison procedures accept multiple arguments. There is no separate operator syntax — everything is a function call. `and` and `or` are special forms with short-circuit evaluation.

## Example

```scheme
;;; Arithmetic (prefix, variadic)
(+ 1 2 3 4)       ; => 10
(* 2 3 4)         ; => 24
(- 10 3 2)        ; => 5
(/ 10 2)          ; => 5
(/ 1 3)           ; => 1/3  (exact rational)
(/ 1.0 3)         ; => 0.333...  (inexact)
(modulo 10 3)     ; => 1
(remainder 10 3)  ; => 1  (differs for negative args)
(quotient 10 3)   ; => 3  (integer division)
(expt 2 10)       ; => 1024
(sqrt 2)          ; => 1.4142... (inexact)
(abs -5)          ; => 5
(max 3 1 4 1 5)   ; => 5
(min 3 1 4)       ; => 1

;;; Comparison (multiple args: tests pairwise chain)
(= 5 5)           ; => #t
(< 1 2 3 4)       ; => #t  (1<2 AND 2<3 AND 3<4)
(>= 5 5 3)        ; => #t

;;; Logical operators (short-circuit, return values not just #t/#f)
(and 1 2 3)       ; => 3    (all truthy, returns last)
(and #f 2)        ; => #f   (short-circuits)
(or #f #f 42)     ; => 42   (returns first truthy value)
(not #f)          ; => #t
(not 0)           ; => #f   (0 is truthy in Scheme!)

;;; Bitwise (R7RS via (import (scheme bitwise)) or SRFI-151)
(bitwise-and #b1010 #b1100)   ; => 8
(bitwise-or  #b1010 #b0101)   ; => 15
(arithmetic-shift 1 4)         ; => 16
```

## Gotchas

- `(- 5)` is unary negation (returns -5), not zero arguments. `(-)` is an error.
- `modulo` and `remainder` differ for negative operands: `(modulo -7 3)` = 2 (result has sign of divisor); `(remainder -7 3)` = -1 (result has sign of dividend).
- `and` and `or` return the value of the last evaluated form, not necessarily `#t` or `#f` — idiom: `(or x default)` returns `x` if truthy, else `default`.
