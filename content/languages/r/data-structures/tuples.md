---
title: "Tuples"
language: "r"
feature: "tuples"
category: "data-structures"
applicable: false
---

R does not have tuples. Named lists serve the same purpose — they can hold heterogeneous values accessed by name or position. For tabular data, data frames and tibbles are idiomatic. The `zeallot` package enables multi-value destructuring.

## Example

```r
# Named list as tuple
point <- list(x = 10, y = 20)
point$x   # => 10
point[[2]] # => 20

# Returning "tuple-like" values from a function
divide_with_remainder <- function(a, b) {
  list(quotient = a %/% b, remainder = a %% b)
}
result <- divide_with_remainder(17, 5)
result$quotient   # => 3
result$remainder  # => 2

# Multi-value destructuring (zeallot)
library(zeallot)
c(q, r) %<-% divide_with_remainder(17, 5)
q  # => 3
r  # => 2

# Fixed-size heterogeneous data: single-row data frame
row <- data.frame(name = "Alice", age = 30, active = TRUE)
row$name  # => "Alice"

# Or a typed structure-like object
person <- structure(
  list(name = "Alice", age = 30),
  class = "Person"
)
```

## Gotchas

- Named lists have no fixed size — elements can be added or removed freely, unlike tuples in other languages
- The `zeallot` package's `%<-%` operator requires the list to have the exact number of elements being destructured
