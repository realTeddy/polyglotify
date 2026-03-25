---
title: "Return Values"
language: "groovy"
feature: "return-values"
category: "functions"
applicable: true
---

Groovy methods return the value of the last evaluated expression without requiring an explicit `return` statement. The return type can be declared explicitly or left as `def` (dynamic). Multiple values can be returned as a list or map, and callers can destructure them with multi-assignment syntax.

## Example

```groovy
// Implicit return (last expression)
def square(int n) {
    n * n
}
println square(7)   // 49

// Explicit return with declared type
int clamp(int val, int lo, int hi) {
    if (val < lo) return lo
    if (val > hi) return hi
    val
}
println clamp(150, 0, 100)   // 100

// Returning multiple values as a list
def minMax(List<Integer> nums) {
    [nums.min(), nums.max()]
}
def (lo, hi) = minMax([3, 1, 4, 1, 5, 9])
println "$lo .. $hi"   // 1 .. 9

// Returning a map
def stats(List<Integer> data) {
    [count: data.size(), sum: data.sum(), avg: data.sum() / data.size()]
}
println stats([10, 20, 30])
```

## Gotchas

- A method declared `void` still returns `null` in Groovy; calling it in an expression context that expects a value silently produces `null`.
- The implicit return only applies to the last *expression*; control-flow constructs like `if` without an else, or `for` loops, return `null` if executed last.
- Destructuring with `def (a, b) = ...` requires the right-hand side to be a `List`; returning a map does not automatically destructure into named variables.
