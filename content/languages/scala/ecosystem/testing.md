---
title: "Testing"
language: "scala"
feature: "testing"
category: "ecosystem"
applicable: true
---

The most popular Scala test frameworks are **ScalaTest** (versatile, many styles) and **MUnit** (lightweight, modern). **ScalaCheck** provides property-based testing. Tests are run with `sbt test`. Mocking uses **ScalaMock** or Mockito via Java interop.

## Example

```scala
// ScalaTest — FunSpec style
import org.scalatest.funspec.AnyFunSpec
import org.scalatest.matchers.should.Matchers

class CalculatorSpec extends AnyFunSpec with Matchers:
  describe("Calculator") {
    it("adds two numbers") {
      Calculator.add(2, 3) shouldBe 5
    }
    it("throws on division by zero") {
      an [ArithmeticException] should be thrownBy Calculator.divide(1, 0)
    }
  }

// MUnit (modern, minimal)
class MathSuite extends munit.FunSuite:
  test("addition") {
    assertEquals(1 + 1, 2)
  }
  test("async") {
    val future = Future.successful(42)
    assertIO(IO.fromFuture(IO(future)), 42)
  }

// ScalaCheck — property-based
import org.scalacheck.Prop.forAll
forAll { (a: Int, b: Int) => Calculator.add(a, b) == a + b }
```

## Gotchas

- sbt runs tests in parallel by default; use `Test / parallelExecution := false` if tests share state
- ScalaTest has many DSL styles (`FunSpec`, `WordSpec`, `FlatSpec`, etc.) — pick one and stick to it
- Use `eventually` from ScalaTest Async for testing eventually-consistent async behavior
