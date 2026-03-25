---
title: "Structs & Classes"
language: "scheme"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

R7RS Scheme provides `define-record-type` (originally from SRFI-9) as the standard way to define structured data types. A record type has a constructor, a predicate, and named field accessors (and optionally mutators). There is no class system in standard Scheme — OOP is typically implemented via closure-based objects or, in extended implementations like Racket, via class libraries.

## Example

```scheme
;;; define-record-type (R7RS / SRFI-9)
(define-record-type <person>
  (make-person name age email)   ; constructor
  person?                         ; type predicate
  (name  person-name)            ; field: accessor only (immutable)
  (age   person-age  set-person-age!)   ; field: accessor + mutator
  (email person-email set-person-email!))

(define alice (make-person "Alice" 30 "alice@example.com"))

(person-name  alice)    ; => "Alice"
(person-age   alice)    ; => 30
(person? alice)         ; => #t
(person? '(a b c))      ; => #f

;;; Mutation (only fields with a mutator defined)
(set-person-age! alice 31)
(person-age alice)      ; => 31

;;; Nested records
(define-record-type <address>
  (make-address street city zip)
  address?
  (street address-street)
  (city   address-city)
  (zip    address-zip))

(define-record-type <employee>
  (make-employee name address salary)
  employee?
  (name    employee-name)
  (address employee-address)
  (salary  employee-salary set-employee-salary!))

(define emp (make-employee "Bob"
                            (make-address "123 Main St" "Springfield" "62701")
                            75000))

(address-city (employee-address emp))   ; => "Springfield"
```

## Gotchas

- `define-record-type` creates a truly opaque type — records do not print readably by default (implementation-specific print representation).
- Fields are immutable unless you provide a mutator name as the third element in the field spec: `(age person-age set-person-age!)`.
- There is no inheritance between record types in standard R7RS. Racket's `struct` supports inheritance; SRFI-131 adds extensible records to portable Scheme.
