---
title: "Testing"
language: "java"
feature: "testing"
category: "ecosystem"
applicable: true
---

**JUnit 5** (Jupiter) is the standard Java testing framework, paired with **AssertJ** for fluent assertions and **Mockito** for mocking. Tests live in `src/test/java` and mirror the production package structure. Maven Surefire and Gradle's `test` task discover and run JUnit tests automatically. Integration and end-to-end tests often use **Testcontainers** to spin up real Docker services.

## Example

```java
// src/test/java/com/example/CalculatorTest.java
package com.example;

import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.assertj.core.api.Assertions.*;

class CalculatorTest {

    private Calculator calc;

    @BeforeEach
    void setUp() {
        calc = new Calculator();
    }

    @Test
    void addsPositiveNumbers() {
        assertThat(calc.add(2, 3)).isEqualTo(5);
    }

    @Test
    void throwsOnDivisionByZero() {
        assertThatThrownBy(() -> calc.divide(10, 0))
            .isInstanceOf(ArithmeticException.class)
            .hasMessageContaining("zero");
    }

    @ParameterizedTest
    @CsvSource({ "6, 2, 3", "10, 5, 2", "9, 3, 3" })
    void divides(int a, int b, int expected) {
        assertThat(calc.divide(a, b)).isEqualTo(expected);
    }

    @Nested
    class WhenNegative {
        @Test
        void addsNegativeNumbers() {
            assertThat(calc.add(-1, -2)).isEqualTo(-3);
        }
    }
}
```

## Gotchas

- JUnit 5 uses `@Test` from `org.junit.jupiter.api`, not `org.junit.Test` (JUnit 4). Mixing JUnit 4 and JUnit 5 annotations causes tests to silently not run.
- Test methods do not need to be `public` in JUnit 5 — package-private (no modifier) is idiomatic and keeps test classes cleaner.
