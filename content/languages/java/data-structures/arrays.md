---
title: "Arrays"
language: "java"
feature: "arrays"
category: "data-structures"
applicable: true
---

Java arrays are fixed-size, typed, and zero-indexed. They are objects and carry a `length` field. The `java.util.Arrays` utility class provides sorting, searching, copying, and filling. For dynamic-size lists, `ArrayList<T>` is the idiomatic choice. Java 9+ `List.of()` creates compact, immutable lists. Multi-dimensional arrays are arrays of arrays.

## Example

```java
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public class ArrayDemo {

    public static void main(String[] args) {
        // Fixed-size array
        int[] scores = {90, 75, 85, 60, 95};

        // Length and access
        System.out.println(scores.length);   // 5
        System.out.println(scores[0]);        // 90

        // Sorting and searching
        Arrays.sort(scores);
        System.out.println(Arrays.toString(scores)); // [60, 75, 85, 90, 95]
        int idx = Arrays.binarySearch(scores, 85);
        System.out.println(idx);  // 2

        // Copy with resize
        int[] bigger = Arrays.copyOf(scores, 8); // pads with 0s
        int[] slice  = Arrays.copyOfRange(scores, 1, 4); // [75, 85, 90]

        // ArrayList — dynamic size
        List<String> names = new ArrayList<>(List.of("Alice", "Bob", "Carol"));
        names.add("Dave");
        names.remove("Bob");
        Collections.sort(names);
        System.out.println(names); // [Alice, Carol, Dave]

        // Immutable list
        List<Integer> fixed = List.of(1, 2, 3, 4, 5);
        // fixed.add(6); // UnsupportedOperationException
    }
}
```

## Gotchas

- Accessing an index outside `[0, length-1]` throws `ArrayIndexOutOfBoundsException` at runtime — Java does no compile-time bounds checking.
- `Arrays.asList()` returns a fixed-size list backed by the array; calling `add()` or `remove()` throws. Use `new ArrayList<>(Arrays.asList(...))` if you need a mutable list.
