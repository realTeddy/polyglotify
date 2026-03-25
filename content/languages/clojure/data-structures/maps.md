---
title: "Maps & Dictionaries"
language: "clojure"
feature: "maps"
category: "data-structures"
applicable: true
---

Clojure maps are immutable, persistent hash maps. Keyword keys are idiomatic and act as getter functions. `assoc`, `dissoc`, `update`, and `merge` return new maps. `get-in` and `assoc-in` navigate nested maps.

## Example

```clojure
;; Map literal with keyword keys
(def person {:name "Alice" :age 30 :email "alice@example.com"})

;; Access
(:name person)          ; "Alice"  (keyword as function)
(get person :age)       ; 30
(person :age)           ; 30       (map as function)
(get person :city "N/A") ; "N/A"   (default)

;; Add / update (returns new map)
(assoc person :city "Berlin")
(assoc person :age 31)

;; Remove key
(dissoc person :email)

;; Update with a function
(update person :age inc)          ; age -> 31
(update person :name str "!")     ; name -> "Alice!"

;; Merge (right side wins on conflict)
(merge {:a 1 :b 2} {:b 99 :c 3})
; {:a 1, :b 99, :c 3}

;; Nested maps
(def config {:db {:host "localhost" :port 5432}
             :app {:debug true}})

(get-in config [:db :port])             ; 5432
(assoc-in config [:db :port] 3306)      ; new nested map
(update-in config [:db :port] inc)      ; 5433

;; Iterate
(doseq [[k v] person]
  (println k "->" v))

(keys person)    ; (:name :age :email)
(vals person)    ; ("Alice" 30 "alice@example.com")
```

## Gotchas

- `assoc` on a key that already exists updates it; `assoc` on a new key adds it — both return a new map
- `(get m :k)` returns `nil` for missing keys; `(:k m)` does too; use `(get m :k default)` to distinguish nil values
- `merge-with` applies a function when there are key conflicts: `(merge-with + {:a 1} {:a 2})` → `{:a 3}`
