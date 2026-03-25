---
title: "Package Manager"
language: "lisp"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Common Lisp's de facto package manager is **Quicklisp**, created by Zach Beane. It manages a curated repository of over 1,500 libraries. `(ql:quickload :library-name)` downloads, compiles, and loads a library in one step. **ASDF** (Another System Definition Facility) is the underlying build system that defines how Lisp systems are compiled and loaded. ASDF system definitions (`.asd` files) declare dependencies, source files, and load order.

## Example

```common-lisp
;; Install Quicklisp (run once, in a shell):
;; curl -O https://beta.quicklisp.org/quicklisp.lisp
;; sbcl --load quicklisp.lisp --eval '(quicklisp-quickstart:install)'

;; Then add to your ~/.sbclrc:
;; (load "~/quicklisp/setup.lisp")

;; Loading a library
(ql:quickload :alexandria)          ; utility functions
(ql:quickload :cl-ppcre)            ; regex
(ql:quickload :drakma)              ; HTTP client
(ql:quickload :cl-json)             ; JSON

;; Search for a library
(ql:system-apropos "json")

;; Update all libraries
(ql:update-all-dists)
```

```lisp
;; my-project.asd — ASDF system definition
(asdf:defsystem #:my-project
  :description "My Common Lisp project"
  :author "Alice"
  :version "0.1.0"
  :license "MIT"
  :depends-on (#:alexandria #:cl-ppcre #:drakma)
  :components ((:file "packages")
               (:file "utils"    :depends-on ("packages"))
               (:file "api"      :depends-on ("packages" "utils"))
               (:file "main"     :depends-on ("api"))))
```

## Gotchas

- Quicklisp's library index is updated on a fixed schedule (roughly monthly) — to get the absolute latest version of a library, use ASDF's `load-source-op` with a manually cloned git repo in `~/quicklisp/local-projects/`.
- ASDF system names and package names are distinct: the system `cl-ppcre` (for ASDF/Quicklisp) provides the package `cl-ppcre` (for `use-package`/`in-package`), but the two are independent.
- `ql:quickload` returns the system regardless of whether it was already loaded — it is idempotent and safe to call repeatedly.
