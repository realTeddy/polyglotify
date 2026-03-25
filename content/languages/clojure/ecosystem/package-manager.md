---
title: "Package Manager"
language: "clojure"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Clojure uses **Leiningen** (the traditional tool) or **deps.edn** (Clojure CLI tools, the modern approach). Both resolve dependencies from **Clojars** (Clojure-specific) and **Maven Central** (JVM ecosystem). Dependencies are identified by Maven coordinates.

## Example

```bash
# Leiningen
lein new app myproject    # create project
lein deps                 # download dependencies
lein run                  # run main
lein repl                 # interactive REPL
lein test                 # run tests
lein uberjar              # build standalone jar

# Clojure CLI / deps.edn
clj -M:run                # run with main alias
clj -M:test               # run tests
clj -M:repl               # start REPL
clj -Sdeps '{:deps {org.clojure/clojure {:mvn/version "1.12.0"}}}'
```

```clojure
;; project.clj (Leiningen)
(defproject myapp "0.1.0-SNAPSHOT"
  :description "My Clojure app"
  :dependencies [[org.clojure/clojure "1.12.0"]
                 [ring/ring-core "1.11.0"]
                 [compojure "1.7.1"]
                 [cheshire "5.13.0"]]  ; JSON
  :main ^:skip-aot myapp.core
  :profiles {:uberjar {:aot :all}})
```

```edn
;; deps.edn (Clojure CLI)
{:paths ["src" "resources"]
 :deps {org.clojure/clojure {:mvn/version "1.12.0"}
        ring/ring-core      {:mvn/version "1.11.0"}
        cheshire/cheshire   {:mvn/version "5.13.0"}}
 :aliases
 {:run  {:main-opts ["-m" "myapp.core"]}
  :test {:extra-paths ["test"]
         :extra-deps {io.github.cognitect-labs/test-runner
                      {:git/tag "v0.5.1" :git/sha "dfb30dd"}}}}}
```

## Gotchas

- Maven coordinates are `[group/artifact "version"]` in Leiningen or `{group/artifact {:mvn/version "..."}}` in deps.edn
- Clojure CLI (`deps.edn`) supports git dependencies directly with `:git/tag` and `:git/sha`
- `lein uberjar` includes all dependencies; the resulting jar is self-contained but large
