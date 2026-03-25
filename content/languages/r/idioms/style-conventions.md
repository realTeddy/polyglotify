---
title: "Style Conventions"
language: "r"
feature: "style-conventions"
category: "idioms"
applicable: true
---

R style follows the **tidyverse style guide**, enforced by **styler** (formatting) and **lintr** (linting). Key conventions: `snake_case` for all identifiers, `<-` for assignment, 80-character line limit, two-space indentation, and spaces around operators.

## Example

```r
# Naming: snake_case for everything
user_name     <- "Alice"
max_retries   <- 3L
calculate_bmi <- function(weight_kg, height_m) weight_kg / height_m^2

# Assignment: use <- not =
x <- 42       # good
x = 42        # avoid (reserved for function args)

# Spacing: spaces around <- and binary operators
y <- x + 1    # good
y<-x+1        # bad

# Function calls: space after comma, not before
f(x, y = 1)   # good
f(x,y=1)      # bad

# Long lines: break at 80 chars
very_long_result <- some_function(
  argument_one = 1,
  argument_two = 2,
  argument_three = 3
)

# Documentation: roxygen2
#' Calculate body mass index.
#'
#' @param weight_kg Weight in kilograms.
#' @param height_m  Height in metres.
#' @return BMI as a numeric scalar.
#' @export
calculate_bmi <- function(weight_kg, height_m) {
  weight_kg / height_m^2
}
```

## Gotchas

- `styler::style_file()` auto-formats R files; integrate with your editor or pre-commit hook
- `lintr::lint_package()` checks for style issues and potential bugs — address all warnings before CRAN submission
- Avoid `T` and `F` as aliases for `TRUE`/`FALSE` — they can be overwritten: `T <- FALSE` is valid R
