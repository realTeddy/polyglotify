---
title: "Inheritance"
language: "r"
feature: "inheritance"
category: "oop"
applicable: true
---

R supports inheritance in all three OOP systems. In S3, inheritance is achieved by assigning multiple class names. In R6, `inherit =` in `R6Class()` provides classical single inheritance. S4 uses `contains =` for formal inheritance.

## Example

```r
library(R6)

# R6 inheritance
Animal <- R6Class("Animal",
  public = list(
    name  = NULL,
    initialize = function(name) self$name <- name,
    speak = function() cat("...\n"),
    describe = function() cat(class(self)[1], self$name, "\n")
  )
)

Dog <- R6Class("Dog",
  inherit = Animal,
  public = list(
    speak = function() cat("Woof!\n"),
    fetch = function(item) cat(self$name, "fetches", item, "\n")
  )
)

GuideDog <- R6Class("GuideDog",
  inherit = Dog,
  public = list(
    owner = NULL,
    initialize = function(name, owner) {
      super$initialize(name)   # call parent constructor
      self$owner <- owner
    },
    speak = function() {
      super$speak()            # call parent method
      cat("(gently)\n")
    }
  )
)

rex <- GuideDog$new("Rex", "Bob")
rex$speak()     # Woof! (gently)
rex$fetch("ball")
inherits(rex, "Animal")  # => TRUE
```

## Gotchas

- `super$method()` in R6 calls the parent class's method
- In S3, the inheritance chain is the vector of class names: `class(obj) <- c("Dog", "Animal")`
- R6 single-inherits by default; for multiple inheritance, use mixins or composition
