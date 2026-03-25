---
title: "Parameters & Arguments"
language: "scheme"
feature: "parameters"
category: "functions"
applicable: true
---

Scheme lambda lists support required parameters, a rest parameter (with a dot `.` or `rest` name), and — in R7RS — optional and keyword parameters via `define-syntax` or implementation-specific extensions (SRFI-89). The standard only provides required and rest parameters; keyword arguments require library support. All arguments are passed by value (with procedures and mutable objects effectively passed by reference to the shared structure).

## Example

```scheme
;;; Required parameters
(define (add a b) (+ a b))
(add 3 4)   ; => 7

;;; Rest parameter (variadic) — dot notation
(define (my-list . args) args)
(my-list 1 2 3)   ; => (1 2 3)

;;; Mixed required and rest
(define (log-message level . parts)
  (display (string-append "[" level "] "))
  (for-each display parts)
  (newline))

(log-message "INFO" "User " "Alice" " logged in")

;;; Applying a function to a list of arguments
(apply + '(1 2 3 4 5))    ; => 15
(apply max '(3 1 4 1 5))  ; => 5
(apply string-append '("a" "b" "c"))  ; => "abc"

;;; SRFI-89 style optional/keyword args (not standard, but widely supported)
;;; (define (connect #!key (host "localhost") (port 8080))
;;;   (list host port))

;;; Portable alternative: alist-based keyword simulation
(define (connect . kwargs)
  (let ((host (or (assoc 'host kwargs) '(host . "localhost")))
        (port (or (assoc 'port kwargs) '(port . 8080))))
    (list (cdr host) (cdr port))))
```

## Gotchas

- The rest parameter collects all remaining arguments into a list — `(define (f a . rest) rest)` called as `(f 1 2 3)` gives `rest = (2 3)`.
- `apply` takes a procedure, any number of leading individual arguments, and a final list: `(apply + 1 2 '(3 4))` is `(+ 1 2 3 4)`.
- Standard Scheme has no keyword arguments; rely on rest lists with `assoc`, or use an implementation's extension (SRFI-89, Guile's `#:keyword` syntax, Racket's `#:keyword` syntax).
