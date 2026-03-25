---
title: "Exceptions & Try/Catch"
language: "scala"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Scala supports Java-style `try/catch/finally` but treats it as an expression returning a value. Exception handling in idiomatic Scala is often replaced by `Try[T]`, `Either[E, A]`, or `Option[A]` for functional error handling without exceptions.

## Example

```scala
// try/catch/finally as expression
val result: Int = try
  Integer.parseInt("abc")
catch
  case e: NumberFormatException => -1
  case e: Exception             => throw e  // rethrow
finally
  println("cleanup")

// Custom exception
class InsufficientFundsException(amount: Double)
    extends RuntimeException(s"Cannot withdraw $$amount"):
  val requestedAmount = amount

def withdraw(amount: Double, balance: Double): Double =
  if amount > balance then throw InsufficientFundsException(amount)
  else balance - amount

// Pattern matching in catch
def safeDivide(a: Int, b: Int): String =
  try s"Result: ${a / b}"
  catch
    case _: ArithmeticException => "Division by zero"
    case e: Exception           => s"Error: ${e.getMessage}"
```

## Gotchas

- Unlike Java, Scala has no checked exceptions — all exceptions are unchecked
- `try/catch` is an expression; both branches must produce compatible types
- Catching `Throwable` or `Exception` broadly is an anti-pattern; prefer functional `Try` or `Either`
