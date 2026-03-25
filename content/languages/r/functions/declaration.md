---
title: "Function Declaration"
language: "r"
feature: "declaration"
category: "functions"
applicable: true
---

R functions are first-class objects created with the `function` keyword. Every function has its own environment (scope) and returns the last evaluated expression. R uses copy-on-modify semantics, so function arguments are not mutated unless explicitly reassigned with `<<-`.

## Example

```r
# Basic function
greet <- function(name) {
  paste0("Hello, ", name, "!")
}
greet("Alice")  # => "Hello, Alice!"

# Explicit return
safe_divide <- function(a, b) {
  if (b == 0) return(NA)
  a / b
}

# Arrow function style (R 4.1+)
double <- \(x) x * 2
double(5)  # => 10

# Immediately invoked
result <- (function(x) x + 1)(41)

# Recursive function
factorial <- function(n) {
  if (n <= 0) 1 else n * factorial(n - 1)
}

# Function with side effects
log_and_return <- function(x) {
  message("Processing: ", x)
  x
}
```

## Gotchas

- The last expression in a function body is automatically returned; explicit `return()` is needed only for early exit
- Functions in R are closures — they capture the environment in which they were defined
- R uses lazy evaluation for function arguments: `f(stop("error"))` does not evaluate the argument until it is used
