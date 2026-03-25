---
title: "Common Patterns"
language: "r"
feature: "common-patterns"
category: "idioms"
applicable: true
---

R idioms center on vectorized operations, the pipe (`|>` or `%>%`), `apply`-family functional programming, and tidy data manipulation with `dplyr`. The tidyverse provides a coherent set of packages with a consistent API for data science workflows.

## Example

```r
library(dplyr)
library(purrr)

# Pipe-based data transformation
mtcars |>
  filter(cyl == 6) |>
  mutate(kpl = mpg * 0.425) |>
  group_by(gear) |>
  summarise(mean_kpl = mean(kpl), n = n()) |>
  arrange(desc(mean_kpl))

# apply family
sapply(1:5, \(n) n^2)               # returns simplified vector/matrix
lapply(1:5, \(n) n^2)               # always returns list
vapply(1:5, \(n) n^2, numeric(1))   # type-safe sapply

# purrr map — consistent return types
map(c(1, 4, 9), sqrt)          # => list of doubles
map_dbl(c(1, 4, 9), sqrt)      # => numeric vector

# Function composition
library(purrr)
trim_upper <- compose(toupper, trimws)
trim_upper("  hello  ")  # => "HELLO"

# Conditional mutation in dplyr
mutate(df, grade = case_when(
  score >= 90 ~ "A",
  score >= 80 ~ "B",
  TRUE        ~ "C"
))
```

## Gotchas

- Base R `|>` pipe (R 4.1+) does not support placeholder (`.`) for non-first arguments; use `\(x)` lambda
- `sapply` silently simplifies results — use `vapply` with an expected type for safer code
- Modifying a data frame in a loop is slow — build a list and call `bind_rows()` once at the end
