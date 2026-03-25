---
title: "Sets"
language: "java"
feature: "sets"
category: "data-structures"
applicable: true
---

Java's `Set<E>` interface is implemented by `HashSet` (O(1) average, unordered), `LinkedHashSet` (insertion-ordered), and `TreeSet` (sorted). `Set.of()` creates an immutable set. Sets use `equals()` and `hashCode()` for membership, so custom objects must implement both methods correctly to work reliably in a set.

## Example

```java
import java.util.*;

public class SetDemo {

    public static void main(String[] args) {
        // HashSet
        Set<String> tags = new HashSet<>(Set.of("java", "oop", "backend"));
        tags.add("java");   // duplicate — no effect
        tags.add("spring");
        System.out.println(tags.contains("java")); // true
        System.out.println(tags.size());            // 4

        // LinkedHashSet — preserves insertion order
        Set<String> ordered = new LinkedHashSet<>(List.of("c", "a", "b"));
        System.out.println(ordered); // [c, a, b]

        // TreeSet — sorted order
        Set<Integer> sorted = new TreeSet<>(List.of(5, 2, 8, 1, 3));
        System.out.println(sorted);         // [1, 2, 3, 5, 8]
        System.out.println(((TreeSet<Integer>) sorted).first()); // 1

        // Set operations
        Set<Integer> a = new HashSet<>(Set.of(1, 2, 3, 4));
        Set<Integer> b = new HashSet<>(Set.of(3, 4, 5, 6));

        Set<Integer> union = new HashSet<>(a);
        union.addAll(b);           // {1,2,3,4,5,6}

        Set<Integer> intersection = new HashSet<>(a);
        intersection.retainAll(b); // {3,4}

        Set<Integer> difference = new HashSet<>(a);
        difference.removeAll(b);   // {1,2}

        System.out.println(union);        // [1, 2, 3, 4, 5, 6]
        System.out.println(intersection); // [3, 4]
        System.out.println(difference);   // [1, 2]
    }
}
```

## Gotchas

- If you store mutable objects in a `HashSet`, mutating their fields after insertion can break the hash and make them un-findable. Prefer storing immutable objects (records, `String`, etc.).
- `Set.of()` does not permit `null` elements and throws `NullPointerException` if you try to add one.
