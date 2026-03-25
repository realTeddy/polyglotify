---
title: "Result Types"
language: "clojure"
feature: "result-types"
category: "error-handling"
applicable: true
---

Clojure has no built-in Result type, but common conventions include returning `nil` for absence, `{:ok val}` / `{:error msg}` maps, or tagged vectors `[:ok val]` / `[:error msg]`. Libraries like **failjure** and **either** provide monadic result types.

## Example

```clojure
;; nil-based result (simplest)
(defn find-by-id [db id]
  (get db id))   ; nil if absent

;; Nil-safe chaining
(some-> (find-by-id db 1)
        :email
        str/lower-case)

;; Tagged vector result
(defn safe-parse-int [s]
  (try
    [:ok (Integer/parseInt s)]
    (catch NumberFormatException _
      [:error (str "Not an integer: " s)])))

(let [[status val] (safe-parse-int "42")]
  (case status
    :ok    (println "Got:" val)
    :error (println "Error:" val)))

;; Map-based result
(defn validate-age [age]
  (cond
    (not (integer? age)) {:error "age must be an integer"}
    (neg? age)           {:error "age must be non-negative"}
    :else                {:ok age}))

;; Chain operations
(defn process-age [input]
  (let [result (validate-age input)]
    (if (:error result)
      result
      (assoc result :ok (* (:ok result) 2)))))

;; failjure library (monadic style)
;; (require '[failjure.core :as f])
;; (f/if-let-ok? [val (safe-divide 10 2)] val (str "Error: " (f/message val)))

;; Threading with error short-circuit
(defn chain [& fns]
  (fn [input]
    (reduce (fn [acc f]
              (if (:error acc) acc (f (:ok acc))))
            {:ok input}
            fns)))
```

## Gotchas

- `nil` is idiomatic for "not found" but cannot distinguish "found and nil" from "not found"; use `{:found? false}` for explicit absence
- `some->` threads through operations and short-circuits on `nil`; it is Clojure's null-safe navigation
- Consistency matters: pick one error pattern per codebase and stick to it
