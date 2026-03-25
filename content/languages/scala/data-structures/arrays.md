---
title: "Arrays & Lists"
language: "scala"
feature: "arrays"
category: "data-structures"
applicable: true
---

Scala has two main sequence types: immutable `List[T]` (linked list, O(1) prepend) and `Vector[T]` (indexed, O(1) amortized random access). `Array[T]` maps to JVM arrays. The `Seq[T]` trait is the common abstraction. For mutable sequences, `ArrayBuffer[T]` is idiomatic.

## Example

```scala
// Immutable List (linked list — fast prepend)
val list = List(1, 2, 3)
val prepended = 0 :: list       // => List(0, 1, 2, 3)
val appended  = list :+ 4       // => List(1, 2, 3, 4)  (O(n))

// Vector (indexed — fast random access)
val vec = Vector(1, 2, 3)
vec(1)        // => 2  (O(1) effective)
vec.updated(1, 99)  // => Vector(1, 99, 3)  (returns new)

// Array (mutable, maps to JVM array)
val arr = Array(1, 2, 3)
arr(0) = 10   // mutation
arr.length    // => 3

// Common operations (all return new collections)
list.map(_ * 2)
list.filter(_ > 1)
list.foldLeft(0)(_ + _)
list.grouped(2).toList     // => List(List(1,2), List(3))
list.zip(List("a","b","c"))  // => List((1,"a"),(2,"b"),(3,"c"))
list.sorted
list.distinct
```

## Gotchas

- `List` prepend `::` is O(1); append `:+` is O(n) — use `Vector` or `ListBuffer` for frequent appending
- `Array` is mutable and invariant; `List` and `Vector` are immutable and covariant
- `Nil` is the empty list; `List()` and `Nil` are the same object
