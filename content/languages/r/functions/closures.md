---
title: "Closures & Lambdas"
language: "r"
feature: "closures"
category: "functions"
applicable: true
---

R functions are closures — they capture the environment in which they are created. This enables factory functions, memoization, and functional programming patterns. R 4.1 introduced `\(x) x + 1` as a shorthand for anonymous functions.

## Example

```r
# Factory function (closure over 'n')
make_multiplier <- function(n) {
  function(x) x * n   # captures n from enclosing environment
}
double <- make_multiplier(2)
triple <- make_multiplier(3)
double(5)   # => 10
triple(5)   # => 15

# Anonymous function in apply
sapply(1:5, function(n) n^2)    # old style
sapply(1:5, \(n) n^2)           # R 4.1+ shorthand

# Memoization via closure
make_counter <- function() {
  count <- 0
  list(
    increment = function() { count <<- count + 1 },
    get       = function() count
  )
}
counter <- make_counter()
counter$increment()
counter$increment()
counter$get()  # => 2

# purrr functional style
library(purrr)
add_n <- function(n) partial(sum, n)   # partial application
add5 <- add_n(5)
map_dbl(1:3, add5)  # => c(6, 7, 8)
```

## Gotchas

- Closures capture by reference to the environment — the captured variable's current value is read at call time, not at closure creation time
- `<<-` inside a closure modifies the enclosing environment; be careful with shared mutable state
- R's lazy evaluation means the argument `function(x) x * n` doesn't evaluate `n` until the function is called — use `force(n)` to avoid loop-closure pitfalls
