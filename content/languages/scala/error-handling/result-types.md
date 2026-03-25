---
title: "Result Types"
language: "scala"
feature: "result-types"
category: "error-handling"
applicable: true
---

Scala has three built-in functional error handling types: `Option[A]` (presence/absence), `Try[A]` (success/exception), and `Either[E, A]` (left=error, right=success). These enable composable, exception-free error handling via `map`, `flatMap`, and `for` comprehensions.

## Example

```scala
import scala.util.{Try, Success, Failure}

// Try — wraps code that might throw
val parsed: Try[Int] = Try(Integer.parseInt("42"))
parsed.getOrElse(-1)         // => 42

val failed = Try(Integer.parseInt("abc"))
failed.recover { case _: NumberFormatException => 0 }

// Chaining with map/flatMap
val result = Try("42").map(_.toInt).map(_ * 2)
// => Success(84)

// Either — explicit error type
def divide(a: Int, b: Int): Either[String, Int] =
  if b == 0 then Left("Division by zero")
  else Right(a / b)

divide(10, 2).map(_ * 3)        // => Right(15)
divide(10, 0).left.map(_.length)  // => Left(16)

// For comprehension with Either
val computed = for
  x <- divide(10, 2)
  y <- divide(x, 1)
yield x + y
// => Right(10)

// Option
def findUser(id: Int): Option[String] = if id == 1 then Some("Alice") else None
findUser(1).map(_.toUpperCase)   // => Some("ALICE")
findUser(2).getOrElse("guest")   // => "guest"
```

## Gotchas

- `Try` only catches `NonFatal` exceptions — `OutOfMemoryError` and similar are re-thrown
- `Either` is right-biased in Scala 2.12+: `map` and `flatMap` operate on the `Right` value
- Mixing `Try`, `Either`, and `Option` in a `for` comprehension requires all to be the same type
