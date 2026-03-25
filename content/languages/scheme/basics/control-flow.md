---
title: "Control Flow"
language: "scheme"
feature: "control-flow"
category: "basics"
applicable: true
---

Scheme's control flow is built on a small set of primitives: `if` (two-branch), `cond` (multi-branch), `when`/`unless` (one-branch), `case` (value dispatch), `and`/`or` (short-circuit), `do` (iterative loop), and named `let` (loop via recursion). Scheme's proper tail calls (a guaranteed feature of the standard) make recursion as efficient as looping — recursive style is idiomatic and preferred over explicit loops.

## Example

```scheme
;;; IF
(if (> 5 3) "yes" "no")   ; => "yes"

;;; COND
(define (classify n)
  (cond
    ((< n 0)  'negative)
    ((= n 0)  'zero)
    ((< n 10) 'small)
    (else     'large)))

;;; WHEN / UNLESS (one branch, implicit begin)
(when (> x 0)
  (display "positive")
  (newline))

;;; CASE (eqv? comparison)
(case (modulo n 3)
  ((0)  'fizz)
  ((1)  'one)
  ((2)  'two))

;;; Named LET (idiomatic loop via recursion)
(define (sum-to n)
  (let loop ((i n) (acc 0))   ; "loop" is a local function name
    (if (= i 0)
        acc
        (loop (- i 1) (+ acc i)))))   ; tail call!
(sum-to 100)   ; => 5050

;;; DO loop (iterative, less common in idiomatic Scheme)
(do ((i 0 (+ i 1))
     (sum 0 (+ sum i)))
    ((= i 10) sum))   ; => 45

;;; FOR-EACH (side-effect loop over a list)
(for-each display '(1 2 3 4 5))   ; prints 12345

;;; MAP (functional transform)
(map (lambda (x) (* x x)) '(1 2 3 4 5))  ; => (1 4 9 16 25)
```

## Gotchas

- `if` takes exactly one "then" and one "else" expression. For multiple expressions in a branch, use `begin`: `(if test (begin a b c) (begin d e))`.
- Named `let` is the idiomatic Scheme loop — it looks like a recursive function call but the tail call optimization makes it run in constant stack space.
- `case` uses `eqv?` for comparison, which works for exact numbers and symbols but not strings or lists.
