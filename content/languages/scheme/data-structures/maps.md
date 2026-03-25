---
title: "Maps & Dictionaries"
language: "scheme"
feature: "maps"
category: "data-structures"
applicable: false
---

Standard R7RS Scheme has no built-in hash-map type. Association lists (alists) are the idiomatic small-map: a list of `(key . value)` pairs searched with `assoc`/`assv`/`assq`. Many Scheme implementations provide hash tables as extensions (SRFI-69, SRFI-125, or implementation-specific). Racket and Guile have rich built-in hash-table support; portable code uses SRFI-125 if available.

## Example

```scheme
;;; Association list (alist) — standard, portable
(define phonebook
  '(("Alice" . "555-1234")
    ("Bob"   . "555-5678")
    ("Carol" . "555-9012")))

;;; Lookup (assoc uses equal? for string keys)
(assoc "Bob" phonebook)        ; => ("Bob" . "555-5678")
(cdr (assoc "Bob" phonebook))  ; => "555-5678"
(assoc "Dave" phonebook)       ; => #f (not found)

;;; Add to alist (returns new alist — functional style)
(define updated-phonebook
  (cons '("Dave" . "555-3456") phonebook))

;;; assq uses eq? (for symbols), assv uses eqv? (for numbers)
(define config '((debug . #t) (port . 8080) (host . "localhost")))
(assq 'port config)     ; => (port . 8080)
(cdr (assq 'port config)) ; => 8080

;;; SRFI-69 hash tables (if available)
;;; (import (srfi 69))
(define ht (make-hash-table))
(hash-table-set! ht "name" "Alice")
(hash-table-set! ht "age" 30)
(hash-table-ref ht "name")       ; => "Alice"
(hash-table-ref/default ht "x" #f)  ; => #f
(hash-table-size ht)             ; => 2
```

## Gotchas

- Alists search linearly — O(n). They are appropriate for small maps (< 20 entries) or functional-style "shadowing" (adding a new binding at the front).
- `assoc` uses `equal?` (deep equality, good for strings); `assv` uses `eqv?` (good for numbers); `assq` uses `eq?` (good for symbols, pointer identity).
- Hash-table availability varies: check whether your implementation supports SRFI-69, SRFI-125, or provides its own (Guile: `(make-hash-table)`, Racket: `(make-hash)`, Chez: `(make-hashtable)`).
