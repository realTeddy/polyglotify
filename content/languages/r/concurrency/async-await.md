---
title: "Async/Await"
language: "r"
feature: "async-await"
category: "concurrency"
applicable: false
---

R does not have native async/await syntax. Non-blocking I/O is available via the `promises` package (used by Shiny and Plumber for async web applications) and `coro` (coroutine-based async). R is primarily single-threaded; true parallelism uses `parallel`, `future`, or `foreach`.

## Example

```r
# promises package (async R for Shiny/Plumber)
library(promises)

future_result <- future_promise({
  Sys.sleep(1)  # simulates async work
  42
})

future_result %...>% (function(val) {
  cat("Got:", val, "\n")
})

# coro package — coroutine-based async
library(coro)
async_fn <- async(function() {
  val <- await(future_promise({ Sys.sleep(0.1); "hello" }))
  paste("Result:", val)
})

# future package — parallel/async evaluation
library(future)
plan(multisession)   # use background R sessions

f <- future({ slow_function() })   # starts in background
other_work()
result <- value(f)   # blocks until done

# future with explicit await
library(future)
library(promises)
f <- future({ 42 }) %...>% (function(x) x * 2)
```

## Gotchas

- `promises` async/await is event-loop based and only works inside Shiny/Plumber reactive contexts
- `future::value()` blocks the main R session — it is not truly async without additional infrastructure
- R's `future` package provides lazy, eager, or multicore execution plans — set with `plan()`
