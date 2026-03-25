---
title: "Function Declaration"
language: "scala"
feature: "declaration"
category: "functions"
applicable: true
---

Scala functions are defined with `def`. They can be top-level (Scala 3), inside objects/classes, or nested. Function bodies are expressions; the last expression is the return value. The return type is often inferred but can be explicit.

## Example

```scala
// Basic function (return type inferred)
def add(a: Int, b: Int) = a + b

// Explicit return type (recommended for public APIs)
def greet(name: String): String = s"Hello, $name!"

// Multi-line function body
def factorial(n: Int): Int =
  if n <= 0 then 1
  else n * factorial(n - 1)

// Nested function
def outerFn(x: Int): Int =
  def innerFn(y: Int) = y * 2   // private to outerFn
  innerFn(x) + 1

// Top-level function (Scala 3, no object wrapper needed)
@main def run(): Unit =
  println(greet("World"))

// Procedure-style (returns Unit)
def logMessage(msg: String): Unit =
  println(s"[LOG] $msg")
```

## Gotchas

- Omitting the `=` in `def f(): Unit { ... }` (Scala 2 style) creates a procedure — avoid this syntax
- Recursive functions must have an explicit return type to allow the compiler to type-check the recursion
- `@tailrec` annotation verifies that a recursive function is properly tail-recursive
