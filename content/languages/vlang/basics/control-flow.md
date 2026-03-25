---
title: "Control Flow"
language: "vlang"
feature: "control-flow"
category: "basics"
applicable: true
---

V provides `if`/`else`, `match` (exhaustive pattern match), `for` (the only loop keyword — covers while, do-while, and range loops), `break`, `continue`, and `goto`. `if` and `match` are expressions. There are no parentheses around conditions. `match` requires all variants of a sum type to be covered or an `else` branch.

## Example

```v
fn main() {
    // if / else (expression)
    x := 10
    label := if x > 0 { 'positive' } else { 'non-positive' }
    println(label)

    // match (expression, exhaustive)
    grade := 85
    result := match grade {
        90...100 { 'A' }
        80...89  { 'B' }
        70...79  { 'C' }
        else     { 'F' }
    }
    println(result)

    // for — as a while loop
    mut i := 0
    for i < 5 {
        i++
    }

    // for — range
    for j in 0..5 {
        print('$j ')
    }

    // for — infinite loop with break
    mut n := 0
    for {
        n++
        if n == 3 { break }
    }

    // for — C-style (with init; condition; post)
    for k := 0; k < 3; k++ {
        print('$k ')
    }
}
```

## Gotchas

- V has only one loop keyword (`for`); it covers `while`, `foreach`, and infinite loops.
- `match` arms use `{}` for multi-line bodies; single-expression arms can omit braces.
- Unlike Go, V's `match` does not fall through; each arm is independent.
