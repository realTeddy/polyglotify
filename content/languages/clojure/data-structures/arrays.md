---
title: "Arrays & Lists"
language: "clojure"
feature: "arrays"
category: "data-structures"
applicable: true
---

Clojure provides two primary sequential types: **vectors** (`[...]`) for O(1) indexed access and efficient appending, and **lists** (`'(...)`) for efficient head access. Both are immutable and persistent. The `seq` abstraction unifies all sequences.

## Example

```clojure
;; Vector: the most common sequential type
(def v [1 2 3 4 5])

;; Indexed access O(1)
(get v 0)      ; 1
(v 2)          ; 3   (vectors are functions of their index)
(nth v 4)      ; 5

;; Append to end (efficient)
(conj v 6)     ; [1 2 3 4 5 6]

;; Update element (returns new vector)
(assoc v 2 99) ; [1 2 99 4 5]

;; Count and slice
(count v)             ; 5
(subvec v 1 4)        ; [2 3 4]
(first v)             ; 1
(rest v)              ; (2 3 4 5)  — returns a seq
(last v)              ; 5

;; List: efficient cons/head
(def lst '(1 2 3))
(conj lst 0)           ; (0 1 2 3)  -- prepend!
(first lst)            ; 1
(rest lst)             ; (2 3)

;; Common sequence operations (work on both)
(map #(* % 2) v)       ; (2 4 6 8 10)
(filter odd? v)        ; (1 3 5)
(reduce + v)           ; 15
(take 3 v)             ; (1 2 3)
(drop 3 v)             ; (4 5)
(sort [3 1 4 1 5])     ; (1 1 3 4 5)
(reverse v)            ; (5 4 3 2 1)

;; Flatten and concat
(concat [1 2] [3 4])   ; (1 2 3 4)
(flatten [1 [2 [3]]])  ; (1 2 3)
```

## Gotchas

- `conj` on a vector appends to the **end**; on a list it prepends to the **front** — behaviour depends on the type
- `rest` returns a lazy sequence (not always a vector); wrap with `vec` if you need a vector
- `nth` on an out-of-bounds index throws; use `get` with a default or `(nth coll i nil)` for safe access
