---
title: "Structs & Classes"
language: "r"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

R has three OOP systems: S3 (informal, list + class attribute), S4 (formal, `setClass`/`setGeneric`), and R5/Reference Classes. The modern `R6` package provides mutable reference semantics. For data containers, a named list with an S3 class is the simplest pattern.

## Example

```r
# S3 — lightweight struct-like class
new_person <- function(name, age) {
  obj <- list(name = name, age = age)
  class(obj) <- "Person"
  obj
}

print.Person <- function(p, ...) {
  cat(sprintf("Person(%s, %d)\n", p$name, p$age))
}

toString.Person <- function(p, ...) {
  sprintf("%s (age %d)", p$name, p$age)
}

alice <- new_person("Alice", 30)
print(alice)  # => "Person(Alice, 30)"

# R6 class (mutable, reference semantics)
library(R6)
BankAccount <- R6Class("BankAccount",
  public = list(
    owner   = NULL,
    balance = 0,

    initialize = function(owner, balance = 0) {
      self$owner   <- owner
      self$balance <- balance
    },

    deposit = function(amount) {
      self$balance <- self$balance + amount
      invisible(self)
    }
  )
)
acct <- BankAccount$new("Alice", 100)
acct$deposit(50)
acct$balance  # => 150
```

## Gotchas

- S3 has no formal class definition — anyone can assign any class attribute to any object
- R6 objects are mutable reference types (unlike most R objects) — modifications affect all references
- S4 is verbose but provides formal type checking, multiple dispatch, and better IDE support
