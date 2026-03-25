---
title: "Inheritance"
language: "clojure"
feature: "inheritance"
category: "oop"
applicable: false
---

Clojure has no class inheritance. Code reuse is achieved through **protocols** (polymorphic dispatch), **multimethods** (open dispatch on arbitrary values), and composition. The `derive` function builds a hierarchy for multimethod dispatch.

## Example

```clojure
;; derive: build an ad-hoc hierarchy for multimethod dispatch
(derive ::dog  ::animal)
(derive ::cat  ::animal)
(derive ::labrador ::dog)

(defmulti speak ::type)
(defmethod speak ::animal [_]  "...")
(defmethod speak ::dog    [_]  "Woof!")
(defmethod speak ::cat    [_]  "Meow!")

(speak {:type ::labrador})  ; "Woof!" (inherits from ::dog)
(speak {:type ::cat})       ; "Meow!"

;; Protocol as "interface" (add methods to any type, including existing ones)
(defprotocol Describable
  (describe [this]))

(defrecord Circle [radius])
(defrecord Square [side])

(extend-protocol Describable
  Circle (describe [c] (str "Circle r=" (:radius c)))
  Square (describe [s] (str "Square s=" (:side s))))

(describe (->Circle 5))   ; "Circle r=5"
(describe (->Square 3))   ; "Square s=3"

;; Composition instead of inheritance
(defrecord Animal [name sound])
(defrecord Pet    [animal owner])

(defn speak-pet [pet]
  (str (:name (:animal pet)) " says " (:sound (:animal pet))))

(def fido (->Pet (->Animal "Fido" "woof") "Alice"))
(speak-pet fido)   ; "Fido says woof"
```

## Gotchas

- Clojure hierarchies (via `derive`) are for dispatch purposes only; they don't share data or implementation
- Protocols are open — you can extend them to types you don't own (`extend-protocol java.lang.String ...`)
- Multimethods dispatch on any function of the arguments, not just type — very powerful for data-driven dispatch
