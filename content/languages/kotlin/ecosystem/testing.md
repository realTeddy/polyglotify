---
title: "Testing"
language: "kotlin"
feature: "testing"
category: "ecosystem"
applicable: true
---

Kotlin's primary testing framework is `kotlin.test` (multiplatform), which works with JUnit 5 on the JVM. `Kotest` is a popular Kotlin-first framework with expressive assertions and property-based testing. `MockK` is the standard mocking library for Kotlin-idiomatic mocks. Coroutine-based tests use `runTest` from `kotlinx-coroutines-test`.

## Example

```kotlin
import kotlin.test.*
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.delay

class CalculatorTest {
    @Test
    fun `addition works`() {
        assertEquals(5, 2 + 3)
    }

    @Test
    fun `division by zero throws`() {
        assertFailsWith<ArithmeticException> {
            val x = 1 / 0
        }
    }
}

suspend fun fetchValue(): Int {
    delay(100)
    return 42
}

class CoroutineTest {
    @Test
    fun `coroutine test`() = runTest {
        val value = fetchValue()
        assertEquals(42, value)
    }
}
```

## Gotchas

- `runTest` from `kotlinx-coroutines-test` auto-advances virtual time, so `delay()` calls complete instantly in tests without actual waiting.
- Backtick function names allow natural language test names: `` fun `should return empty list when input is blank`() `` — use this for readability.
- `MockK`'s `every { }` / `coEvery { }` (for suspend functions) syntax is Kotlin-idiomatic; avoid Java-based Mockito in Kotlin code as it requires workarounds for `final` classes.
