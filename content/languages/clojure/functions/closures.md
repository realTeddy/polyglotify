---
title: "Closures & Lambdas"
language: "clojure"
feature: "closures"
category: "functions"
applicable: true
---

All Clojure functions are closures — `fn` forms capture the lexical environment. Since Clojure values are immutable, captured variables never change unexpectedly. Anonymous functions and higher-order functions are central to idiomatic Clojure.

## Example

```clojure
;; Closure capturing an outer binding
(defn make-adder [n]
  (fn [x] (+ x n)))   ; n is captured

(def add10 (make-adder 10))
(def add5  (make-adder 5))
(add10 7)   ; 17
(add5 7)    ; 12

;; fn: anonymous function
(def double (fn [x] (* x 2)))

;; Reader shorthand #(...)
(def triple #(* % 3))
(def add #(+ %1 %2))

;; Partial application via partial
(def inc-by-5 (partial + 5))
(inc-by-5 10)   ; 15

;; Closures in higher-order functions
(defn apply-n-times [f n x]
  (if (zero? n)
    x
    (recur f (dec n) (f x))))

(apply-n-times inc 5 0)   ; 5
(apply-n-times double 3 1)   ; 8  (1->2->4->8)

;; Closure over mutable atom (intentional shared state)
(defn make-counter []
  (let [n (atom 0)]
    {:inc   #(swap! n inc)
     :reset #(reset! n 0)
     :get   #(deref n)}))

(def c (make-counter))
((:inc c))
((:inc c))
(println ((:get c)))   ; 2
```

## Gotchas

- `#(%)` shorthand cannot be nested; use `fn` for nested anonymous functions
- `partial` creates a partial application, not a true closure, but behaves similarly
- Closures over atoms provide mutable state without global variables; each closure instance has its own atom
