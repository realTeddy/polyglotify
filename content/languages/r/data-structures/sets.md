---
title: "Sets"
language: "r"
feature: "sets"
category: "data-structures"
applicable: false
---

R does not have a dedicated set type. Set operations are performed on vectors using base R functions: `union()`, `intersect()`, `setdiff()`, and `is.element()` / `%in%`. For large sets, environments provide O(1) membership testing.

## Example

```r
# Vectors used as sets
a <- c(1, 2, 3, 4)
b <- c(3, 4, 5, 6)

union(a, b)        # => c(1, 2, 3, 4, 5, 6)
intersect(a, b)    # => c(3, 4)
setdiff(a, b)      # => c(1, 2)  (in a but not b)
setdiff(b, a)      # => c(5, 6)  (in b but not a)

# Membership test
3 %in% a           # => TRUE
is.element(c(1, 5, 3), a)  # => c(TRUE, FALSE, TRUE)

# Deduplication
unique(c(1, 2, 2, 3, 3, 3))  # => c(1, 2, 3)

# Checking set equality
setequal(c(1, 2, 3), c(3, 1, 2))  # => TRUE

# Performance: environment for large unique sets
as_set <- function(items) {
  env <- new.env(hash = TRUE, parent = emptyenv())
  for (item in items) assign(as.character(item), TRUE, envir = env)
  env
}
s <- as_set(1:1000)
exists("500", s)  # => TRUE (O(1))
```

## Gotchas

- `union`, `intersect`, `setdiff` return vectors with duplicates removed — they treat inputs as sets
- `c(1, 2) == c(2, 1)` is `FALSE`; use `setequal()` for set equality comparison
- For large datasets, use `data.table` or `dplyr` join operations instead of set functions
