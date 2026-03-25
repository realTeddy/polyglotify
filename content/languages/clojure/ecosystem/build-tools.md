---
title: "Build Tools"
language: "clojure"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Clojure's two build ecosystems are **Leiningen** (traditional, plugin-based) and **Clojure CLI + tools.build** (modern, data-driven). Both produce standalone uberjars for deployment. The REPL-driven development workflow is central to Clojure.

## Example

```bash
# --- Leiningen ---
lein new app myapp        # scaffold project
lein run                  # run -main
lein uberjar              # package into standalone jar
lein test                 # run tests
lein compile              # AOT compile
lein repl                 # start REPL
lein clean                # remove target/

# Run the uberjar
java -jar target/myapp-0.1.0-SNAPSHOT-standalone.jar

# --- Clojure CLI + tools.build ---
clj -T:build uber         # build an uberjar via build.clj

# clj -X alias runs a function
# clj -M alias runs -main
```

```clojure
;; build.clj (tools.build)
(ns build
  (:require [clojure.tools.build.api :as b]))

(def class-dir "target/classes")
(def uber-file "target/myapp.jar")
(def basis (b/create-basis {:project "deps.edn"}))

(defn uber [_]
  (b/delete {:path "target"})
  (b/copy-dir {:src-dirs   ["src" "resources"]
               :target-dir class-dir})
  (b/compile-clj {:basis      basis
                  :src-dirs   ["src"]
                  :class-dir  class-dir})
  (b/uber {:class-dir class-dir
           :uber-file uber-file
           :basis     basis
           :main      'myapp.core}))
```

```edn
;; deps.edn aliases for build
{:aliases
 {:build {:deps   {io.github.clojure/tools.build {:git/tag "v0.9.6" :git/sha "8e78bcc"}}
          :ns-default build}}}
```

## Gotchas

- AOT compilation speeds startup but can cause issues with dynamic code; use it only for the entry-point namespace
- `lein uberjar` includes all transitive dependencies; check jar size and use `:exclusions` to remove redundant deps
- The `tools.build` approach is more composable and scriptable; prefer it for new projects
