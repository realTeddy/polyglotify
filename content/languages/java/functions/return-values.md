---
title: "Return Values"
language: "java"
feature: "return-values"
category: "functions"
applicable: true
---

Java methods declare their return type explicitly. A method returning nothing uses `void`. Java 8+ `Optional<T>` is the standard way to signal that a value may be absent without returning `null`. Methods can return only one value; returning multiple values requires wrapping them in an object, array, or record.

## Example

```java
import java.util.Optional;
import java.util.List;

public class ReturnDemo {

    // Explicit return type
    public static int square(int n) {
        return n * n;
    }

    // void — no return value
    public static void printLine(String text) {
        System.out.println(text);
        // implicit return
    }

    // Optional — may or may not have a value
    public static Optional<String> findByName(List<String> names, String prefix) {
        return names.stream()
                    .filter(n -> n.startsWith(prefix))
                    .findFirst();
    }

    // Record as a multi-value return (Java 16+)
    record DivMod(int quotient, int remainder) {}

    public static DivMod divmod(int a, int b) {
        return new DivMod(a / b, a % b);
    }

    public static void main(String[] args) {
        System.out.println(square(7));  // 49

        var names = List.of("Alice", "Bob", "Anna");
        Optional<String> found = findByName(names, "A");
        found.ifPresentOrElse(
            n -> System.out.println("Found: " + n),
            () -> System.out.println("Not found")
        );  // Found: Alice

        DivMod result = divmod(17, 5);
        System.out.println(result.quotient() + " r " + result.remainder()); // 3 r 2
    }
}
```

## Gotchas

- Avoid returning `null` from methods — it forces callers to do null checks and is a major source of `NullPointerException`. Return `Optional<T>` for values that might not exist.
- `Optional` is intended for return types only; using it as a method parameter or field type is considered bad practice by the Java team.
