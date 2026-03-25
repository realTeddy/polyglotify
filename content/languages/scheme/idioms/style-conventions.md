---
title: "Style Conventions"
language: "scheme"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Scheme style follows conventions from the Scheme community and SRFI authors. Names use `kebab-case`. Predicates end in `?` (`null?`, `string?`, `valid-email?`). Mutating procedures end in `!` (`set!`, `vector-set!`, `push!`). Type conversion procedures use `->` (`number->string`, `char->integer`). The `<typename>` angle-bracket convention is used for record type names. Closing parentheses stack on the last line, never on their own line.

## Example

```scheme
;;; Naming conventions
(define (valid-username? name)       ; predicate: ends in ?
  (and (string? name)
       (>= (string-length name) 3)
       (<= (string-length name) 20)))

(define (normalize-email! rec)       ; mutating: ends in !
  (set-record-email! rec
    (string-downcase (record-email rec))))

(define (list->vector* lst)          ; conversion: uses ->
  (list->vector lst))

;;; Record type naming convention
(define-record-type <user>           ; angle brackets for types
  (make-user name email role)
  user?
  (name  user-name)
  (email user-email  set-user-email!)
  (role  user-role))

;;; Indentation: 2 spaces, closing parens always on last line
(define (process-users users predicate transformer)
  (let loop ((remaining users)
             (results   '()))
    (cond
      ((null? remaining)
       (reverse results))
      ((predicate (car remaining))
       (loop (cdr remaining)
             (cons (transformer (car remaining)) results)))
      (else
       (loop (cdr remaining) results)))))

;;; Comments: ; for end-of-line, ;; for block, ;;; for top-level
;;; (as a convention, though all are just comments to the parser)
```

## Gotchas

- The `!` and `?` suffix conventions are strong in Scheme but not enforced by the language — violating them confuses experienced Scheme readers.
- Scheme is whitespace-insensitive but style guides mandate 2-space indentation and never placing a closing paren on its own line — tools like `scheme-mode` in Emacs enforce this automatically.
- Avoid deep nesting by extracting named helpers — the language encourages functions over complex nested structures even more strongly than most languages because the parentheses amplify the visual depth.
