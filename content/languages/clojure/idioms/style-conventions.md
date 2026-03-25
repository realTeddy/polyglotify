---
title: "Style Conventions"
language: "clojure"
feature: "style-conventions"
category: "idioms"
applicable: true
---

The Clojure community follows the [Clojure Style Guide](https://guide.clojure.style/). **cljfmt** and **zprint** are standard formatters; **clj-kondo** is the standard linter.

## Example

```clojure
;; Naming conventions
;; kebab-case for everything (not camelCase or snake_case)
(def my-variable 42)
(defn my-function [arg] ...)

;; Predicates end with ?
(defn valid? [x] (pos? x))
(defn empty-coll? [c] (empty? c))

;; Functions with side effects end with !
(defn save! [db record] ...)
(defn reset! [atom val] ...)

;; Private functions: defn- or ^:private
(defn- internal [] ...)

;; Constants: SCREAMING_SNAKE_CASE is NOT idiomatic — use def with docstring
(def max-retries 3)   ;; not MAX_RETRIES

;; Namespace: reverse-domain, kebab-case
(ns com.example.my-app.core
  (:require [clojure.string :as str]
            [clojure.set    :as set]))

;; Indentation: 2 spaces, no tabs
(defn long-function [a b c]
  (let [x (+ a b)
        y (* b c)]
    (+ x y)))

;; Alignment of map literals
(def config
  {:host    "localhost"
   :port    5432
   :timeout 30})

;; One form per line in let, cond, etc.
(let [a 1
      b 2
      c 3]
  (+ a b c))
```

```bash
# Lint
clj-kondo --lint src/

# Format
cljfmt fix src/

# Check formatting
cljfmt check src/
```

## Gotchas

- S-expression structure means indentation is for readability only; the formatter enforces alignment, not semantics
- `clj-kondo` can lint ClojureScript and bb (babashka) too; configure it via `.clj-kondo/config.edn`
- Docstrings go after the function name, before the argument vector: `(defn f "doc" [x] ...)`
