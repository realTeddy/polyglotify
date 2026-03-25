---
title: "Structs & Classes"
language: "clojure"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Clojure uses **records** (`defrecord`) for typed structs and plain **maps** for ad-hoc data. Records are immutable, implement Java interfaces, and participate in the protocol system. `deftype` provides lower-level type creation for performance-critical code.

## Example

```clojure
;; defrecord: typed, immutable struct
(defrecord Person [name age email])

;; Construction
(def alice (->Person "Alice" 30 "alice@example.com"))
;; or: (map->Person {:name "Alice" :age 30 :email "alice@example.com"})

;; Access (like a map)
(:name alice)     ; "Alice"
(.name alice)     ; "Alice"  (Java interop)
(:age alice)      ; 30

;; "Update" (returns a new record)
(assoc alice :age 31)

;; Records are maps underneath
(map? alice)         ; true
(into {} alice)      ; {:name "Alice", :age 30, :email "alice@example.com"}

;; Type checking
(instance? Person alice)   ; true

;; Protocol implementation on a record
(defprotocol Greetable
  (greet [this]))

(defrecord FriendlyPerson [name]
  Greetable
  (greet [this] (str "Hey, I'm " (:name this) "!")))

(greet (->FriendlyPerson "Bob"))   ; "Hey, I'm Bob!"

;; Plain map as a struct (simpler, no type)
(def user {:name "Carol" :age 25})
(get user :name)   ; "Carol"
```

## Gotchas

- `defrecord` fields are positional in the constructor `->RecordName`; use `map->RecordName` for named-field construction
- Records do not allow arbitrary extra keys (unlike plain maps); use `assoc` to add extra keys to the underlying map representation
- Prefer plain maps for data that is only used within one namespace; use records when you need protocols or type dispatch
