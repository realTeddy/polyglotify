---
title: "Result Types"
language: "racket"
feature: "result-types"
category: "error-handling"
applicable: true
---

Racket does not have a built-in `Result` type like Haskell or Rust, but the pattern is trivially implemented using tagged lists, structs, or the `either` idiom. Functions that may fail conventionally return `#f` for failure, raise an exception, or use a custom success/failure struct. Libraries like `result` on the package index provide a more formal variant.

## Example

```racket
#lang racket

; Simple tagged approach
(struct ok  (value) #:transparent)
(struct err (message) #:transparent)

(define (safe-divide a b)
  (if (= b 0)
      (err "division by zero")
      (ok (/ a b))))

(define (result-map r f)
  (if (ok? r) (ok (f (ok-value r))) r))

(define (result-and-then r f)
  (if (ok? r) (f (ok-value r)) r))

; Usage
(define r (safe-divide 10 2))
(match r
  [(ok v)  (printf "Result: ~a\n" v)]
  [(err m) (printf "Error: ~a\n"  m)])

; Chaining
(result-and-then
  (safe-divide 10 2)
  (lambda (x) (safe-divide x 0)))
; => (err "division by zero")

(result-map (safe-divide 10 2) (lambda (x) (* x 3)))
; => (ok 15)
```

## Gotchas

- This is a user-land pattern, not a built-in; different codebases may use different conventions (`#f`, exceptions, or structs).
- Racket's `match` makes working with tagged structs ergonomic, but there is no automatic propagation operator like Rust's `?`.
- For applications using exception-heavy APIs, wrapping calls in `with-handlers` and converting to `ok`/`err` at boundaries is a clean architectural pattern.
