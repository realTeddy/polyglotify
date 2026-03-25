---
title: "Testing"
language: "r"
feature: "testing"
category: "ecosystem"
applicable: true
---

R's standard testing framework is **testthat** (part of the tidyverse ecosystem). Tests live in `tests/testthat/` and are run with `devtools::test()` or `R CMD check`. `expect_*` functions provide rich matchers.

## Example

```r
# tests/testthat/test-utils.R
library(testthat)

test_that("add() returns correct sum", {
  expect_equal(add(2, 3), 5)
  expect_equal(add(-1, 1), 0)
})

test_that("add() handles edge cases", {
  expect_equal(add(0, 0), 0)
  expect_type(add(1L, 2L), "integer")
})

test_that("safe_divide() returns NA for zero divisor", {
  expect_true(is.na(safe_divide(5, 0)))
})

test_that("errors are thrown correctly", {
  expect_error(withdraw(-5), "positive")
  expect_warning(log(-1), NA)  # NA means no warning expected
})

# Snapshot testing
test_that("summary output is stable", {
  expect_snapshot(summary(my_model))
})
```

```r
# Run tests
devtools::test()                    # all tests
testthat::test_file("test-utils.R") # single file
R CMD check --as-cran mypackage     # full check
```

## Gotchas

- `expect_equal()` uses `all.equal()` with tolerance for floating-point; use `expect_identical()` for exact equality
- testthat 3rd edition (enabled in `DESCRIPTION` with `Config/testthat/edition: 3`) is the modern default
- `expect_snapshot()` writes `.snap` files — commit them and review changes carefully in PRs
