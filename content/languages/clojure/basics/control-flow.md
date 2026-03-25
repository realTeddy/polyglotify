---
title: "Control Flow"
language: "clojure"
feature: "control-flow"
category: "basics"
applicable: true
---

Clojure control flow uses `if`, `when`, `cond`, `case`, and `loop/recur`. All forms are expressions. `when` is an `if` with no else branch (returns `nil`). `cond` handles multi-way branching. `loop/recur` enables tail-recursive iteration without stack overflow.

## Example

```clojure
;; if (both branches)
(if (> 5 3)
  "yes"
  "no")   ; "yes"

;; when (no else; returns nil on false)
(when (pos? 5)
  (println "positive")
  "done")   ; prints and returns "done"

;; cond (multi-branch)
(defn classify [n]
  (cond
    (neg? n)  "negative"
    (zero? n) "zero"
    (< n 10)  "small"
    :else     "large"))   ; :else is just a truthy value

;; case (constant dispatch, O(1))
(defn day-name [n]
  (case n
    1 "Monday"
    2 "Tuesday"
    7 "Sunday"
    "Unknown"))

;; condp (predicate dispatch)
(condp = :green
  :red   "stop"
  :green "go"
  :else  "caution")

;; loop / recur (tail-recursive iteration)
(defn sum-to [n]
  (loop [i n acc 0]
    (if (zero? i)
      acc
      (recur (dec i) (+ acc i)))))
(sum-to 100)   ; 5050

;; for (list comprehension)
(for [x (range 1 6)
      :when (odd? x)]
  (* x x))   ; (1 9 25)

;; doseq (side-effecting iteration)
(doseq [x [1 2 3]]
  (println x))
```

## Gotchas

- `if` with no else returns `nil`; use `when` to make the nil return explicit and intentional
- `recur` can only be used in tail position; the compiler enforces this
- `case` uses `=` for comparison and requires compile-time constant test values
