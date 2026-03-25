---
title: "Closures"
language: "java"
feature: "closures"
category: "functions"
applicable: true
---

Java supports closures through lambda expressions and anonymous classes (Java 8+). Lambdas can capture variables from the enclosing scope, but captured variables must be effectively final — they cannot be reassigned after the lambda is created. This restriction ensures thread safety and avoids the classic mutable-capture bugs common in other languages. Lambdas implement functional interfaces (single abstract method interfaces).

## Example

```java
import java.util.function.*;
import java.util.List;
import java.util.ArrayList;

public class ClosureDemo {

    // Capturing an effectively-final variable
    static Runnable makeGreeter(String name) {
        // name is effectively final — never reassigned
        return () -> System.out.println("Hello, " + name + "!");
    }

    // Function composition (closure over another function)
    static <T, R, V> Function<T, V> compose(Function<T, R> f, Function<R, V> g) {
        return x -> g.apply(f.apply(x));  // captures f and g
    }

    // Counter using an array as a mutable container (workaround for effectively-final)
    static Supplier<Integer> makeCounter() {
        int[] count = {0};  // array reference is final; contents are mutable
        return () -> ++count[0];
    }

    public static void main(String[] args) {
        Runnable greet = makeGreeter("Alice");
        greet.run();  // Hello, Alice!

        Function<String, Integer> length = String::length;
        Function<Integer, Boolean> isEven = n -> n % 2 == 0;
        Function<String, Boolean> hasEvenLength = compose(length, isEven);
        System.out.println(hasEvenLength.apply("Hello"));  // false (5)
        System.out.println(hasEvenLength.apply("Java"));   // true  (4)

        Supplier<Integer> counter = makeCounter();
        System.out.println(counter.get()); // 1
        System.out.println(counter.get()); // 2
    }
}
```

## Gotchas

- Lambdas cannot capture variables that are reassigned after the lambda is created ("effectively final" rule). The compiler error "local variable must be final or effectively final" is common when trying to increment a loop counter inside a lambda.
- Unlike inner classes, lambdas do not create a new `this` scope — `this` inside a lambda refers to the enclosing class instance.
