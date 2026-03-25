---
title: "Variables & Declaration"
language: "clojure"
feature: "variables"
category: "basics"
applicable: true
---

Clojure values are immutable by default. `def` creates a top-level var in the current namespace. `let` creates immutable local bindings scoped to a block. Mutable state requires explicit reference types: `atom`, `ref`, `agent`, or `var`.

## Example

```clojure
;; Top-level var (ns-scoped)
(def greeting "Hello, World!")
(def max-retries 3)

;; let: immutable local bindings
(let [name "Alice"
      age  30]
  (println name "is" age))

;; let with destructuring
(let [[x y z] [1 2 3]]
  (println x y z))   ; 1 2 3

(let [{:keys [name age]} {:name "Bob" :age 25}]
  (println name age))   ; Bob 25

;; Atom: mutable state via a reference type
(def counter (atom 0))
(swap! counter inc)    ; atomically increment
(reset! counter 0)     ; set value directly
(println @counter)     ; deref with @

;; def with a docstring
(def ^{:doc "Maximum number of retry attempts"} max-retries 3)

;; Private var
(def ^:private secret "internal only")
```

## Gotchas

- `def` creates a global var; use `let` for all local values to avoid polluting the namespace
- `@` is syntactic sugar for `deref`; use it to read the current value of an atom, ref, or agent
- Rebinding a `def` var (with another `def`) works at the REPL but is bad practice in production code
