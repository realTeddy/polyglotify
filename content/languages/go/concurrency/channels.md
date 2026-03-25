---
title: "Channels & Message Passing"
language: "go"
feature: "channels"
category: "concurrency"
applicable: true
---

Channels are Go's primary mechanism for communication between goroutines, embodying the principle "do not communicate by sharing memory; share memory by communicating." Channels can be buffered (non-blocking up to capacity) or unbuffered (sender blocks until receiver is ready). The `select` statement waits on multiple channel operations simultaneously.

## Example

```go
package main

import "fmt"

func generate(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}

func main() {
    for v := range square(generate(2, 3, 4, 5)) {
        fmt.Println(v)
    }
}
```

## Gotchas

- Sending on a closed channel panics; only the sender should close a channel, and only when no further sends will occur.
- Receiving from a closed channel returns the zero value immediately and forever; use the two-value form `v, ok := <-ch` to detect closure.
- Deadlock occurs when all goroutines are blocked on channel operations — the runtime detects and panics on this condition in programs with no other goroutines running.
