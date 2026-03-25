---
title: "Closures & Lambdas"
language: "scala"
feature: "closures"
category: "functions"
applicable: true
---

Scala functions are first-class values. Anonymous functions (lambdas) are written with `=>` syntax. They close over surrounding variables. The `Function1[A, B]` trait and its shorthand `A => B` describe function types. Partial application and currying are built-in.

## Example

```scala
// Anonymous function
val double = (n: Int) => n * 2
double(5)   // => 10

// Shorter with type inference
val nums = List(1, 2, 3)
nums.map(n => n * 2)
nums.map(_ * 2)        // underscore shorthand

// Closure — captures outer variable
val multiplier = 3
val triple = (n: Int) => n * multiplier   // captures multiplier
triple(4)  // => 12

// Higher-order functions
def applyTwice(f: Int => Int, x: Int): Int = f(f(x))
applyTwice(_ + 3, 10)  // => 16

// Partial application
def add(a: Int)(b: Int) = a + b
val addFive = add(5)   // partial application of first arg
addFive(3)             // => 8

// Function composition
val addOne  = (n: Int) => n + 1
val double2 = (n: Int) => n * 2
val addThenDouble = addOne andThen double2
addThenDouble(4)  // => 10
```

## Gotchas

- `_` shorthand creates a new parameter for each occurrence: `_ + _` is `(a, b) => a + b`
- Closures capture variables by reference; mutations to a `var` are visible inside the closure
- Converting a method to a function requires eta expansion: `methodName _` (Scala 2) or `methodName` (Scala 3 with auto eta-expansion)
