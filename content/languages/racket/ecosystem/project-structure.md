---
title: "Project Structure"
language: "racket"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

A Racket project is a directory containing an `info.rkt` at the root (package metadata), source files with `#lang racket` declarations, and conventionally a `main.rkt` entry point. Multi-collection packages have subdirectories per collection. Tests live in a `tests/` directory or alongside source files. Documentation is written in Scribble (`scribblings/`).

## Example

```
my-package/
├── info.rkt          ; package metadata
├── main.rkt          ; main module / entry point
├── private/          ; internal implementation modules
│   └── helpers.rkt
├── tests/
│   └── main-test.rkt
└── scribblings/      ; Scribble documentation
    └── my-package.scrbl
```

```racket
; info.rkt
#lang info
(define name "my-package")
(define version "0.1.0")
(define deps '("base" "rackunit-lib"))
(define scribblings '(("scribblings/my-package.scrbl" ())))

; main.rkt
#lang racket
(require "private/helpers.rkt")
(provide greet)
(define (greet name) (string-append "Hello, " name "!"))
```

```bash
# Run the main module
racket main.rkt

# Compile (byte-compile for faster loading)
raco make main.rkt

# Run tests
raco test tests/
```

## Gotchas

- `provide` controls what a module exports; without it, nothing is accessible to requiring modules.
- `require` paths are relative to the file's directory or use collection paths like `(require json)`.
- A package with a single collection should have its `info.rkt` in the collection directory, not a parent.
