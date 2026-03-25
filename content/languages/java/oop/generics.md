---
title: "Generics"
language: "java"
feature: "generics"
category: "oop"
applicable: true
---

Java generics provide compile-time type safety for classes, interfaces, and methods. They are implemented via type erasure — generic type information is removed at runtime — which means `instanceof` checks against type parameters are not possible. Wildcards (`? extends T`, `? super T`) provide flexible API design, following the PECS rule (Producer Extends, Consumer Super).

## Example

```java
import java.util.*;
import java.util.function.Function;

// Generic class
class Pair<A, B> {
    private final A first;
    private final B second;

    public Pair(A first, B second) {
        this.first = first;
        this.second = second;
    }

    public A getFirst() { return first; }
    public B getSecond() { return second; }

    public <C> Pair<C, B> mapFirst(Function<A, C> f) {
        return new Pair<>(f.apply(first), second);
    }

    @Override
    public String toString() { return "(" + first + ", " + second + ")"; }
}

// Generic method with bounded type parameter
class Collections2 {
    public static <T extends Comparable<T>> T max(List<T> list) {
        if (list.isEmpty()) throw new NoSuchElementException();
        T result = list.get(0);
        for (T item : list) {
            if (item.compareTo(result) > 0) result = item;
        }
        return result;
    }

    // PECS: ? extends — producer (read from)
    public static double sumList(List<? extends Number> numbers) {
        return numbers.stream().mapToDouble(Number::doubleValue).sum();
    }

    // PECS: ? super — consumer (write to)
    public static void addNumbers(List<? super Integer> list) {
        list.add(1);
        list.add(2);
        list.add(3);
    }
}

class Demo {
    public static void main(String[] args) {
        var pair = new Pair<>("Alice", 95);
        System.out.println(pair);  // (Alice, 95)
        System.out.println(pair.mapFirst(String::length)); // (5, 95)

        System.out.println(Collections2.max(List.of(3, 1, 4, 1, 5))); // 5
        System.out.println(Collections2.sumList(List.of(1, 2.5, 3))); // 6.5
    }
}
```

## Gotchas

- Type erasure means `List<String>` and `List<Integer>` are the same type at runtime. You cannot create `new T[]` or check `if (obj instanceof List<String>)` (only `instanceof List<?>` works).
- Raw types (using `List` instead of `List<String>`) silence generic type checking and are a legacy feature — avoid them entirely in new code.
