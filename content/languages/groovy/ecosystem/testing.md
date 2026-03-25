---
title: "Testing"
language: "groovy"
feature: "testing"
category: "ecosystem"
applicable: true
---

The de facto testing framework for Groovy is **Spock**, which uses a specification-based style with `given`/`when`/`then` blocks that read like natural language. Spock is built on JUnit 5 and supports data-driven tests with `where` tables, powerful mocking with `Mock()`, and interaction verification. JUnit 5 can also be used directly from Groovy code.

## Example

```groovy
// UserServiceSpec.groovy
import spock.lang.Specification
import spock.lang.Unroll

class CalculatorSpec extends Specification {

    def "should add two numbers"() {
        given:
        def a = 3
        def b = 4

        when:
        def result = a + b

        then:
        result == 7
    }

    @Unroll
    def "dividing #a by #b gives #expected"() {
        expect:
        (a / b) == expected

        where:
        a  | b | expected
        10 | 2 | 5
        9  | 3 | 3
        8  | 4 | 2
    }

    def "should throw on division by zero"() {
        when:
        1 / 0

        then:
        thrown(ArithmeticException)
    }
}
```

```bash
# Run tests with Gradle
./gradlew test
```

## Gotchas

- Spock test method names are strings (inside `def "..."()`), not identifiers, so they can contain spaces and be arbitrarily descriptive — use this to document intent clearly.
- `@Unroll` renders each data row as a separate test case in the report; without it, all rows appear as one test, making it harder to identify which row failed.
- Spock's `Mock()` objects auto-verify interactions at the end of the `then` block; forgetting to specify expected interactions causes silent passes rather than failures.
