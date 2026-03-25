---
title: "Generics"
language: "clojure"
feature: "generics"
category: "oop"
applicable: true
---

Clojure is dynamically typed, so all functions are implicitly generic. Protocols provide type-based polymorphism. `clojure.spec` enables structural schemas (like bounded generics) for runtime validation.

## Example

```clojure
;; All functions are implicitly generic
(defn first-elem [coll]
  (first coll))   ; works on any seqable (list, vector, string, set...)

(first-elem [1 2 3])      ; 1
(first-elem '(a b c))     ; a
(first-elem "hello")      ; \h

;; Generic data structures
(defn zip [& colls]
  (apply map vector colls))

(zip [1 2 3] [:a :b :c] ["x" "y" "z"])
; ([1 :a "x"] [2 :b "y"] [3 :c "z"])

;; Protocol for type-bounded polymorphism
(defprotocol Container
  (container-count [c])
  (container-add   [c item])
  (container-get   [c idx]))

;; clojure.spec: structural generics / schema
(require '[clojure.spec.alpha :as s])

;; Generic container spec
(defn coll-of-spec [element-spec]
  (s/coll-of element-spec))

(def int-list  (coll-of-spec int?))
(def str-list  (coll-of-spec string?))

(s/valid? int-list  [1 2 3])       ; true
(s/valid? str-list  ["a" "b"])     ; true
(s/valid? int-list  ["a"])         ; false

;; Higher-order generic functions
(defn transform-keys [m f]
  (reduce-kv (fn [acc k v] (assoc acc (f k) v)) {} m))

(transform-keys {:a 1 :b 2} name)
; {"a" 1, "b" 2}
```

## Gotchas

- Dynamic typing means type errors are runtime errors; use `clojure.spec` with `instrument` during development to catch them early
- `(s/fdef func :args ...)` adds spec to a function; `(stest/instrument 'func)` enables runtime checking
- Protocols provide compile-time-ish dispatch guarantees; plain functions do not — document expected argument types in docstrings
