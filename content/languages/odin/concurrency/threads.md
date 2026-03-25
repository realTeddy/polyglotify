---
title: "Threads"
language: "odin"
feature: "threads"
category: "concurrency"
applicable: true
---

Odin provides OS threads via `core:thread`. Threads share memory and synchronization is done with mutexes, semaphores, and atomics from `core:sync`. Thread-local storage is available with `#thread_local`. The language has no data-race prevention at compile time — safety is the programmer's responsibility.

## Example

```odin
package main

import "core:fmt"
import "core:thread"
import "core:sync"
import "core:time"

Worker_Data :: struct {
    id:     int,
    result: int,
    done:   bool,
}

worker_proc :: proc(t: ^thread.Thread) {
    data := (^Worker_Data)(t.user_args[0])

    // Simulate work
    time.sleep(time.Millisecond * 10)
    data.result = data.id * data.id
    data.done = true
}

main :: proc() {
    N :: 4
    workers: [N]Worker_Data
    threads: [N]^thread.Thread

    // Spawn threads
    for i in 0..<N {
        workers[i] = Worker_Data{id = i + 1}
        threads[i] = thread.create(worker_proc)
        threads[i].user_args[0] = &workers[i]
        thread.start(threads[i])
    }

    // Join all threads
    for i in 0..<N {
        thread.join(threads[i])
        thread.destroy(threads[i])
        fmt.printf("Worker %d result: %d\n", workers[i].id, workers[i].result)
    }
}
```

## Gotchas

- Always `thread.join` before `thread.destroy` — destroying a running thread is undefined behavior.
- Shared mutable data requires explicit synchronization (`sync.Mutex`, `sync.Atomic_Int`, etc.).
- `#thread_local` marks a variable as having one copy per thread.
- There is no scheduler like Go's goroutines — each `thread.create` maps to an OS thread.
- Stack size is configurable via `thread.create_with_poly_data` and related variants.
