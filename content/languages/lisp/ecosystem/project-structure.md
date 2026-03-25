---
title: "Project Structure"
language: "lisp"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

Common Lisp projects are organized as **ASDF systems** defined by a `.asd` file. Source files are listed in the system definition with explicit dependency order. The conventional layout has packages declared in a `packages.lisp` file, core code in `src/`, and tests in `tests/` or `t/`. Projects are typically placed in `~/quicklisp/local-projects/` for local development discovery.

## Example

```
my-project/
├── my-project.asd          ; ASDF system definition
├── README.md
├── packages.lisp           ; (defpackage ...) declarations
├── src/
│   ├── utils.lisp
│   ├── core.lisp
│   └── api.lisp
├── tests/
│   ├── my-project-tests.asd ; separate test system
│   ├── test-utils.lisp
│   └── test-core.lisp
└── examples/
    └── demo.lisp
```

```lisp
;; packages.lisp
(defpackage #:my-project
  (:use #:cl)
  (:import-from #:alexandria #:when-let #:if-let)
  (:export #:main #:process #:make-thing))

;; src/core.lisp
(in-package #:my-project)

(defun process (data)
  "Core processing function."
  (mapcar #'transform data))

(defun transform (item)
  (* item 2))

;; tests/my-project-tests.asd
(asdf:defsystem #:my-project/tests
  :depends-on (#:my-project #:fiveam)
  :components ((:file "tests/test-core")))
```

## Gotchas

- ASDF processes files in the order listed in `:components` — circular dependencies in `:depends-on` cause load errors; keep dependency graphs acyclic.
- `(in-package #:my-project)` at the top of each source file sets the current package; forgetting it causes symbols to be interned in `CL-USER` or another wrong package.
- Place your project in `~/quicklisp/local-projects/` for Quicklisp to find it automatically with `(ql:quickload :my-project)`; otherwise use `(asdf:load-system :my-project)` directly.
