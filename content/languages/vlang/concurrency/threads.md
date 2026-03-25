---
title: "Threads"
language: "vlang"
feature: "threads"
category: "concurrency"
applicable: true
---

V uses `go` to spawn concurrent coroutines (which may map to OS threads depending on the runtime). `sync.WaitGroup` coordinates completion. `sync.Mutex` protects shared state. `go fn_call()` returns a `thread` handle that can be joined with `.wait()`. V's concurrency model is inspired by Go.

## Example

```v
import sync
import time

fn worker(id int, mut wg sync.WaitGroup) {
    defer { wg.done() }
    time.sleep(10 * time.millisecond)
    println('Worker $id done')
}

fn main() {
    mut wg := sync.WaitGroup{}

    for i in 1..6 {
        wg.add(1)
        go worker(i, mut wg)
    }

    wg.wait()
    println('All workers finished')
}

// Mutex for shared state
fn counter_example() {
    mut mu      := sync.Mutex{}
    mut counter := 0

    mut handles := []thread{}
    for _ in 0..100 {
        handles << go fn [mut mu, mut counter]() {
            mu.lock()
            counter++
            mu.unlock()
        }()
    }

    for h in handles { h.wait() }
    println(counter)  // 100
}
```

## Gotchas

- `go fn_call()` returns a `thread` value; call `.wait()` on it to join and get the return value.
- `sync.Mutex` is a value type; pass it as `mut` to functions that need to lock/unlock.
- V coroutines run on OS threads by default; the number of threads is controlled by the runtime.
