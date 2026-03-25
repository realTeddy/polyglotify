---
title: "Types"
language: "java"
feature: "types"
category: "basics"
applicable: true
---

Java has eight primitive types (`byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`) and a rich hierarchy of reference types. Everything else — strings, arrays, collections, user-defined classes — is a reference type. Generics allow parameterized classes and methods but are erased at runtime. Java 21+ records provide concise immutable value-like types, and sealed classes restrict class hierarchies.

## Example

```java
// Primitives
byte  b = 127;
short s = 32767;
int   i = 2_147_483_647;   // underscores allowed (Java 7+)
long  l = 9_223_372_036_854_775_807L;
float f = 3.14f;
double d = 3.141592653589793;
char  c = 'A';
boolean flag = true;

// Reference types
String text = "Hello, Java!";
int[] numbers = {1, 2, 3, 4, 5};

// Wrapper (boxed) types
Integer boxedInt = 42;
Double  boxedDouble = 3.14;

// Record — immutable data class (Java 16+)
record Point(int x, int y) {}
Point p = new Point(3, 4);
System.out.println(p.x());  // 3

// Sealed class — restricted hierarchy (Java 17+)
sealed interface Shape permits Circle, Rectangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double width, double height) implements Shape {}
```

## Gotchas

- Integer overflow is silent in Java — `int` wraps around without throwing an exception; use `Math.addExact` or `long` if overflow is a concern.
- `String` comparisons must use `.equals()`, not `==`; `==` checks reference identity, not value equality.
