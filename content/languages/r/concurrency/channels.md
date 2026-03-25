---
title: "Channels & Message Passing"
language: "r"
feature: "channels"
category: "concurrency"
applicable: false
---

R does not have channels or message-passing primitives. Communication between parallel workers is achieved via shared files, databases, or by collecting return values from `parLapply`/`future`. The `liteq` and `txtq` packages provide simple queue-based IPC.

## Example

```r
# Collecting results from parallel workers (most common pattern)
library(parallel)
cl <- makeCluster(2)

results <- parLapply(cl, 1:4, function(i) {
  list(worker = Sys.getpid(), result = i^2)
})
stopCluster(cl)
# results is a list of return values from each worker

# Using a temp file as a shared channel (crude but portable)
channel_file <- tempfile()
writeLines("message 1", channel_file)
msg <- readLines(channel_file)

# txtq — simple persistent queue
library(txtq)
q <- txtq(tempfile())
q$push(data.frame(title = "task1", message = "hello"))
job <- q$pop(1)
job$message  # => "hello"

# future promise chaining (event-driven pattern)
library(future)
library(promises)
plan(multisession)
future(42) %...>%
  (function(x) x * 2) %...>%
  (function(x) cat("Final:", x, "\n"))
```

## Gotchas

- File-based channels have race conditions without proper locking — use `filelock` package for safety
- Worker processes in `parallel` share nothing by default; all data must be serialized and sent
- The `future` + `promises` pipeline is the closest R equivalent to channel-based async programming
