---
title: "Interfaces"
language: "java"
feature: "interfaces"
category: "oop"
applicable: true
---

Java interfaces define contracts that classes can implement. Since Java 8, interfaces can contain `default` and `static` methods with implementations. Since Java 9, they can also have `private` methods. A class can implement any number of interfaces. Functional interfaces — interfaces with exactly one abstract method — power lambda expressions and the `java.util.function` package.

## Example

```java
import java.util.List;
import java.util.function.Predicate;

// Interface with abstract and default methods
interface Validator<T> {
    boolean validate(T value);

    default Validator<T> and(Validator<T> other) {
        return value -> this.validate(value) && other.validate(value);
    }

    default Validator<T> or(Validator<T> other) {
        return value -> this.validate(value) || other.validate(value);
    }

    static <T> Validator<T> of(Predicate<T> predicate) {
        return predicate::test;
    }
}

// Multiple interface implementation
interface Printable {
    void print();
}

interface Saveable {
    void save(String path);
}

class Document implements Printable, Saveable {
    private final String content;

    Document(String content) { this.content = content; }

    @Override public void print() { System.out.println(content); }
    @Override public void save(String path) { System.out.println("Saved to " + path); }
}

class Demo {
    public static void main(String[] args) {
        Validator<String> notEmpty = s -> !s.isBlank();
        Validator<String> shortEnough = s -> s.length() <= 50;
        Validator<String> combined = notEmpty.and(shortEnough);

        System.out.println(combined.validate("Hello"));  // true
        System.out.println(combined.validate(""));       // false
    }
}
```

## Gotchas

- Multiple `default` method inheritance conflicts: if two interfaces provide `default` methods with the same signature, the implementing class must override the method to resolve the ambiguity — the compiler enforces this.
- Interfaces cannot have instance fields (only `public static final` constants). Use abstract classes when shared mutable state is needed.
