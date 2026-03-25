---
title: "Parameters & Arguments"
language: "scala"
feature: "parameters"
category: "functions"
applicable: true
---

Scala supports default parameter values, named arguments, varargs, and multiple parameter lists (for currying and context parameters). By-name parameters (`=> T`) are evaluated lazily on each use, enabling custom control structures.

## Example

```scala
// Default parameters
def connect(host: String, port: Int = 8080): String =
  s"$host:$port"
connect("localhost")          // => "localhost:8080"
connect("localhost", 9090)

// Named arguments (order-independent)
def createUser(name: String, role: String = "guest", active: Boolean = true) = ???
createUser(name = "Alice", active = false)

// Varargs
def sum(nums: Int*): Int = nums.sum
sum(1, 2, 3, 4)    // => 10
sum(List(1,2,3)*)  // spread a sequence

// Multiple parameter lists (currying)
def multiply(a: Int)(b: Int) = a * b
val double = multiply(2) _   // partially apply
double(5)   // => 10

// By-name parameter (evaluated on each use)
def repeat(times: Int)(action: => Unit): Unit =
  for _ <- 1 to times do action
repeat(3) { println("hello") }
```

## Gotchas

- Varargs must be the last parameter; use `seq*` (Scala 3) or `seq: _*` (Scala 2) to pass a sequence
- Default parameters are evaluated on each call site, not once — no mutable default trap like Python
- Multiple parameter lists affect type inference; the compiler resolves earlier lists before later ones
