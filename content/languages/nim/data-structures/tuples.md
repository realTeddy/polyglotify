---
title: "Tuples"
language: "nim"
feature: "tuples"
category: "data-structures"
applicable: true
---

Nim tuples are heterogeneous, fixed-length, value types. They can be anonymous (accessed by index or generic field names) or named (fields accessed by name). Tuples support structural equality and destructuring. They are commonly used for multiple return values and lightweight record types without needing a full `object` definition.

## Example

```nim
# Anonymous tuple
let t = (1, "hello", 3.14)
echo t[0]    # 1
echo t[1]    # hello
echo t[2]    # 3.14

# Named tuple (named fields)
let person = (name: "Alice", age: 30, active: true)
echo person.name    # Alice
echo person.age     # 30

# Tuple type declaration
type Point = tuple[x, y: float]

proc distance(a, b: Point): float =
  let dx = b.x - a.x
  let dy = b.y - a.y
  sqrt(dx*dx + dy*dy)

let p1: Point = (x: 0.0, y: 0.0)
let p2: Point = (x: 3.0, y: 4.0)
echo distance(p1, p2)   # 5.0

# Destructuring
let (a, b, c) = (10, "world", true)
echo a, " ", b, " ", c

# Multiple return via tuple
proc splitAt(s: string, n: int): (string, string) =
  (s[0..<n], s[n..^1])

let (left, right) = splitAt("hello world", 5)
echo left   # hello
echo right  #  world

import std/math
```

## Gotchas

- Named and anonymous tuples with the same field types are structurally compatible in Nim.
- Tuples are value types (copied on assignment); use `ref` tuples for shared mutable state.
- Tuple field access by index is zero-based: `t[0]` is the first element.
