---
title: "Control Flow"
language: "lisp"
feature: "control-flow"
category: "basics"
applicable: true
---

Common Lisp has a rich set of control-flow forms: `if` (two branches), `when`/`unless` (one branch with implicit progn), `cond` (multi-branch), `case`/`ecase`/`typecase`, `and`/`or` (conditional short-circuit), `do`/`dotimes`/`dolist` (loops), `loop` (a powerful macro), and non-local exits with `block`/`return-from`, `catch`/`throw`, and `tagbody`/`go`. Every form returns a value.

## Example

```common-lisp
;;; IF (two branches, returns a value)
(if (> 5 3) "yes" "no")   ; => "yes"

;;; WHEN (one branch — implicit progn if truthy)
(when (> x 0)
  (format t "positive~%")
  (incf count))

;;; UNLESS (one branch — implicit progn if falsy)
(unless (zerop denominator)
  (/ numerator denominator))

;;; COND (multi-branch)
(cond
  ((< x 0)  "negative")
  ((= x 0)  "zero")
  ((< x 10) "small")
  (t         "large"))     ; t = default branch

;;; CASE (eql comparison)
(case color
  (:red    "stop")
  (:green  "go")
  ((:yellow :amber) "caution")   ; list matches multiple keys
  (otherwise "unknown"))

;;; DOTIMES (loop 0..n-1)
(dotimes (i 5)
  (format t "~a " i))      ; 0 1 2 3 4

;;; DOLIST (loop over a list)
(dolist (item '(a b c))
  (print item))

;;; LOOP macro (powerful, DSL-like)
(loop for i from 1 to 10
      when (evenp i)
      collect i)           ; => (2 4 6 8 10)

(loop for x in '(1 2 3 4 5)
      summing x)           ; => 15

;;; BLOCK / RETURN-FROM (non-local exit from a named block)
(block outer
  (dotimes (i 10)
    (when (= i 5)
      (return-from outer i))))  ; => 5
```

## Gotchas

- `if` takes exactly one "then" form and one "else" form. For multiple statements in a branch, wrap them in `progn` — or use `when`/`unless` which have implicit `progn`.
- `case` uses `eql` for comparison, so it works well with symbols and integers but not strings or lists. Use `cond` with `string=` for string dispatch.
- The `loop` macro is extremely powerful but has its own mini-language syntax; newer code sometimes uses iterate (`iter`) or `series` for more readable looping.
