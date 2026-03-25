---
title: "Operators"
language: "r"
feature: "operators"
category: "basics"
applicable: true
---

R operators are vectorized by default — they apply element-wise across vectors. R has special operators: `%in%` (membership), `%*%` (matrix multiplication), `%%` (modulo), `%/%` (integer division), and user-definable infix operators enclosed in `%%`.

## Example

```r
# Arithmetic (vectorized)
c(1, 2, 3) + c(10, 20, 30)  # => c(11, 22, 33)
c(1, 2, 3) * 2              # scalar recycling => c(2, 4, 6)
7 %% 3                       # => 1 (modulo)
7 %/% 3                      # => 2 (integer division)
2 ^ 10                       # => 1024 (exponentiation)

# Comparison (vectorized)
c(1, 2, 3) > 2               # => c(FALSE, FALSE, TRUE)

# Logical (element-wise vs short-circuit)
c(T, F) & c(T, T)            # element-wise AND
TRUE && FALSE                # short-circuit AND (scalar)
c(T, F) | c(F, T)            # element-wise OR

# Membership
3 %in% c(1, 2, 3, 4)         # => TRUE

# Pipe operator
library(magrittr)  # or base R |> (R 4.1+)
c(1, 2, 3) |> mean()         # => 2
c(1, NA, 3) |> mean(na.rm = TRUE)  # => 2

# Custom infix operator
`%between%` <- function(x, range) x >= range[1] & x <= range[2]
5 %between% c(1, 10)         # => TRUE
```

## Gotchas

- `&` and `|` are vectorized; `&&` and `||` are scalar (short-circuit) — only use `&&`/`||` in `if` conditions
- Vector recycling is silent: `c(1,2,3,4) + c(1,2)` gives `c(2,4,4,6)` with a warning only if lengths are not multiples
- `==` on `NA` returns `NA`, not `FALSE`; use `is.na()` to check for missing values
