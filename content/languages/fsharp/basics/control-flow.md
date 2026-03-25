---
title: "Control Flow"
language: "fsharp"
feature: "control-flow"
category: "basics"
applicable: true
---

F# uses `if/then/else` (expression), `match` (pattern matching), `for` and `while` loops. `match` is the most powerful and idiomatic construct. All control structures are expressions; `if` without `else` returns `unit` (equivalent to `void`).

## Example

```fsharp
// if/then/else (expression)
let abs n = if n < 0 then -n else n

// Multi-line if
let grade score =
    if score >= 90 then "A"
    elif score >= 80 then "B"
    elif score >= 70 then "C"
    else "F"

// match: pattern matching
let describe n =
    match n with
    | 0           -> "zero"
    | n when n > 0 -> "positive"
    | _           -> "negative"

// Match on discriminated union
type Shape = Circle of float | Rectangle of float * float

let area s =
    match s with
    | Circle r         -> System.Math.PI * r * r
    | Rectangle(w, h)  -> w * h

// Match with guards
let classify (x: int) =
    match x with
    | x when x % 2 = 0 && x > 0 -> "positive even"
    | x when x % 2 <> 0          -> "odd"
    | _                           -> "other"

// for loop (imperative)
for i in 1..5 do
    printfn "%d" i

// for with step
for i in 0..2..10 do    // 0, 2, 4, 6, 8, 10
    printf "%d " i

// while loop
let mutable i = 0
while i < 5 do
    printfn "%d" i
    i <- i + 1

// Sequence expression (functional iteration)
let evens = [ for x in 1..20 do if x % 2 = 0 then yield x ]
```

## Gotchas

- `if` without `else` returns `unit`; using such an expression where a value is expected is a type error
- `match` must be exhaustive; the compiler warns on incomplete patterns — always add a wildcard `_` case
- F# uses `elif` (not `else if`) for multi-branch if/else
