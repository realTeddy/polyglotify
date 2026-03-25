---
title: "Classes"
language: "r"
feature: "classes"
category: "oop"
applicable: true
---

R supports multiple OOP systems. **S3** is the most common (informal, generic functions). **S4** is formal with class definitions and multiple dispatch. **R6** (from the `R6` package) provides class-based OOP with reference semantics and is closest to classes in other languages.

## Example

```r
library(R6)

BankAccount <- R6Class(
  classname = "BankAccount",
  private = list(
    .balance = 0
  ),
  public = list(
    owner = NULL,

    initialize = function(owner, initial = 0) {
      self$owner    <- owner
      private$.balance <- initial
    },

    deposit = function(amount) {
      if (amount <= 0) stop("Amount must be positive")
      private$.balance <- private$.balance + amount
      invisible(self)  # return self for chaining
    },

    withdraw = function(amount) {
      if (amount > private$.balance) stop("Insufficient funds")
      private$.balance <- private$.balance - amount
      invisible(self)
    },

    print = function(...) {
      cat(sprintf("BankAccount(%s: $%.2f)\n", self$owner, private$.balance))
    }
  ),
  active = list(
    balance = function() private$.balance  # read-only active binding
  )
)

acct <- BankAccount$new("Alice", 100)
acct$deposit(50)$withdraw(30)
acct$balance  # => 120
```

## Gotchas

- R6 objects are reference objects — assigning `b <- acct` gives another reference to the same object, not a copy; use `b <- acct$clone()` to copy
- `private$` fields are accessible only inside the class; `self$` refers to public members
- Active bindings (in `active`) look like fields but call a function — useful for computed read-only properties
