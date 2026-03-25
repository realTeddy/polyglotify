---
title: "Return Values"
language: "r"
feature: "return-values"
category: "functions"
applicable: true
---

R functions implicitly return the last evaluated expression. Explicit `return()` enables early exit. Multiple values are returned as a named `list`. R functions are pure in the functional sense — they do not mutate inputs (copy-on-modify).

## Example

```r
# Implicit return
square <- function(n) n^2

# Explicit early return
safe_sqrt <- function(x) {
  if (x < 0) return(NaN)
  sqrt(x)
}

# Returning multiple values as a named list
bounds <- function(x) {
  list(min = min(x), max = max(x), mean = mean(x))
}

result <- bounds(c(1, 5, 3, 2, 4))
result$min   # => 1
result$max   # => 5

# Destructuring with zeallot
library(zeallot)
c(lo, hi, avg) %<-% bounds(1:10)

# Invisible return — suppresses auto-printing
modify_env <- function(env) {
  env$count <- env$count + 1
  invisible(env)  # returns without printing
}

# Functions with side effects return NULL invisibly by default
cat("hello")  # returns NULL invisibly
```

## Gotchas

- R does not have tuple return; use a named `list` for multiple return values
- `invisible(x)` returns `x` but suppresses automatic printing when called at the top level — useful for assignment functions
- A function that ends with an assignment (e.g., `x <- 5`) returns `NULL` invisibly, not `5`
