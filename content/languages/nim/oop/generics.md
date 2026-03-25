---
title: "Generics"
language: "nim"
feature: "generics"
category: "oop"
applicable: true
---

Nim generics use square-bracket type parameters: `proc name[T](x: T): T`. Type constraints use concepts or `typedesc` or type classes (e.g., `SomeInteger`, `SomeFloat`). Generic types (structs, etc.) use the same syntax. Nim also has `template` and `macro` for more powerful compile-time code generation beyond generics.

## Example

```nim
import std/math

# Generic function
proc identity[T](x: T): T = x

# Constrained generic (type class)
proc maxVal[T: SomeNumber](a, b: T): T =
  if a > b: a else: b

# Generic object
type Stack[T] = object
  data: seq[T]

proc push[T](s: var Stack[T], item: T) =
  s.data.add(item)

proc pop[T](s: var Stack[T]): T =
  s.data.pop()

proc peek[T](s: Stack[T]): T =
  s.data[^1]

proc isEmpty[T](s: Stack[T]): bool =
  s.data.len == 0

# Generic with multiple type params
proc zipPair[A, B](a: A, b: B): tuple[first: A, second: B] =
  (first: a, second: b)

# Usage
echo identity(42)
echo identity("hello")
echo maxVal(3, 7)
echo maxVal(1.5, 2.7)

var s: Stack[int]
s.push(10)
s.push(20)
echo s.peek()    # 20
echo s.pop()     # 20
echo s.isEmpty() # false

echo zipPair("key", 42)
```

## Gotchas

- Generic constraints with concepts (`[T: MyConcept]`) are checked at instantiation time, not declaration time.
- Nim's built-in type classes include `SomeNumber`, `SomeInteger`, `SomeFloat`, `SomeOrdinal` — prefer these over `int` for numeric generics.
- Generic code is monomorphized at compile time; each instantiation generates specialized code.
