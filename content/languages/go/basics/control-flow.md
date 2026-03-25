---
title: "Control Flow"
language: "go"
feature: "control-flow"
category: "basics"
applicable: true
---

Go has `if`, `for`, and `switch` as its primary control-flow constructs — there is no `while` keyword; `for` covers all looping patterns. `if` and `switch` support an optional initialization statement before the condition. `switch` cases do not fall through by default, and a `switch` without an expression acts like `if/else if` chains.

## Example

```go
package main

import "fmt"

func classify(n int) string {
    switch {
    case n < 0:
        return "negative"
    case n == 0:
        return "zero"
    default:
        return "positive"
    }
}

func main() {
    for i := 0; i < 3; i++ {
        fmt.Println(i, classify(i-1))
    }

    // Range-based loop
    for idx, val := range []string{"a", "b", "c"} {
        fmt.Println(idx, val)
    }
}
```

## Gotchas

- `switch` cases do not fall through automatically; use `fallthrough` explicitly when needed, and it transfers control unconditionally to the next case without re-evaluating.
- `break` in a `switch` inside a `for` loop breaks out of the `switch`, not the loop — use labeled breaks to exit the outer loop.
- The `for range` loop over a `string` iterates over Unicode code points (`rune`), not bytes.
