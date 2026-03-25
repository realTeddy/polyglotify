---
title: "Async/Await"
language: "vlang"
feature: "async-await"
category: "concurrency"
applicable: false
---

V does not have `async`/`await` syntax. Concurrency is achieved through coroutines (spawned with `go`) and channels, similar to Go. The `go` keyword launches a function call concurrently. Communication between coroutines uses typed channels.

## Example

```v
import time

fn fetch_data(id int, ch chan string) {
    time.sleep(10 * time.millisecond)
    ch <- 'data-$id'
}

fn main() {
    ch := chan string{cap: 2}

    // Spawn goroutine-like concurrent functions
    go fetch_data(1, ch)
    go fetch_data(2, ch)

    // Receive results
    r1 := <-ch
    r2 := <-ch
    println(r1)
    println(r2)
}
```

## Gotchas

- V's `go` keyword behaves similarly to Go's goroutines — it spawns a lightweight concurrent execution unit.
- There is no `async fn` — concurrency is always opt-in at the call site with `go`.
- V does not have an `await` expression; synchronization is done via channels or `sync.WaitGroup`.
