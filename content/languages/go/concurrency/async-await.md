---
title: "Async/Await"
language: "go"
feature: "async-await"
category: "concurrency"
applicable: false
---

Go has no `async`/`await` keywords. Instead, concurrency is expressed through goroutines (lightweight threads launched with the `go` keyword) and channels for communication. The `sync` package and `context` package fill the roles that async/await libraries handle in other languages.

## Example

```go
package main

import (
    "fmt"
    "sync"
)

func fetchData(id int, wg *sync.WaitGroup, results chan<- string) {
    defer wg.Done()
    // Simulate work
    results <- fmt.Sprintf("result from worker %d", id)
}

func main() {
    var wg sync.WaitGroup
    results := make(chan string, 3)

    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go fetchData(i, &wg, results)
    }

    go func() {
        wg.Wait()
        close(results)
    }()

    for r := range results {
        fmt.Println(r)
    }
}
```

## Gotchas

- Goroutines are not async functions; they run concurrently on real OS threads managed by the Go scheduler (M:N threading), so blocking a goroutine does not block other goroutines.
- The `errgroup` package (`golang.org/x/sync/errgroup`) provides a convenient async/await-like pattern for collecting errors from concurrent work.
