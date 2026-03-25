---
title: "Control Flow"
language: "scala"
feature: "control-flow"
category: "basics"
applicable: true
---

Scala control flow constructs (`if`, `match`, `for`, `while`) are all expressions that return values. `match` is Scala's powerful pattern matching construct. `for` comprehensions express monadic operations on `Option`, `List`, `Future`, etc.

## Example

```scala
// if is an expression
val label = if score >= 90 then "A" else "B"

// match (exhaustive pattern matching)
val result = status match
  case "ok"    => "success"
  case "error" => "failure"
  case s       => s"unknown: $s"

// Match on type
def describe(x: Any): String = x match
  case i: Int    => s"integer $i"
  case s: String => s"string of length ${s.length}"
  case _         => "unknown"

// for loop (imperative)
for i <- 1 to 5 do println(i)

// for comprehension (functional — maps/flatMaps)
val pairs = for
  x <- List(1, 2, 3)
  y <- List(10, 20)
  if x + y < 25
yield (x, y)
// => List((1,10), (1,20), (2,10), (2,20), (3,10))

// while loop
var n = 0
while n < 5 do
  println(n)
  n += 1
```

## Gotchas

- `match` in Scala is exhaustive; the compiler warns for non-exhaustive matches on sealed types
- `for` comprehensions are syntactic sugar for `map`/`flatMap`/`filter` — they work on any monad
- Unlike Java's `switch`, Scala `match` does not fall through between cases
