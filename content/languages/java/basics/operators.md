---
title: "Operators"
language: "java"
feature: "operators"
category: "basics"
applicable: true
---

Java provides standard arithmetic, comparison, logical, bitwise, and assignment operators. Notably absent: operator overloading (you cannot redefine `+` for custom types) and the `===` operator. The `instanceof` operator gained pattern matching in Java 16+, allowing simultaneous type-check and cast in a single expression.

## Example

```java
// Arithmetic
int sum  = 10 + 3;   // 13
int rem  = 10 % 3;   // 1
double pow = Math.pow(2, 8); // 256.0  (no ** operator)

// Comparison (primitive equality)
System.out.println(1 == 1);    // true
System.out.println(1 == 1.0);  // true (widening)

// Logical with short-circuit
boolean a = true, b = false;
System.out.println(a || b);  // true
System.out.println(a && b);  // false

// Bitwise
int flags = 0b1010;
int mask  = 0b1100;
System.out.println(Integer.toBinaryString(flags & mask)); // 1000
System.out.println(Integer.toBinaryString(flags | mask)); // 1110

// Pattern matching instanceof (Java 16+)
Object obj = "Hello";
if (obj instanceof String s) {
  System.out.println(s.toUpperCase()); // HELLO — s already cast
}

// Ternary
int max = (a ? 10 : 5); // 10

// Unsigned right shift
int shifted = -1 >>> 1; // 2147483647
```

## Gotchas

- Integer division truncates toward zero: `7 / 2 == 3`, not `3.5`. Cast at least one operand to `double` for floating-point division.
- `++i` (pre-increment) and `i++` (post-increment) differ in expression value; avoid using them inside complex expressions to prevent confusion.
