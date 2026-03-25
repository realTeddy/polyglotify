---
title: "Operators"
language: "lisp"
feature: "operators"
category: "basics"
applicable: true
---

Common Lisp has no infix operators — all operations use prefix notation in the form `(operator arg1 arg2 ...)`. Arithmetic functions (`+`, `-`, `*`, `/`) accept any number of arguments. Comparison functions (`=`, `/=`, `<`, `<=`, `>`, `>=`) also accept multiple arguments and test pairwise. Logical operators are `and`, `or`, `not`. Bitwise operations use `logand`, `logior`, `logxor`, `lognot`, `ash` (shift).

## Example

```common-lisp
;;; Arithmetic (prefix, variadic)
(+ 1 2 3 4)         ; => 10
(* 2 3 4)           ; => 24
(- 10 3 2)          ; => 5  (10 - 3 - 2)
(/ 10 2)            ; => 5
(/ 1 3)             ; => 1/3 (exact rational!)
(mod 10 3)          ; => 1
(rem 10 3)          ; => 1  (differs from mod for negatives)
(expt 2 10)         ; => 1024
(sqrt 2.0)          ; => 1.4142...
(abs -5)            ; => 5
(max 3 1 4 1 5 9)   ; => 9
(min 3 1 4)         ; => 1

;;; Comparison (chaining: (< a b c) means a < b AND b < c)
(= 1 1)             ; => T
(/= 1 2)            ; => T   (not equal)
(< 1 2 3 4)         ; => T   (all strictly increasing)
(>= 5 5 3)          ; => T

;;; Logical operators (short-circuit, return last evaluated value)
(and 1 2 3)         ; => 3   (all truthy, returns last)
(and nil 2)         ; => NIL (short-circuits at nil)
(or nil nil 42)     ; => 42  (returns first truthy)
(not nil)           ; => T
(not 42)            ; => NIL (everything except nil is truthy)

;;; Bitwise
(logand #b1010 #b1100)  ; => 8   (#b1000)
(logior #b1010 #b0101)  ; => 15  (#b1111)
(logxor #b1010 #b1100)  ; => 6   (#b0110)
(ash 1 4)               ; => 16  (left shift by 4)
(ash 16 -2)             ; => 4   (right shift by 2)
```

## Gotchas

- `/` on integers returns an exact rational: `(/ 1 3)` is `1/3`, not `0`. Use `(float (/ 1 3))` or `(/ 1.0 3)` for floating-point division.
- `and` and `or` are not boolean operators in the strict sense — they return the last evaluated form's value, which is idiomatic for conditional initialization: `(or x default-value)`.
- `=` compares numbers only; use `equal` or `eql` for general equality and `equalp` for deep structural equality.
