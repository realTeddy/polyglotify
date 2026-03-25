---
title: "Function Declaration"
language: "java"
feature: "declaration"
category: "functions"
applicable: true
---

In Java, all functions are methods and must belong to a class or interface. A method declaration specifies the access modifier, optional modifiers (`static`, `final`, `abstract`), return type, name, and parameter list. Java supports method overloading (multiple methods with the same name but different parameter types). Static methods belong to the class; instance methods require an object receiver.

## Example

```java
public class MathUtils {

    // Static utility method
    public static int add(int a, int b) {
        return a + b;
    }

    // Overloaded variant for doubles
    public static double add(double a, double b) {
        return a + b;
    }

    // Varargs
    public static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) total += n;
        return total;
    }

    // Generic method
    public static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    public static void main(String[] args) {
        System.out.println(add(2, 3));       // 5
        System.out.println(add(2.5, 3.5));   // 6.0
        System.out.println(sum(1, 2, 3, 4)); // 10
        System.out.println(max("apple", "banana")); // banana
    }
}
```

## Gotchas

- Java does not support standalone functions; every method must be inside a class. Utility functions are conventionally placed in a `final` class with a private constructor and only `static` methods.
- Varargs (`T...`) must be the last parameter and are treated as an array inside the method.
