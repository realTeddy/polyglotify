---
title: "Common Patterns"
language: "groovy"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Groovy's most recognisable idioms include the builder pattern via delegate closures (used in Gradle, Ratpack, and Geb), the collection pipeline using `collect`/`findAll`/`inject`, safe navigation with `?.` and `?:`, and `withXxx` resource-management methods. These patterns make Groovy code concise and expressive while remaining readable to Java developers.

## Example

```groovy
// Collection pipeline
def people = [
    [name: "Alice", age: 30],
    [name: "Bob",   age: 17],
    [name: "Carol", age: 25],
]
def adults = people
    .findAll { it.age >= 18 }
    .collect { it.name }
    .sort()
println adults   // [Alice, Carol]

// Builder pattern via delegate
def html(Closure body) {
    def builder = new StringBuilder()
    def delegate = [
        h1: { String t -> builder << "<h1>$t</h1>\n" },
        p:  { String t -> builder << "<p>$t</p>\n" },
    ]
    body.delegate = delegate
    body.resolveStrategy = Closure.DELEGATE_FIRST
    body()
    builder.toString()
}
println html {
    h1 "Welcome"
    p  "Hello, Groovy!"
}

// withCloseable for resource management
new File("/tmp/test.txt").withWriter { w -> w << "hello" }
new File("/tmp/test.txt").withReader { r -> println r.text }

// Memoization
def fib
fib = { long n -> n <= 1 ? n : fib(n - 1) + fib(n - 2) }.memoize()
println fib(40)   // fast due to memoization
```

## Gotchas

- Delegate-based DSLs rely on dynamic dispatch; they are not type-safe without additional `@TypeChecked` configuration and can produce confusing `MissingMethodException` errors.
- `memoize()` caches results based on argument identity; for reference-type arguments, two different objects with the same value may not share a cache entry unless `equals` and `hashCode` are implemented.
- `withWriter`/`withReader` automatically close the stream even on exception, making them the preferred alternative to try-finally blocks for I/O.
