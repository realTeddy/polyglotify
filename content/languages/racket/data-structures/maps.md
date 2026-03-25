---
title: "Maps & Dictionaries"
language: "racket"
feature: "maps"
category: "data-structures"
applicable: true
---

Racket provides **hash tables** as its primary map type. Both mutable (`make-hash`) and immutable (`hash`) variants exist. Keys can be any value; equality is controlled by the hash variant: `hash` uses `equal?`, `hasheqv` uses `eqv?`, and `hasheq` uses `eq?`. Association lists (`alist`) are also used for small maps.

## Example

```racket
#lang racket

; Immutable hash (functional updates return new hash)
(define h (hash "a" 1 "b" 2 "c" 3))
(hash-ref h "b")                   ; => 2
(hash-ref h "z" 0)                 ; => 0  (default)
(define h2 (hash-set h "d" 4))     ; new hash, h unchanged

; Mutable hash
(define m (make-hash))
(hash-set! m 'x 10)
(hash-set! m 'y 20)
(hash-ref m 'x)                    ; => 10
(hash-remove! m 'y)
(hash-has-key? m 'y)               ; => #f

; Iteration
(for ([(k v) (in-hash h)])
  (printf "~a -> ~a\n" k v))

; Association list
(define alist '((a . 1) (b . 2) (c . 3)))
(assoc 'b alist)   ; => '(b . 2)
(cdr (assoc 'b alist))  ; => 2
```

## Gotchas

- `hash-ref` raises an error if the key is absent and no default is provided; always supply a default or check with `hash-has-key?`.
- Immutable hashes use structural sharing, making functional updates efficient, but mutable hashes have better performance for write-heavy workloads.
- `hasheq` uses pointer equality (`eq?`), suitable only for symbols and small integers; wrong choice for string keys.
