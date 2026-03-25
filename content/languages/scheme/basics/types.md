---
title: "Types & Type Systems"
language: "scheme"
feature: "types"
category: "basics"
applicable: true
---

Scheme is dynamically typed with a small, clean set of types: booleans (`#t`/`#f`), numbers (exact integers, exact rationals, inexact reals, complex), characters, strings, symbols, pairs/lists, vectors, bytevectors, ports, and procedures. Every value has exactly one type. Type predicates (`number?`, `string?`, `pair?`, `procedure?`) test the type of a value. R7RS also introduces the `define-record-type` form for user-defined record types.

## Example

```scheme
;;; Boolean — only #f is false; everything else is truthy
(boolean? #t)        ; => #t
(boolean? #f)        ; => #t
(boolean? 0)         ; => #f  (0 is NOT false in Scheme!)

;;; Numbers
(number?   42)       ; => #t
(integer?  42)       ; => #t
(exact?    3/4)      ; => #t   (exact rational)
(inexact?  3.14)     ; => #t
(complex?  1+2i)     ; => #t

;;; Characters
(char? #\A)          ; => #t
(char->integer #\A)  ; => 65
(integer->char 97)   ; => #\a

;;; Strings
(string? "hello")    ; => #t
(string-length "hi") ; => 2
(string->symbol "foo") ; => foo

;;; Symbols
(symbol? 'foo)       ; => #t
(symbol->string 'foo) ; => "foo"

;;; Pairs and lists
(pair? '(1 2))       ; => #t
(null? '())          ; => #t   (empty list)
(list? '(1 2 3))     ; => #t

;;; Vectors
(vector? #(1 2 3))   ; => #t

;;; Procedures
(procedure? car)     ; => #t
(procedure? (lambda (x) x))  ; => #t

;;; Type predicates determine dispatch
(define (describe x)
  (cond
    ((number?    x) (string-append "number: " (number->string x)))
    ((string?    x) (string-append "string: " x))
    ((symbol?    x) (string-append "symbol: " (symbol->string x)))
    ((procedure? x) "a procedure")
    (else           "unknown")))
```

## Gotchas

- Only `#f` is false in Scheme — `0`, `""`, `'()`, and `#\nul` are all truthy. This differs from many other languages and is a common source of bugs when porting code.
- Exact arithmetic is the default for integers and rationals: `(+ 1/3 1/6)` returns `1/2`, not a float.
- `equal?` tests deep structural equality; `eqv?` tests value equality (works for symbols, numbers, booleans); `eq?` tests pointer identity (use only for symbols and booleans).
