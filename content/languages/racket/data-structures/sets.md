---
title: "Sets"
language: "racket"
feature: "sets"
category: "data-structures"
applicable: true
---

Racket's `racket/set` library provides functional immutable sets backed by hash tables. `set`, `seteq`, and `seteqv` correspond to the three hash equality variants. All set operations (`set-add`, `set-remove`, `set-union`, `set-intersect`) return new sets, preserving immutability. Mutable sets are also available via `mutable-set`.

## Example

```racket
#lang racket
(require racket/set)

; Create sets
(define s1 (set 1 2 3 4 5))
(define s2 (set 3 4 5 6 7))

; Membership
(set-member? s1 3)   ; => #t
(set-member? s1 9)   ; => #f

; Add / remove (returns new set)
(set-add s1 6)       ; => {1 2 3 4 5 6}
(set-remove s1 1)    ; => {2 3 4 5}

; Set operations
(set-union        s1 s2)  ; => {1 2 3 4 5 6 7}
(set-intersect    s1 s2)  ; => {3 4 5}
(set-subtract     s1 s2)  ; => {1 2}
(subset? (set 1 2) s1)    ; => #t

; Conversion
(set->list s1)            ; => some permutation of '(1 2 3 4 5)
(list->set '(1 2 2 3))    ; => {1 2 3}

; Iteration
(for ([x (in-set s1)])
  (displayln x))
```

## Gotchas

- Set iteration order is unspecified (hash-based).
- `set` uses `equal?` by default, so it works correctly with strings and lists as elements; use `seteq` only for symbols and small integers.
- There is no built-in set literal syntax; you must call `(set ...)` explicitly.
