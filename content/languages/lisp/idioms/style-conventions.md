---
title: "Style Conventions"
language: "lisp"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Common Lisp style follows conventions established over decades. Symbol names use `kebab-case` (hyphenated lowercase). Special (dynamic) variables use `*earmuffs*`. Constants use `+plus-signs+`. Type predicates end in `p` or `-p` (`stringp`, `valid-p`). Destructive (mutating) functions are prefixed with `n` (`nreverse`, `nconc`, `sort`). Indentation uses 2 spaces. Closing parentheses are stacked on the last line — never on their own line.

## Example

```common-lisp
;;; Naming conventions
(defparameter *server-port* 8080)     ; *dynamic-variable*
(defconstant +max-connections+ 100)   ; +constant+
(defun valid-email-p (s) ...)         ; predicate ends in -p
(defun nreverse-list (lst) ...)       ; destructive, n-prefix

;;; Indentation: 2 spaces, closing parens stack
(defun compute-discount (price quantity &key (minimum-order 10))
  "Calculate discount based on price and quantity."
  (let* ((subtotal (* price quantity))
         (discount (cond
                     ((>= quantity 100) 0.20)
                     ((>= quantity 50)  0.10)
                     ((>= quantity minimum-order) 0.05)
                     (t 0.0))))
    (* subtotal (- 1.0 discount))))

;;; Use &key for clarity when functions have many arguments
(defun make-server (&key (host "localhost")
                         (port 8080)
                         (timeout 30)
                         (max-clients 100))
  (list :host host :port port :timeout timeout :max-clients max-clients))

;;; Prefer functional style for list processing
(defun process-records (records predicate transformer)
  (mapcar transformer
          (remove-if-not predicate records)))

;;; Avoid deep nesting — extract named helpers
(defun readable-helper (data)
  (remove-if-not #'valid-p data))

(defun top-level-fn (raw-data)
  (mapcar #'transform
          (readable-helper raw-data)))
```

## Gotchas

- The stacked closing-paren style is non-negotiable in Lisp communities — tools like Paredit and parinfer enforce it automatically. Emacs with SLIME is the canonical development environment.
- `NIL` and `T` are conventionally written in uppercase (as is standard in the spec), but lowercase `nil` and `t` also work — be consistent within a project.
- String equality uses `string=` (case-sensitive) or `string-equal` (case-insensitive); never use `=` or `eq` for string comparison.
