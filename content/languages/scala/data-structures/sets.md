---
title: "Sets"
language: "scala"
feature: "sets"
category: "data-structures"
applicable: true
---

Scala's default `Set[T]` is immutable and unordered. Operations return new sets. Standard set algebra (`|`, `&`, `&~`) is supported. `scala.collection.mutable.Set` provides in-place mutation. `SortedSet` maintains elements in sorted order.

## Example

```scala
// Immutable set
val fruits = Set("apple", "banana", "cherry")

// Add / remove — returns new set
val with4   = fruits + "date"
val without = fruits - "banana"

// Membership
fruits.contains("apple")  // => true
fruits("apple")           // => true (apply method)

// Set operations
val a = Set(1, 2, 3, 4)
val b = Set(3, 4, 5, 6)

a | b   // union        => Set(1,2,3,4,5,6)
a & b   // intersection => Set(3,4)
a &~ b  // difference   => Set(1,2)

// Iteration
fruits.foreach(println)
fruits.map(_.toUpperCase)
fruits.filter(_.length > 5)

// Mutable set
import scala.collection.mutable
val ms = mutable.Set(1, 2, 3)
ms += 4
ms -= 2
```

## Gotchas

- Default `Set` does not preserve insertion order; use `ListSet` or `LinkedHashSet` (mutable) for ordering
- `Set` uses structural equality via `==`; custom objects must implement `equals` and `hashCode`
- Sets with fewer than 5 elements use specialized implementations for better performance
