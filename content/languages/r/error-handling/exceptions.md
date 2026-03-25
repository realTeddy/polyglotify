---
title: "Exceptions & Try/Catch"
language: "r"
feature: "exceptions"
category: "error-handling"
applicable: true
---

R uses `tryCatch()` and `withCallingHandlers()` for exception handling. Errors are raised with `stop()`, warnings with `warning()`, and messages with `message()`. R has a condition system that is more general than simple exceptions.

## Example

```r
# tryCatch
result <- tryCatch({
  log(-1)                   # generates a warning
  sqrt("a")                 # generates an error
}, warning = function(w) {
  message("Warning: ", conditionMessage(w))
  NA_real_
}, error = function(e) {
  message("Error: ", conditionMessage(e))
  -1
}, finally = {
  message("Cleanup")
})

# Custom condition
my_error <- function(message, data = NULL) {
  structure(
    class = c("my_error", "error", "condition"),
    list(message = message, data = data)
  )
}

tryCatch(
  stop(my_error("custom error", data = list(code = 404))),
  my_error = function(e) {
    cat("Caught custom error. Code:", e$data$code, "\n")
  }
)

# Simplified: try()
val <- try(sqrt("x"), silent = TRUE)
if (inherits(val, "try-error")) cat("Error occurred\n")

# withCallingHandlers — doesn't exit the call stack
withCallingHandlers(
  { warning("minor issue"); 42 },
  warning = function(w) { invokeRestart("muffleWarning") }
)
```

## Gotchas

- `tryCatch` exits the expression when a condition is caught; `withCallingHandlers` stays in the call stack (allows resumption)
- `stop()` accepts a character string or a condition object; always provide informative messages
- `try()` is simpler than `tryCatch()` but only catches errors, not warnings
