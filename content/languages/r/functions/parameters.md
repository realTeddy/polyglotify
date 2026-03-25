---
title: "Parameters & Arguments"
language: "r"
feature: "parameters"
category: "functions"
applicable: true
---

R supports default parameter values, named arguments, and `...` (dot-dot-dot) for variadic arguments that can be passed to inner functions. Arguments can be matched positionally or by name. Partial name matching is supported but discouraged.

## Example

```r
# Default parameters
connect <- function(host, port = 80, ssl = FALSE) {
  paste(if (ssl) "https" else "http", host, port, sep = "://")
}
connect("example.com")
connect("example.com", ssl = TRUE)

# Named arguments (order-independent)
connect(ssl = TRUE, host = "example.com", port = 443)

# Variadic ... — passes extra args to inner functions
my_mean <- function(x, ...) {
  mean(x, ...)  # passes na.rm, trim, etc. to mean()
}
my_mean(c(1, NA, 3), na.rm = TRUE)  # => 2

# Capturing ... explicitly
summarize <- function(...) {
  args <- list(...)
  cat("Got", length(args), "arguments\n")
  args
}

# match.arg — validate enumerated arguments
style <- function(type = c("solid", "dashed", "dotted")) {
  type <- match.arg(type)  # validates and completes partial match
  cat("Style:", type)
}
style("dash")  # matches "dashed"
```

## Gotchas

- R uses lazy evaluation: arguments are not evaluated until first used — `missing(arg)` can check if an argument was supplied
- `...` must be captured explicitly with `list(...)` or `c(...)` to inspect its contents
- Partial name matching (`conn(h="example.com")`) works in R but is an anti-pattern — use full names
