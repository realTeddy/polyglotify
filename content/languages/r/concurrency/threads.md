---
title: "Threads"
language: "r"
feature: "threads"
category: "concurrency"
applicable: false
---

R does not have user-level threads. The standard approach to parallelism is forking processes with `parallel::mclapply` (Unix) or spawning new R sessions with `parallel::parLapply` or the `future` package (cross-platform). The `furrr` package wraps `future` with a `purrr`-compatible API.

## Example

```r
library(parallel)

# Detect cores
n_cores <- detectCores() - 1  # leave one for OS

# mclapply — fork-based (Unix/macOS only)
results <- mclapply(1:100, function(i) {
  Sys.sleep(0.01)
  i^2
}, mc.cores = n_cores)

# parLapply — works on Windows too
cl <- makeCluster(n_cores)
clusterExport(cl, varlist = c("my_function"))  # export objects
results <- parLapply(cl, 1:100, function(i) i^2)
stopCluster(cl)

# future + furrr (tidyverse-friendly)
library(future)
library(furrr)
plan(multisession, workers = 4)

results <- future_map_dbl(1:100, ~ .x^2)
plan(sequential)  # reset to sequential
```

## Gotchas

- `mclapply` uses `fork()` and does not work on Windows; use `parLapply` or `future` for cross-platform code
- Always call `stopCluster(cl)` after `makeCluster` to release resources
- Objects needed inside parallel workers must be explicitly exported (serialized and sent to each worker)
