---
title: "Maps"
language: "java"
feature: "maps"
category: "data-structures"
applicable: true
---

Java's `Map<K, V>` interface is implemented by `HashMap` (O(1) average, unordered), `LinkedHashMap` (insertion-ordered), and `TreeMap` (sorted by key). `Map.of()` and `Map.copyOf()` create compact immutable maps (Java 9+). Java 8+ methods like `getOrDefault`, `putIfAbsent`, `computeIfAbsent`, and `merge` make map manipulation concise.

## Example

```java
import java.util.*;

public class MapDemo {

    public static void main(String[] args) {
        // HashMap — unordered, O(1) average
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Carol", 91);

        System.out.println(scores.get("Alice"));           // 95
        System.out.println(scores.getOrDefault("Dave", 0)); // 0
        System.out.println(scores.containsKey("Bob"));     // true

        // Iterate entries
        for (var entry : scores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        // computeIfAbsent — populate lazily
        Map<String, List<String>> groups = new HashMap<>();
        groups.computeIfAbsent("fruits", k -> new ArrayList<>()).add("apple");
        groups.computeIfAbsent("fruits", k -> new ArrayList<>()).add("banana");

        // merge — accumulate counts
        Map<String, Integer> wordCount = new HashMap<>();
        String[] words = {"a", "b", "a", "c", "b", "a"};
        for (String w : words) {
            wordCount.merge(w, 1, Integer::sum);
        }
        System.out.println(wordCount); // {a=3, b=2, c=1}

        // Immutable map
        Map<String, String> config = Map.of("host", "localhost", "port", "8080");
    }
}
```

## Gotchas

- `HashMap` is not thread-safe; use `ConcurrentHashMap` for concurrent access or `Collections.synchronizedMap()`.
- `HashMap` allows one `null` key and multiple `null` values; `Hashtable` and `ConcurrentHashMap` do not permit `null` keys or values.
