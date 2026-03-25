---
title: "Generics"
language: "r"
feature: "generics"
category: "oop"
applicable: false
---

R does not have language-level generics as found in Java or Scala. R's equivalent is **generic functions** (S3/S4 dispatch) combined with dynamic typing. Functions like `mean()`, `print()`, and `summary()` dispatch on the class of their first argument, achieving polymorphism without type parameters.

## Example

```r
# S3 generic function — polymorphism via dispatch
describe <- function(x, ...) UseMethod("describe")

describe.numeric <- function(x, ...) {
  cat("Numeric vector of length", length(x), "\n")
}
describe.character <- function(x, ...) {
  cat("Character vector:", paste(x, collapse=", "), "\n")
}
describe.default <- function(x, ...) {
  cat("Object of class:", class(x), "\n")
}

describe(c(1, 2, 3))       # => "Numeric vector of length 3"
describe(c("a", "b"))      # => "Character vector: a, b"
describe(TRUE)             # => "Object of class: logical"

# Functions naturally work on any type (duck typing)
container <- function(items) {
  list(
    get   = function(i) items[[i]],
    size  = function()  length(items),
    apply = function(f) lapply(items, f)
  )
}

# Works with any element type
c_nums  <- container(list(1, 2, 3))
c_strs  <- container(list("a", "b", "c"))
```

## Gotchas

- S3 dispatch is based on `class(x)` — any list can impersonate any class by setting its class attribute
- S4 generics support multiple dispatch (dispatch on multiple argument types) unlike S3's single dispatch
- `vctrs` package provides type-safe generic vector operations for building new vector classes
