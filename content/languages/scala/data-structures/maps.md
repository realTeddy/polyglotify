---
title: "Maps & Dictionaries"
language: "scala"
feature: "maps"
category: "data-structures"
applicable: true
---

Scala's `Map[K, V]` is immutable by default (in `scala.collection.immutable`). Operations return new maps. `scala.collection.mutable.Map` is available when mutation is needed. Key lookup returns `Option[V]` to avoid null.

## Example

```scala
// Immutable map
val scores = Map("Alice" -> 95, "Bob" -> 87)

// Access — safe
scores.get("Alice")       // => Some(95)
scores.get("Unknown")     // => None
scores("Alice")           // => 95 (throws NoSuchElementException if missing)
scores.getOrElse("X", 0)  // => 0

// "Mutation" — returns new map
val updated  = scores + ("Carol" -> 92)
val removed  = scores - "Bob"
val merged   = scores ++ Map("Dave" -> 88)

// Iteration
for (name, score) <- scores do
  println(s"$name: $score")

scores.map((k, v) => k -> v * 2)
scores.filter((_, v) => v >= 90)

// Mutable map
import scala.collection.mutable
val mMap = mutable.Map("x" -> 1)
mMap("y") = 2
mMap.remove("x")
```

## Gotchas

- `map("key")` throws `NoSuchElementException`; prefer `.get("key")` which returns `Option`
- Immutable `Map` with fewer than 5 entries uses specialized implementations (Map1–Map4) for performance
- Default immutable `Map` does not guarantee iteration order; use `ListMap` (insertion order) or `SortedMap`
