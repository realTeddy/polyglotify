---
title: "Result Types"
language: "r"
feature: "result-types"
category: "error-handling"
applicable: false
---

R does not have built-in Result types. The idiomatic approach uses `NA` for missing numeric values, `NULL` for absent objects, or `tryCatch` for error recovery. The `purrr` package provides `safely()`, `possibly()`, and `quietly()` wrappers that return result-like lists.

## Example

```r
library(purrr)

# purrr::safely — wraps a function to return list(result, error)
safe_log   <- safely(log)
safe_parse <- safely(function(x) as.integer(x))

safe_log(10)    # => list(result = 2.302..., error = NULL)
safe_log(-1)    # => list(result = NULL, error = <error>)

# Map over a list safely
results <- map(c("1", "two", "3"), safely(as.integer))
# Extract results / errors separately
values <- map(results, "result")   # => list(1L, NULL, 3L)
errors <- map(results, "error")    # => list(NULL, <error>, NULL)

# purrr::possibly — returns a default on error
possible_sqrt <- possibly(sqrt, otherwise = NA_real_)
map_dbl(list(4, -1, 9), possible_sqrt)  # => c(2, NA, 3)

# Native approach: NA propagation
safe_divide <- function(a, b) {
  if (b == 0) return(NA_real_)
  a / b
}
safe_divide(10, 0)  # => NA
```

## Gotchas

- `safely()` always returns a list with exactly two elements: `result` and `error`; exactly one will be `NULL`
- Unlike Haskell or Rust, R's result patterns are not enforced by the type system
- `possibly()` is simpler than `safely()` when you only need a fallback value, not the error details
