---
title: "Control Flow"
language: "r"
feature: "control-flow"
category: "basics"
applicable: true
---

R supports `if/else`, `for`, `while`, `repeat`, and `switch`. Because R is vectorized, explicit loops are often replaced with `apply`-family functions (`lapply`, `sapply`, `vapply`) or `purrr::map` for better performance and idiomatic style.

## Example

```r
# if / else (returns a value)
grade <- if (score >= 90) "A" else if (score >= 80) "B" else "C"

# ifelse — vectorized ternary
x <- c(1, -2, 3, -4)
abs_vals <- ifelse(x >= 0, x, -x)

# for loop
for (i in 1:5) {
  cat(i, "\n")
}

# for over a list
fruits <- c("apple", "banana", "cherry")
for (fruit in fruits) cat(fruit, "\n")

# while
n <- 1
while (n <= 5) {
  cat(n, "\n")
  n <- n + 1
}

# repeat / break
repeat {
  val <- readline("Enter value: ")
  if (val != "") break
}

# switch
day_type <- switch(day,
  "Saturday" = ,
  "Sunday"   = "weekend",
  "weekday"       # default
)

# Idiomatic: apply family instead of for
sapply(1:5, function(n) n^2)   # => c(1, 4, 9, 16, 25)
```

## Gotchas

- `for` loops in R are slow for large data; use vectorized operations or `apply` family instead
- `1:n` when `n == 0` produces `c(1, 0)` (counts down) — use `seq_len(n)` or `seq_along(v)` to be safe
- `next` skips to the next iteration; `break` exits the loop
