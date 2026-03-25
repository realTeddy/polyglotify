---
title: "Variables & Declaration"
language: "r"
feature: "variables"
category: "basics"
applicable: true
---

R uses `<-` as the conventional assignment operator (though `=` also works). Variables are dynamically typed and can be reassigned to any type. R is a functional language — functions are first-class objects. There is no formal constant mechanism; `lockBinding` can simulate immutability.

## Example

```r
# Assignment (conventional)
name  <- "Alice"
age   <- 30
score <- 95.5

# = also works (but <- is idiomatic)
city = "London"

# Right-to-left assignment (unusual but valid)
"Alice" -> person_name

# Multiple assignment via list unpacking (base R)
result <- list(min = 1, max = 10)

# zeallot package for Python-style multiple assignment
library(zeallot)
c(a, b) %<-% list(1, 2)

# Global assignment (from inside a function)
x <- 5
f <- function() {
  x <<- 100   # modifies x in parent environment
}
f()
x  # => 100

# Check type
class(age)    # => "numeric"
typeof(age)   # => "double"
```

## Gotchas

- R has no true constants; `lockBinding("x", globalenv())` prevents reassignment but is rarely used
- `<<-` assigns in the parent environment — use with caution to avoid unexpected mutations
- Variable names are case-sensitive: `name` and `Name` are different
