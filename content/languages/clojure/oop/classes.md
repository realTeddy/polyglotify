---
title: "Classes"
language: "clojure"
feature: "classes"
category: "oop"
applicable: false
---

Clojure has no user-defined OOP classes. Instead, it separates data (maps and records) from behaviour (functions and protocols). This avoids the coupling of state and methods that is characteristic of OOP.

For Java interoperability, Clojure can interact with Java classes via Java interop syntax (`.method`, `new ClassName`, `ClassName/staticMethod`).

## Example

```clojure
;; Data + functions (Clojure idiom, not OOP classes)
(defrecord Point [x y])

;; Functions that operate on Point (the "methods")
(defn distance [p1 p2]
  (Math/sqrt (+ (Math/pow (- (:x p2) (:x p1)) 2)
                (Math/pow (- (:y p2) (:y p1)) 2))))

(defn translate [p dx dy]
  (->Point (+ (:x p) dx) (+ (:y p) dy)))

(def p1 (->Point 0 0))
(def p2 (->Point 3 4))
(println (distance p1 p2))          ; 5.0
(println (translate p1 1 2))        ; #user.Point{:x 1, :y 2}

;; Java class usage (interop)
(def sb (new StringBuilder))
(.append sb "Hello")
(.append sb ", World!")
(str sb)   ; "Hello, World!"

;; Static method
(Math/sqrt 16)   ; 4.0
(System/currentTimeMillis)

;; Creating a Java object
(def today (java.util.Date.))
(println today)
```

## Gotchas

- Records (`defrecord`) are not classes with methods; they are typed maps that can implement protocols
- Java interop works well but should be isolated at the boundaries of your system to keep core logic pure
- For class-like encapsulation, use namespaces as modules and protocols as interfaces
