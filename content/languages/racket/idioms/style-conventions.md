---
title: "Style Conventions"
language: "racket"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Racket style follows the official [Racket Style Guide](https://docs.racket-lang.org/style/). Names use `kebab-case`. Predicates end with `?` (e.g., `null?`, `even?`). Mutating functions end with `!` (e.g., `set!`, `hash-set!`). Type conversion functions use `->` (e.g., `string->number`). Classes end with `%`. Interface names end with `<%>`. Two-space indentation is standard.

## Example

```racket
#lang racket

; Naming conventions
(define (list->vector-sorted lst)   ; conversion + description
  (list->vector (sort lst <)))

(define (valid-email? str)          ; predicate ends with ?
  (regexp-match? #rx".+@.+\\..+" str))

(define (cache-set! cache key val)  ; mutation ends with !
  (hash-set! cache key val))

; Two-space indentation, aligned arguments
(define (process-items items
                        #:transform [transform identity]
                        #:filter    [pred       (const #t)])
  (map transform
       (filter pred items)))

; Blank line between top-level definitions
(define pi 3.14159)

(define (circle-area r)
  (* pi r r))

; Module structure: provide at top, requires next, then code
;; (provide circle-area)
;; (require racket/math)
```

## Gotchas

- The convention of `!` for mutation is not enforced by the language; it is a social contract.
- Align sub-expressions vertically when they span multiple lines (DrRacket's auto-indent handles this).
- Place `(provide ...)` at the top of the file so readers can immediately see the module's public API.
- Avoid deeply nested parentheses; extract helper functions to keep nesting shallow.
