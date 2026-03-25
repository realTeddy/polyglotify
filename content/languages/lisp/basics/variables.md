---
title: "Variables & Declaration"
language: "lisp"
feature: "variables"
category: "basics"
applicable: true
---

Common Lisp has three main ways to introduce variables: `defvar` and `defparameter` for global/dynamic (special) variables, and `let`/`let*` for lexically scoped local bindings. `defvar` only sets the value if the variable is unbound; `defparameter` always sets it. Dynamic (special) variables use the `*earmuff*` naming convention and can be rebound per-thread with `let`. `setf` and `setq` assign to existing bindings.

## Example

```common-lisp
;;; Global special (dynamic) variables
(defvar *counter* 0
  "A global counter, rebindable per thread.")

(defparameter *pi-approx* 3.14159265
  "Always reset to this value when the file is reloaded.")

;;; Constants
(defconstant +max-retries+ 3)

;;; Local lexical bindings
(let ((x 10)
      (y 20))
  (+ x y))         ; => 30  (x and y are not visible outside)

;;; let* — each binding can reference previous ones
(let* ((base 5)
       (square (* base base))
       (cube   (* square base)))
  (list base square cube))  ; => (5 25 125)

;;; Mutation with setf / setq
(setf *counter* 42)
(incf *counter*)          ; *counter* is now 43
(decf *counter* 3)        ; *counter* is now 40

;;; Dynamic rebinding — restores old value on exit
(let ((*counter* 999))
  (format t "Inside: ~a~%" *counter*))  ; 999
(format t "Outside: ~a~%" *counter*)    ; 40
```

## Gotchas

- `defvar` does **not** reinitialize the variable if it is already bound — reloading a file with `defvar` in a live REPL session will not reset the value. Use `defparameter` for values that should reset on reload.
- Naming special variables with `*earmuffs*` is a strong convention — it signals to readers that the variable is dynamically scoped and may be rebound.
- `let` binds all variables simultaneously (they cannot refer to each other in the init forms); use `let*` for sequential binding.
