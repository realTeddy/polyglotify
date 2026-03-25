---
title: "Closures & Lambdas"
language: "nim"
feature: "closures"
category: "functions"
applicable: true
---

Nim supports anonymous procedures (lambdas) using the `proc` keyword without a name, or the shorthand `(x) => expr` syntax (with the `sugar` module). Anonymous procs close over variables in the enclosing scope. They are first-class values stored as `proc` types. Higher-order functions like `map`, `filter`, and `foldl` accept them.

## Example

```nim
import std/[sequtils, sugar]

# Anonymous proc
let square = proc(x: int): int = x * x
echo square(5)   # 25

# Arrow syntax (requires import sugar)
let double = (x: int) => x * 2
echo double(7)   # 14

# Closure — captures outer variable
proc makeAdder(n: int): proc(int): int =
  result = proc(x: int): int = x + n

let add10 = makeAdder(10)
echo add10(5)    # 15

# Higher-order functions
let nums = @[1, 2, 3, 4, 5]
let squared  = nums.map(x => x * x)
let evens    = nums.filter(x => x mod 2 == 0)
let total    = nums.foldl(a + b)

echo squared    # @[1, 4, 9, 16, 25]
echo evens      # @[2, 4]
echo total      # 15

# Multi-line lambda
let process = proc(x: int): int =
  let doubled = x * 2
  doubled + 1

echo nums.map(process)
```

## Gotchas

- Closures in Nim capture variables by reference to heap-allocated cells when variables outlive the scope.
- The `sugar` module's `=>` syntax is a macro; it requires `import std/sugar`.
- Closure types must match exactly: `proc(int): int` and `proc(int): string` are distinct types.
