---
title: "Types & Type Systems"
language: "r"
feature: "types"
category: "basics"
applicable: true
---

R is dynamically typed. Its core types (modes) are: `logical`, `integer`, `double`, `complex`, `character`, and `raw`. The fundamental data structure is the **vector** — scalars are just length-1 vectors. R performs implicit coercion between numeric types.

## Example

```r
# Atomic types
logi  <- TRUE                  # logical
int   <- 42L                   # integer (L suffix)
dbl   <- 3.14                  # double (default numeric)
cpx   <- 3 + 2i                # complex
chr   <- "hello"               # character
raw_v <- as.raw(0xFF)          # raw bytes

# Vectors are the basic unit (scalars = length-1 vectors)
nums <- c(1, 2, 3, 4, 5)
length(nums)  # => 5

# Type checking
is.numeric("3")   # => FALSE
is.character("3") # => TRUE
class(42L)   # => "integer"
class(42)    # => "numeric"

# Coercion (implicit)
TRUE + 1     # => 2  (logical coerced to integer)
"3" + 1      # ERROR: non-numeric argument

# Explicit coercion
as.integer("42")   # => 42L
as.character(123)  # => "123"
as.numeric(TRUE)   # => 1

# Special values
NA       # Not Available (missing)
NULL     # absence of value / empty object
NaN      # Not a Number
Inf      # Infinity
```

## Gotchas

- `NA` propagates through operations: `1 + NA` is `NA`; use `na.rm = TRUE` in aggregation functions
- `NULL` and `NA` are different: `NULL` has no type/length; `NA` is a typed missing value
- `42` is a `double` by default; use `42L` for an integer
