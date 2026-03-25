---
title: "Operators"
language: "racket"
feature: "operators"
category: "basics"
applicable: true
---

Racket has no infix operators. All operations use prefix s-expression syntax: `(operator arg ...)`. Arithmetic, comparison, and logical operations are regular functions. Many functions accept a variable number of arguments: `(+ 1 2 3)` is valid. Boolean operators `and` and `or` are short-circuiting special forms that return the determining value, not necessarily a boolean.

## Example

```racket
#lang racket

; Arithmetic
(+ 1 2 3)      ; => 6
(- 10 3)       ; => 7
(* 4 5)        ; => 20
(/ 10 4)       ; => 5/2  (exact rational)
(quotient 10 3) ; => 3   (integer division)
(remainder 10 3) ; => 1
(expt 2 10)    ; => 1024
(sqrt 16)      ; => 4

; Comparison
(= 1 1)        ; => #t  (numeric equality)
(equal? '(1 2) '(1 2)) ; => #t  (structural equality)
(eq? 'a 'a)    ; => #t  (identity / symbol equality)
(< 1 2 3)      ; => #t  (chained comparison)

; Boolean
(and 1 2 3)    ; => 3   (last truthy value)
(or #f #f 42)  ; => 42  (first truthy value)
(not #f)       ; => #t

; Bitwise (for exact integers)
(bitwise-and 12 10) ; => 8
(bitwise-or  12 10) ; => 14
(arithmetic-shift 1 4) ; => 16
```

## Gotchas

- `=` only works on numbers; use `equal?` for general structural equality.
- `(/ 1 2)` returns the exact rational `1/2`; use `(/ 1.0 2)` or `(exact->inexact 1/2)` to get a float.
- `and`/`or` return the deciding value, not necessarily `#t`/`#f`; wrap with `(if ... #t #f)` or `boolean=?` if you need a strict boolean result.
