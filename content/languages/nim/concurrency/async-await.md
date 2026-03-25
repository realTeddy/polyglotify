---
title: "Async/Await"
language: "nim"
feature: "async-await"
category: "concurrency"
applicable: true
---

Nim has native async/await via the `asyncdispatch` module. `async` marks a proc as asynchronous; `await` waits for a `Future[T]`. The event loop is driven by `runForever()` or `waitFor()`. `asynchttpserver` and `asyncnet` provide async I/O. Nim's async transforms proc bodies into state machines at compile time.

## Example

```nim
import asyncdispatch, asynchttpserver, asyncnet

# Async function
proc fetchData(url: string): Future[string] {.async.} =
  await sleepAsync(100)   # simulate async work
  return "data from " & url

# Async proc with multiple awaits
proc processAll(): Future[void] {.async.} =
  let r1 = await fetchData("https://api.example.com/a")
  let r2 = await fetchData("https://api.example.com/b")
  echo r1
  echo r2

# Concurrent futures
proc runConcurrent(): Future[void] {.async.} =
  let f1 = fetchData("url1")
  let f2 = fetchData("url2")
  let f3 = fetchData("url3")

  # Wait for all concurrently
  let results = await all(f1, f2, f3)
  for r in [results[0], results[1], results[2]]:
    echo r

# Run the event loop
waitFor processAll()
waitFor runConcurrent()
```

## Gotchas

- `waitFor` runs the event loop until the future completes; only call it from synchronous code.
- Nim's async is single-threaded by default; CPU-bound work still blocks the event loop.
- `asyncdispatch` uses a global dispatcher; initialize it before spawning async tasks.
