---
title: "Sets"
language: "groovy"
feature: "sets"
category: "data-structures"
applicable: true
---

Groovy does not have a dedicated set literal, but you can create a `Set` by using `as Set` on a list literal or by instantiating `HashSet`, `LinkedHashSet`, or `TreeSet` directly. All Groovy collection methods (`each`, `findAll`, `collect`, etc.) work on sets. Set operations like union, intersection, and difference use the `+`, `intersect()`, and `-` operators.

## Example

```groovy
// Create a set from a list literal
def colours = ["red", "blue", "green", "red"] as Set
println colours   // [red, blue, green] — duplicates removed

// Ordered set
def ordered = ["banana", "apple", "cherry"] as LinkedHashSet
println ordered   // [banana, apple, cherry]

// Sorted set
def sorted = [3, 1, 4, 1, 5] as TreeSet
println sorted    // [1, 3, 4, 5]

// Set operations
def a = [1, 2, 3, 4] as Set
def b = [3, 4, 5, 6] as Set
println a + b                // union:        [1, 2, 3, 4, 5, 6]
println a.intersect(b)       // intersection: [3, 4]
println a - b                // difference:   [1, 2]

// Membership check
println (3 in a)   // true
println a.contains(7)   // false
```

## Gotchas

- `as Set` uses `HashSet`, which does not guarantee iteration order. Use `LinkedHashSet` to preserve insertion order or `TreeSet` for natural ordering.
- The `+` operator on a `Set` returns a `List` if one operand is a `List`; use `(a + b) as Set` to ensure the result stays a set.
- Groovy's `in` keyword delegates to `contains()`, so it works correctly with sets, lists, maps (keys), and strings.
