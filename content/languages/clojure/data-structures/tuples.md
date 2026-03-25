---
title: "Tuples"
language: "clojure"
feature: "tuples"
category: "data-structures"
applicable: true
---

Clojure has no dedicated tuple type. Small fixed-size heterogeneous collections are represented as **vectors**. Vectors support positional destructuring and are the idiomatic "tuple" in Clojure. The vector `[status value]` pattern mirrors tagged tuples in other functional languages.

## Example

```clojure
;; Vector as a 2-tuple (pair)
(def point [3 4])
(def result [:ok 42])
(def err    [:error "not found"])

;; Access by index
(first point)    ; 3
(second point)   ; 4
(get point 0)    ; 3

;; Destructuring
(let [[x y] point]
  (println x y))   ; 3 4

;; Tagged result pattern (like Rust/Elixir)
(defn safe-divide [x y]
  (if (zero? y)
    [:error "division by zero"]
    [:ok (/ x y)]))

(let [[status val] (safe-divide 10 2)]
  (case status
    :ok    (println "Result:" val)
    :error (println "Error:" val)))

;; Nested destructuring
(def matrix [[1 2] [3 4]])
(let [[[a b] [c d]] matrix]
  (println a b c d))   ; 1 2 3 4

;; Returning multiple values
(defn min-max [coll]
  [(apply min coll) (apply max coll)])

(let [[lo hi] (min-max [5 1 8 3])]
  (println "lo=" lo "hi=" hi))
```

## Gotchas

- Vectors are mutable by adding/replacing elements (returning a new vector); they are not true immutable tuples
- Positional destructuring silently assigns `nil` for missing positions: `(let [[a b c] [1 2]] c)` → `nil`
- For type-tagged data with many fields, prefer a map over a large vector to improve readability
