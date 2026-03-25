---
title: "Threads"
language: "go"
feature: "threads"
category: "concurrency"
applicable: true
---

Go's unit of concurrency is the goroutine — a lightweight green thread managed by the Go runtime with an initial stack of only a few kilobytes. Goroutines are multiplexed onto OS threads automatically. You launch a goroutine with the `go` keyword. Synchronization is handled with channels, `sync.WaitGroup`, `sync.Mutex`, and related primitives.

## Example

```go
package main

import (
    "fmt"
    "sync"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("Worker %d starting\n", id)
    // Do work...
    fmt.Printf("Worker %d done\n", id)
}

func main() {
    var wg sync.WaitGroup
    for i := 1; i <= 5; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }
    wg.Wait()
    fmt.Println("All workers finished")
}
```

## Gotchas

- The Go runtime may run goroutines on multiple OS threads simultaneously (controlled by `GOMAXPROCS`); data shared between goroutines requires proper synchronization.
- A goroutine leak (goroutine blocked forever with no way to exit) is a common bug; always ensure goroutines have a defined termination path, often via `context.Context` cancellation.
- `sync.WaitGroup` must not be copied after first use; always pass it by pointer.
