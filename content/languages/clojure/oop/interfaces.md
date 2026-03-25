---
title: "Interfaces & Traits"
language: "clojure"
feature: "interfaces"
category: "oop"
applicable: true
---

Clojure provides two interface mechanisms: **protocols** (ad-hoc polymorphism, open to extension for any type) and **multimethods** (dispatch on any function of arguments). Protocols are Clojure's primary abstraction for polymorphism.

## Example

```clojure
;; defprotocol: define an interface
(defprotocol Shape
  (area      [this])
  (perimeter [this])
  (describe  [this] "Returns a description string"))  ; docstring optional

;; Implement with defrecord inline
(defrecord Circle [radius]
  Shape
  (area      [_] (* Math/PI (* radius radius)))
  (perimeter [_] (* 2 Math/PI radius))
  (describe  [this] (str "Circle with radius " radius
                         " and area " (area this))))

(defrecord Rectangle [w h]
  Shape
  (area      [_]     (* w h))
  (perimeter [_]     (* 2 (+ w h)))
  (describe  [this]  (str "Rectangle " w "x" h)))

;; Usage: polymorphic dispatch
(doseq [s [(->Circle 5) (->Rectangle 4 6)]]
  (println (describe s)))

;; Extend an existing type (including Java types)
(extend-protocol Shape
  nil
  (area [_] 0)
  (perimeter [_] 0)
  (describe [_] "Nothing"))

;; Multimethod: dispatch on any function
(defmulti render :format)
(defmethod render :json  [data] (str "{\"value\":" (:value data) "}"))
(defmethod render :csv   [data] (str (:value data)))
(defmethod render :default [data] (str data))

(render {:format :json :value 42})   ; {"value":42}
```

## Gotchas

- Protocols dispatch on the **type** of the first argument; for other dispatch criteria use multimethods
- `extend-protocol` can add implementations to any existing type (including `nil`, `java.lang.String`, etc.) — powerful but can cause confusion if overused
- Protocol methods are fast (like virtual dispatch); multimethods are more flexible but slower
