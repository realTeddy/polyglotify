---
title: "Operators"
language: "groovy"
feature: "operators"
category: "basics"
applicable: true
---

Groovy includes all standard Java operators and adds several powerful ones: the safe-navigation operator `?.` avoids NullPointerExceptions, the Elvis operator `?:` provides a compact null/falsy fallback, the spread operator `*.` applies a method to every item in a collection, and the spaceship operator `<=>` performs three-way comparison. Operator overloading is supported by implementing methods like `plus`, `minus`, and `equals`.

## Example

```groovy
// Safe navigation — returns null instead of NPE
String name = null
println name?.toUpperCase()   // null

// Elvis operator — fallback for null/falsy
def display = name ?: "Anonymous"
println display               // Anonymous

// Spaceship (three-way comparison)
println (1 <=> 2)   // -1
println (2 <=> 2)   //  0
println (3 <=> 2)   //  1

// Spread operator
def words = ["hello", "world"]
println words*.toUpperCase()   // [HELLO, WORLD]

// Power operator
println 2 ** 10   // 1024

// Pattern matching with =~
def m = "Groovy 4.0" =~ /(\d+\.\d+)/
if (m) println m[0][1]   // 4.0
```

## Gotchas

- `==` in Groovy calls `equals()` (null-safe), not reference equality. Use `is()` for reference equality.
- The spread operator `*.` does not short-circuit on null elements; the collection itself must not be null.
- The `=~` operator returns a `Matcher` which is truthy if any match exists; `==~` tests for a full-string match.
