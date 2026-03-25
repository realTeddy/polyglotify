---
title: "Closures & Lambdas"
language: "gleam"
feature: "closures"
category: "functions"
applicable: true
---

Gleam supports first-class anonymous functions with `fn(...) { ... }` syntax. These closures capture variables from their enclosing scope by value (since all values are immutable). The `fn` type is written as `fn(ArgType) -> ReturnType`. Closures are heavily used with standard library functions like `list.map`, `list.filter`, and `list.fold`.

## Example

```gleam
import gleam/io
import gleam/list

pub fn make_adder(n: Int) -> fn(Int) -> Int {
  fn(x) { x + n }
}

pub fn main() {
  let add5 = make_adder(5)
  io.debug(add5(3))   // 8
  io.debug(add5(10))  // 15

  // Inline lambdas with higher-order functions
  let numbers = [1, 2, 3, 4, 5]

  let doubled = list.map(numbers, fn(x) { x * 2 })
  let evens   = list.filter(numbers, fn(x) { x % 2 == 0 })
  let total   = list.fold(numbers, 0, fn(acc, x) { acc + x })

  io.debug(doubled)
  io.debug(evens)
  io.debug(total)

  // Function capture shorthand: fn(x) { f(x) } = f
  let double = fn(x: Int) { x * 2 }
  let mapped = list.map([1, 2, 3], double)
  io.debug(mapped)
}
```

## Gotchas

- All captured values are immutable — closures capture a snapshot of the binding at creation time.
- Gleam has a function capture syntax shorthand using `_` as a placeholder: `list.map(nums, fn(x) { add(5, x) })` can be written as `list.map(nums, add(5, _))`.
- Closures cannot mutate captured variables; if you need accumulating state, use `list.fold` or recursion explicitly.
