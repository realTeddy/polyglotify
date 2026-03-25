---
title: "Sets"
language: "clojure"
feature: "sets"
category: "data-structures"
applicable: true
---

Clojure sets are immutable, persistent hash sets. They are created with `#{}` literal syntax or `clojure.set` functions. Sets support all standard set operations via the `clojure.set` namespace.

## Example

```clojure
(require '[clojure.set :as set])

;; Set literal (duplicates removed automatically)
(def s1 #{1 2 3 4 5})
(def s2 #{3 4 5 6 7})

;; From a collection (deduplicates)
(set [1 2 2 3 3 3])   ; #{1 2 3}

;; Membership (O(1))
(contains? s1 3)   ; true
(s1 3)             ; 3   (sets are functions; returns nil if absent)
(s1 9)             ; nil

;; Add / remove (returns new set)
(conj s1 6)        ; #{1 2 3 4 5 6}
(disj s1 1)        ; #{2 3 4 5}

;; Set operations
(set/union        s1 s2)   ; #{1 2 3 4 5 6 7}
(set/intersection s1 s2)   ; #{3 4 5}
(set/difference   s1 s2)   ; #{1 2}

;; Predicates
(set/subset? #{1 2} s1)       ; true
(set/superset? s1 #{1 2})     ; true

;; Size and conversion
(count s1)            ; 5
(seq s1)              ; (1 2 3 4 5)  (order not guaranteed)
(into [] s1)          ; [1 2 3 4 5]

;; Iteration (Clojure seqs work on sets)
(map #(* % 2) s1)     ; (2 4 6 8 10)
(filter odd? s1)      ; (1 3 5)
```

## Gotchas

- Sets use `=` (structural equality) for membership; `(#{"a"} "a")` is `"a"`, not `true`
- Iteration order is not guaranteed; for sorted iteration use `(sort s)`
- `(s elem)` returns the element itself (truthy) or `nil` (falsy) — useful as a predicate but check for `nil` specifically if `nil` might be an element
