---
title: "Async/Await"
language: "odin"
feature: "async-await"
category: "concurrency"
applicable: false
---

Odin has no async/await. Concurrency is achieved with OS threads via the `core:thread` package or with coroutines via the experimental `core:sync/chan` package. For async I/O patterns, Odin typically interfaces with OS APIs directly or uses libraries built on top of `epoll`/`kqueue`/`IOCP`.

## Example

```odin
package main

import "core:fmt"
import "core:thread"
import "core:sync"

// Closest equivalent: thread + mutex
counter: int
mu: sync.Mutex

increment_worker :: proc(t: ^thread.Thread) {
    for i in 0..<1000 {
        sync.mutex_lock(&mu)
        counter += 1
        sync.mutex_unlock(&mu)
    }
}

main :: proc() {
    sync.mutex_init(&mu)
    defer sync.mutex_destroy(&mu)

    threads: [4]^thread.Thread
    for i in 0..<4 {
        threads[i] = thread.create(increment_worker)
        thread.start(threads[i])
    }

    for t in threads {
        thread.join(t)
        thread.destroy(t)
    }

    fmt.println("counter:", counter)  // 4000
}
```

## Gotchas

- Odin has no built-in async runtime or event loop.
- OS threads in Odin have significant overhead compared to goroutines or BEAM processes — create them sparingly.
- The `core:thread` package is available cross-platform but is relatively low-level.
- For high-performance async I/O, Odin developers typically use custom or third-party event loops.
