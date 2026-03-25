---
title: "Variables"
language: "java"
feature: "variables"
category: "basics"
applicable: true
---

Java variables are statically and explicitly typed at declaration. Local variables can use `var` (Java 10+) for type inference from the initializer. All variables must be initialized before use; uninitialized local variables cause a compile error. Instance fields are zero-initialized by default (`0`, `false`, `null`). `final` creates an immutable binding — the reference cannot be reassigned, though the referenced object may still be mutable.

## Example

```java
// Explicit type declarations
int age = 30;
double pi = 3.14159;
boolean active = true;
String name = "Alice";

// Local variable type inference (Java 10+)
var items = new ArrayList<String>();  // inferred as ArrayList<String>
var count = 42;                        // inferred as int

// final — immutable binding
final int MAX_SIZE = 100;
// MAX_SIZE = 200; // compile error

// Primitive vs reference types
int x = 5;           // primitive — stored by value
Integer boxed = 5;   // Integer object — stored by reference (autoboxed)

// Multiple assignment (same type)
int a = 1, b = 2, c = 3;
```

## Gotchas

- `var` works only for local variables; it cannot be used for fields, method parameters, or return types.
- Java has two kinds of types: primitives (`int`, `long`, `double`, etc.) and reference types (objects). Autoboxing converts between them automatically, but can cause `NullPointerException` when unboxing `null`.
