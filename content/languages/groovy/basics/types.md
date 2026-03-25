---
title: "Types & Type Systems"
language: "groovy"
feature: "types"
category: "basics"
applicable: true
---

Groovy is optionally typed: you can write fully dynamic code using `def`, or fully static code with explicit Java types. The `@TypeChecked` annotation enables compile-time type checking similar to Java, while `@CompileStatic` goes further by generating bytecode without dynamic dispatch. All Groovy types are Java types under the hood, and autoboxing between primitives and wrapper classes is handled automatically.

## Example

```groovy
// Dynamic typing
def value = 42
value = "now a string"  // perfectly valid in dynamic Groovy

// Static typing
int count = 10
String label = "items"

// Type checking annotation
import groovy.transform.TypeChecked

@TypeChecked
class Calculator {
    int add(int a, int b) { a + b }
}

// Groovy's coercion with the 'as' keyword
def list = [1, 2, 3] as LinkedList
def set  = [1, 2, 2, 3] as Set

println list.class  // class java.util.LinkedList
println set         // [1, 2, 3]
```

## Gotchas

- Without `@TypeChecked` or `@CompileStatic`, type errors are caught at runtime, not compile time, which can cause surprising `MissingMethodException` failures.
- Groovy auto-coerces `null` to `false` in boolean contexts; an empty string, empty collection, and zero are also falsy (Groovy truth).
- The `as` operator performs coercion, not casting; it can create new objects and may throw a `GroovyCastException` at runtime if coercion is impossible.
