---
title: "Closures & Lambdas"
language: "groovy"
feature: "closures"
category: "functions"
applicable: true
---

Groovy closures are first-class objects of type `groovy.lang.Closure`. They capture the enclosing scope, support an implicit `it` parameter when only one argument is expected, and can be assigned to variables, passed as arguments, or stored in collections. Closures also support currying via `curry()`, `rcurry()`, and `ncurry()`.

## Example

```groovy
// Basic closure with implicit 'it'
def double = { it * 2 }
println double(5)   // 10

// Explicit parameters
def add = { int a, int b -> a + b }
println add(3, 4)   // 7

// Closure as method argument (collection API)
def numbers = [1, 2, 3, 4, 5]
def evens = numbers.findAll { it % 2 == 0 }
println evens   // [2, 4]

// Capturing scope
def multiplier = 3
def tripler = { it * multiplier }
println tripler(7)   // 21

// Currying
def power = { base, exp -> base ** exp }
def square = power.curry(2)   // wait — base=2 means 2^exp
// For squaring: rcurry fixes the exponent
def sq = power.rcurry(2)
println sq(5)   // 25

// Closure composition
def inc  = { it + 1 }
def dbl  = { it * 2 }
def incThenDbl = inc >> dbl
println incThenDbl(3)   // 8
```

## Gotchas

- `this` inside a closure refers to the enclosing class instance, not the closure itself; use `owner` for the immediately enclosing object and `delegate` for the object methods are resolved against.
- Changing the `delegate` and `resolveStrategy` of a closure is the basis for Groovy DSLs (Gradle, Ratpack, etc.) — it can make code read naturally but harder to trace.
- Closures are not SAM interfaces; to pass a Groovy closure where a Java functional interface is expected, use the `as` coercion: `{ x -> x * 2 } as Function<Integer, Integer>`.
