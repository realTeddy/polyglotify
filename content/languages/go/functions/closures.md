---
title: "Closures & Lambdas"
language: "go"
feature: "closures"
category: "functions"
applicable: true
---

Go supports first-class functions and closures via anonymous function literals. A closure captures variables from its surrounding scope by reference, meaning it sees and can mutate the original variable. Function literals are used extensively for goroutines, callbacks, and higher-order functions.

## Example

```go
package main

import "fmt"

func makeCounter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

func main() {
    counter := makeCounter()
    fmt.Println(counter()) // 1
    fmt.Println(counter()) // 2
    fmt.Println(counter()) // 3

    // Immediately invoked
    result := func(x, y int) int { return x * y }(4, 5)
    fmt.Println(result) // 20
}
```

## Gotchas

- Closures in loop iterations capture the loop variable by reference, not by value; goroutines launched in a loop that close over the index variable all see the final value unless you pass it as an argument or create a copy inside the loop.
- Closures that capture large data structures can prevent garbage collection of those structures even after the outer function returns.
