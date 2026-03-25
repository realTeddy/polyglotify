---
title: "Style Conventions"
language: "groovy"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Groovy follows the official Groovy Style Guide, which mirrors Java conventions for naming (camelCase methods/variables, PascalCase classes) but encourages idiomatic Groovy constructs: omitting unnecessary parentheses on single-argument method calls, using GStrings instead of concatenation, preferring closures over anonymous classes, and using `def` for local variables when the type is obvious. The CodeNarc static analysis tool enforces these conventions.

## Example

```groovy
// Preferred: GString over concatenation
def name = "World"
println "Hello, $name!"          // good
println "Hello, " + name + "!"   // avoid

// Preferred: omit parens for single-argument methods
println "no parens needed"
[1, 2, 3].each { println it }

// Preferred: Elvis over ternary for null-checks
def display = name ?: "Anonymous"   // good
def display2 = name != null ? name : "Anonymous"   // verbose

// Preferred: collect/findAll over explicit loops
def nums = (1..10).findAll { it % 2 == 0 }.collect { it * it }

// Naming conventions
class MyService {                        // PascalCase class
    private static final int MAX_RETRIES = 3   // UPPER_SNAKE_CASE constant
    String baseUrl                             // camelCase property

    void fetchData(String endpoint) { }        // camelCase method
}

// Avoid semicolons (optional in Groovy)
def a = 1
def b = 2
def c = a + b
```

## Gotchas

- Omitting parentheses can cause ambiguity when chaining method calls; always add parentheses when the call receives the result of another call.
- GStrings evaluate expressions eagerly at the point of creation; `"${expensiveCall()}"` invokes the method immediately, not lazily.
- CodeNarc has hundreds of rules and can be overwhelming if enabled all at once; start with a focused ruleset (e.g., `basic`, `groovyism`) and add more incrementally.
