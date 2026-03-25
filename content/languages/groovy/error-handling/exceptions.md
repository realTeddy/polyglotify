---
title: "Exceptions & Try/Catch"
language: "groovy"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Groovy's exception handling is identical to Java's `try/catch/finally` structure with one key difference: Groovy treats all exceptions as unchecked. You are never forced to declare or catch checked exceptions, though you may still do so. Multiple exception types can be caught in a single `catch` block using the pipe `|` syntax (Groovy 2+).

## Example

```groovy
// Basic try/catch/finally
def safeDivide(int a, int b) {
    try {
        a / b
    } catch (ArithmeticException e) {
        println "Cannot divide by zero: ${e.message}"
        null
    } finally {
        println "divide attempted"
    }
}
println safeDivide(10, 2)   // 5
safeDivide(10, 0)

// Multi-catch
def parseOrDefault(String s) {
    try {
        Integer.parseInt(s)
    } catch (NumberFormatException | NullPointerException e) {
        println "Parse failed: ${e.class.simpleName}"
        -1
    }
}
println parseOrDefault("abc")   // Parse failed: NumberFormatException, -1

// Custom exception
class ValidationException extends RuntimeException {
    String field
    ValidationException(String field, String msg) {
        super(msg)
        this.field = field
    }
}

def validate(String email) {
    if (!email?.contains("@"))
        throw new ValidationException("email", "Invalid email: $email")
    email
}

try {
    validate("notanemail")
} catch (ValidationException e) {
    println "Validation error on '${e.field}': ${e.message}"
}
```

## Gotchas

- Groovy silently swallows checked exceptions from Java APIs — you will not get a compile error for uncaught `IOException`, which can lead to silent failures.
- The implicit return from a `try` block is the last evaluated expression; if an exception is caught and the `catch` block returns a value, that value is the result of the try expression.
- Always include `finally` for resource cleanup; Groovy does not have the try-with-resources `try (Resource r = ...)` syntax natively — use `withCloseable` instead.
