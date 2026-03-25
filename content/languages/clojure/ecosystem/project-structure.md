---
title: "Project Structure"
language: "clojure"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

Clojure projects follow a Maven-style source layout. Namespace names map to file paths: `com.example.core` → `src/com/example/core.clj`. Both Leiningen and Clojure CLI tools use this convention.

## Example

```
myapp/
├── deps.edn             -- (or project.clj for Leiningen)
├── src/
│   └── myapp/
│       ├── core.clj     -- namespace myapp.core
│       ├── db.clj       -- namespace myapp.db
│       └── handlers.clj -- namespace myapp.handlers
├── test/
│   └── myapp/
│       ├── core_test.clj
│       └── db_test.clj
├── resources/
│   └── config.edn       -- runtime config
└── dev/
    └── user.clj         -- REPL helpers (not shipped)
```

```clojure
;; src/myapp/core.clj
(ns myapp.core
  (:require [myapp.db :as db]
            [clojure.string :as str]
            [cheshire.core :as json])
  (:gen-class))   ; needed for standalone jar

(defn -main [& args]
  (println "Hello from myapp!"))
```

```clojure
;; dev/user.clj (REPL conveniences, loaded automatically)
(ns user
  (:require [myapp.core :as core]
            [clojure.repl :refer [doc source]]))

(defn reset []
  ;; hot reload, typically via component or mount
  )
```

## Gotchas

- Namespace segments use dots (`.`) but file paths use slashes and hyphens in namespace names become underscores in file names: `my-app.some-ns` → `src/my_app/some_ns.clj`
- `:gen-class` in the namespace declaration is required for `lein uberjar` to generate a runnable jar
- Keep `dev/` outside of `src/`; it should never be included in production builds
