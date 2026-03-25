---
title: "Tuples"
language: "groovy"
feature: "tuples"
category: "data-structures"
applicable: true
---

Groovy provides a `groovy.lang.Tuple` class (and typed variants `Tuple1` through `Tuple16` since Groovy 2.5) for fixed-size, ordered, immutable sequences of heterogeneous elements. In practice, many Groovy developers use list literals and multi-assignment destructuring as a lightweight alternative. Groovy also inherits Java's `Map.Entry` for two-element key-value pairs.

## Example

```groovy
import groovy.lang.Tuple2
import groovy.lang.Tuple

// Typed Tuple2
def point = new Tuple2<Integer, Integer>(3, 4)
println point.first   // 3
println point.second  // 4

// Untyped Tuple
def triple = new Tuple("Alice", 30, true)
println triple[0]   // Alice
println triple.size()   // 3

// List as a lightweight tuple with destructuring
def (x, y, z) = [10, 20, 30]
println "$x, $y, $z"   // 10, 20, 30

// Returning a tuple from a function
def divmod(int a, int b) {
    new Tuple2<>(a.intdiv(b), a % b)
}
def (q, r) = divmod(17, 5)
println "quotient=$q remainder=$r"
```

## Gotchas

- `Tuple` objects are immutable — elements cannot be replaced after construction; use a `List` if mutability is required.
- The typed `Tuple2..Tuple16` classes provide named accessors (`first`, `second`, etc.) but the generic `Tuple` only supports index-based access.
- Destructuring with `def (a, b) = tuple` works if `Tuple` supports index-based access via `getAt`; it relies on Groovy's list-assignment, not a specific destructuring interface.
