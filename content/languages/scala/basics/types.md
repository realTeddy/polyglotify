---
title: "Types & Type Systems"
language: "scala"
feature: "types"
category: "basics"
applicable: true
---

Scala has a rich static type system with local type inference. All types are objects (no primitives at the language level). `Any` is the top type; `Nothing` is the bottom type. `Option[T]` replaces null. The type system supports generics, type bounds, variance annotations, and type aliases.

## Example

```scala
// Unified type hierarchy
val i: Int     = 42
val d: Double  = 3.14
val b: Boolean = true
val s: String  = "hello"

// Any / AnyVal / AnyRef
val any: Any   = 42         // top type
val anyVal: AnyVal = 3.14   // supertype of value types
val anyRef: AnyRef = "hi"   // supertype of reference types

// Option instead of null
val found:    Option[String] = Some("Alice")
val notFound: Option[String] = None

found.getOrElse("unknown")   // => "Alice"
notFound.map(_.length)        // => None

// Union types (Scala 3)
def parse(input: String | Int): String = input.toString

// Type aliases
type UserId    = Long
type UserCache = Map[UserId, String]

// Literal types
val flag: true = true
```

## Gotchas

- `Int` compiles to JVM `int` (primitive) but behaves as an object in Scala source
- `null` exists in Scala for JVM interop but is discouraged; use `Option`
- `Nothing` is a subtype of every type; it's the return type of methods that never return (e.g., `throw`)
