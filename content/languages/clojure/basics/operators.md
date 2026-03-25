---
title: "Operators"
language: "clojure"
feature: "operators"
category: "basics"
applicable: true
---

Clojure has no infix operators. All operations are function calls in prefix (S-expression) notation. Arithmetic, comparison, and logical functions all work this way. The threading macros `->` and `->>` serve as a pipeline/composition operator.

## Example

```clojure
;; Arithmetic (variadic)
(+ 1 2 3)       ; 6
(- 10 3)        ; 7
(* 2 3 4)       ; 24
(/ 10 2)        ; 5  (exact ratio if result not integer)
(/ 10 3)        ; 10/3  (ratio type!)
(quot 10 3)     ; 3  (integer division)
(rem  10 3)     ; 1
(Math/pow 2 10) ; 1024.0

;; Comparison
(= 1 1)         ; true   (works on any value, variadic)
(not= 1 2)      ; true
(< 1 2 3)       ; true   (chained, variadic!)
(>= 3 3)        ; true

;; Logical
(and true false)   ; false
(or  false true)   ; true
(not true)         ; false

;; String operations (not operators, but common)
(str "Hello" ", " "World")  ; "Hello, World"
(count "hello")              ; 5

;; Threading macros (pipeline)
(-> "  hello world  "
    clojure.string/trim
    clojure.string/upper-case
    (clojure.string/split #" "))
; ["HELLO" "WORLD"]

(->> (range 1 11)
     (filter even?)
     (map #(* % %))
     (reduce +))
; 220
```

## Gotchas

- `(/ 10 3)` returns the ratio `10/3`, not `3`; use `(/ 10.0 3)` or `(double (/ 10 3))` for float division
- `=` is deep structural equality for all Clojure collections; `(= [1 2] [1 2])` is `true`
- `(< 1 2 3)` is valid and means `1 < 2 < 3`; this is more concise than other languages
