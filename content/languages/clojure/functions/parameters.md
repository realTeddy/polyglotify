---
title: "Parameters & Arguments"
language: "clojure"
feature: "parameters"
category: "functions"
applicable: true
---

Clojure function parameters support destructuring (sequential and associative) inline in the argument list. Variadic functions use `& rest` to collect extra arguments into a sequence. Named parameters are achieved via a map argument.

## Example

```clojure
;; Basic parameters
(defn add [a b] (+ a b))

;; Variadic: & rest collects remaining args as a seq
(defn sum [& nums]
  (reduce + 0 nums))
(sum 1 2 3 4 5)   ; 15

;; Mixed fixed + variadic
(defn log [level & messages]
  (println (str "[" level "] ") (apply str messages)))

;; Sequential destructuring in params
(defn first-two [[a b & rest]]
  (println a b rest))
(first-two [1 2 3 4])   ; 1 2 (3 4)

;; Map destructuring (named-parameter style)
(defn create-user [{:keys [name age email]
                    :or   {age 0 email "N/A"}
                    :as   opts}]
  (println name age email))

(create-user {:name "Alice" :age 30})   ; Alice 30 N/A

;; :as captures the whole collection too
(defn show-pair [[a b :as pair]]
  (println "First:" a "Second:" b "All:" pair))

;; Applying a function to a collection as args
(apply + [1 2 3 4])   ; 10
(apply max [3 1 4 1 5 9])   ; 9
```

## Gotchas

- Destructuring happens at the call site in the parameter binding form — it is not a runtime match; missing keys yield `nil` (or the `:or` default)
- `& rest` collects extra args as a lazy sequence, not a vector; wrap with `vec` if you need a vector
- `apply` is needed to pass a collection as individual arguments to a variadic function
