---
title: "Tuples"
language: "java"
feature: "tuples"
category: "data-structures"
applicable: true
---

Java has no built-in tuple type. The idiomatic solution since Java 16 is to use **records** — concise, immutable data classes that serve the same purpose. Before records, `Map.Entry<K,V>` was used for pairs and the `javafx.util.Pair` or third-party libraries (Apache Commons, Vavr) for general tuples. Records are strongly preferred in modern Java because they are named, type-safe, and self-documenting.

## Example

```java
import java.util.*;

public class TupleDemo {

    // Record as a typed 2-tuple
    record Pair<A, B>(A first, B second) {}

    // Named records are clearer than generic Pair
    record Point(int x, int y) {}
    record DivResult(int quotient, int remainder) {}

    static DivResult divmod(int a, int b) {
        return new DivResult(a / b, a % b);
    }

    // Record with compact constructor for validation
    record Range(int low, int high) {
        Range {
            if (low > high) throw new IllegalArgumentException("low > high");
        }
    }

    public static void main(String[] args) {
        var point = new Point(3, 4);
        System.out.println(point.x() + ", " + point.y()); // 3, 4

        var result = divmod(17, 5);
        System.out.println(result.quotient() + " r " + result.remainder()); // 3 r 2

        var pair = new Pair<>("Alice", 95);
        System.out.println(pair.first() + ": " + pair.second()); // Alice: 95

        // Records are equal by value
        System.out.println(new Point(1, 2).equals(new Point(1, 2))); // true
    }
}
```

## Gotchas

- Records automatically generate `equals()`, `hashCode()`, and `toString()` based on their components, making them excellent value types.
- Record components are implicitly `final`; they cannot be mutated after construction. If mutability is required, use a regular class.
