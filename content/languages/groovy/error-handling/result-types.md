---
title: "Result Types"
language: "groovy"
feature: "result-types"
category: "error-handling"
applicable: false
---

Groovy does not have a built-in `Result` or `Either` type. The idiomatic Groovy approach is to use exceptions for error signalling, return `null` for absence, or return a map with a `success` flag for operation results. Libraries like Vavr (imported from Java) or custom wrapper classes can provide a `Result`-style API, but this is not a standard Groovy pattern.

## Example

```groovy
// Idiomatic Groovy: return map with status
def tryParse(String s) {
    try {
        [ok: true, value: Integer.parseInt(s)]
    } catch (NumberFormatException e) {
        [ok: false, error: e.message]
    }
}

def r1 = tryParse("42")
def r2 = tryParse("bad")

if (r1.ok) println "Parsed: ${r1.value}"
if (!r2.ok) println "Error: ${r2.error}"

// Optional-style using null + safe navigation
def findUser(int id) {
    id == 1 ? [name: "Alice", id: 1] : null
}
def user = findUser(99)
println user?.name ?: "User not found"

// Using Vavr from Java (if on classpath)
// import io.vavr.control.Try
// def result = Try.of { Integer.parseInt("abc") }
// result.onFailure { e -> println "Failed: $e.message" }
```

## Gotchas

- Returning `null` as a sentinel value is error-prone; callers must remember to null-check using `?.` or `?:` or risk a `NullPointerException`.
- Map-based result objects are not type-safe and rely on convention (e.g., keys named `ok`, `value`, `error`); refactoring is risky without tests.
- If your project already uses Java libraries, importing Vavr's `Try`/`Either` types provides a proper result type with a richer API than ad-hoc maps.
