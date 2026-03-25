---
title: "Control Flow"
language: "racket"
feature: "control-flow"
category: "basics"
applicable: true
---

Racket's primary control form is `if`, which requires both a then and an else branch. `cond` handles multi-branch dispatch like a chain of if-else. `when` and `unless` are one-armed conditionals for side effects. `case` dispatches on a value using `eqv?`. `do` provides an imperative loop, but idiomatic Racket prefers tail-recursive named `let` or higher-order functions like `map`, `filter`, and `foldl`.

## Example

```racket
#lang racket

; if — both branches required
(if (> 5 3) "yes" "no")  ; => "yes"

; cond
(define (classify n)
  (cond [(< n 0) "negative"]
        [(= n 0) "zero"]
        [else    "positive"]))

; when / unless (return void, used for side effects)
(when #t (displayln "hello"))
(unless #f (displayln "world"))

; case
(define (day-type d)
  (case d
    [(saturday sunday) "weekend"]
    [(monday tuesday wednesday thursday friday) "weekday"]
    [else "unknown"]))

; Named let loop (idiomatic iteration)
(let loop ([i 0] [acc '()])
  (if (= i 5)
      (reverse acc)
      (loop (+ i 1) (cons (* i i) acc))))
; => '(0 1 4 9 16)

; Higher-order iteration
(map (lambda (x) (* x x)) '(1 2 3 4 5))
; => '(1 4 9 16 25)
```

## Gotchas

- `if` in Racket is an expression, not a statement; it always returns a value.
- `when`/`unless` can have multiple body forms but always return `#<void>`.
- `case` uses `eqv?` for comparison, so it works with numbers, characters, and symbols but not strings or lists.
