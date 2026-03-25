---
title: "Return Values"
language: "clojure"
feature: "return-values"
category: "functions"
applicable: true
---

Every Clojure expression returns a value — the last expression in a function body is its return value. There is no `return` keyword. Idiomatic error handling uses `nil` for absence, or tagged maps/vectors like `{:ok val}` / `{:error msg}`. Libraries often use `ex-info` exceptions.

## Example

```clojure
;; Last expression is the return value
(defn add [a b]
  (let [result (+ a b)]
    result))   ; result is returned

;; Multiple "values" via a vector or map
(defn min-max [coll]
  [(apply min coll) (apply max coll)])

(let [[lo hi] (min-max [3 1 4 1 5 9])]
  (println lo hi))   ; 1 9

;; Nil for absence (idiomatic)
(defn find-user [db id]
  (get db id))   ; nil if not found

;; Map-based result pattern
(defn safe-divide [x y]
  (if (zero? y)
    {:error "division by zero"}
    {:ok (/ x y)}))

(let [{:keys [ok error]} (safe-divide 10 2)]
  (if error
    (println "Error:" error)
    (println "Result:" ok)))

;; Returning multiple values with destructuring
(defn stats [nums]
  {:min (apply min nums)
   :max (apply max nums)
   :sum (reduce + nums)
   :count (count nums)})

(let [{:keys [min max]} (stats [1 2 3 4 5])]
  (println min max))   ; 1 5
```

## Gotchas

- `do` sequences multiple expressions and returns the last: `(do (side-effect) value)`
- Returning `nil` is often idiomatic in Clojure where other languages throw; but check callsites consistently
- `when` returns `nil` on the falsy branch; this is sometimes intentional, sometimes a bug — be explicit with `if`
