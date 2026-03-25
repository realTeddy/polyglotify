---
title: "Types & Type Systems"
language: "clojure"
feature: "types"
category: "basics"
applicable: true
---

Clojure is dynamically typed and hosted on the JVM. It interoperates with Java types. Core types include longs, doubles, booleans, nil, symbols, keywords, strings, characters, lists, vectors, maps, and sets. `clojure.spec` (and `malli`) provide optional structural type/schema validation.

## Example

```clojure
;; Primitive types
42          ; Long
3.14        ; Double
true        ; Boolean
nil         ; null equivalent
"hello"     ; String (Java String)
\a          ; Character

;; Clojure-specific types
:keyword    ; Keyword (interned, fast equality)
'symbol     ; Symbol
#"pattern"  ; Regex (Java Pattern)

;; Collections (all immutable)
[1 2 3]             ; Vector
'(1 2 3)            ; List
{:a 1 :b 2}         ; Map (hash-map)
#{1 2 3}            ; Set

;; Type checking
(type 42)           ; java.lang.Long
(class "hello")     ; java.lang.String
(integer? 42)       ; true
(string? "hello")   ; true
(nil? nil)          ; true
(keyword? :foo)     ; true
(vector? [1 2])     ; true

;; clojure.spec for structural validation
(require '[clojure.spec.alpha :as s])
(s/def ::age pos-int?)
(s/def ::name string?)
(s/def ::user (s/keys :req [::name ::age]))

(s/valid? ::age 30)     ; true
(s/valid? ::age -1)     ; false
```

## Gotchas

- Clojure runs on the JVM; `Long` and `Double` are boxed Java types — use type hints `^long` to avoid reflection
- `nil` is falsy; `false` is also falsy; everything else (including `0` and `""`) is truthy
- Keywords (`:foo`) are not strings; they are interned and compared by identity, making them very fast as map keys
