---
title: "Structs & Classes"
language: "nim"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Nim uses `object` (stack-allocated, value semantics) and `ref object` (heap-allocated, reference semantics) for composite types. `ref object` is the equivalent of a class instance in other languages. Fields can be public (default) or private (with `*` to export). Nim supports inheritance via `of` and method dispatch.

## Example

```nim
# Value object (struct-like)
type
  Point = object
    x*, y*: float    # * exports the field

  # Reference object (class-like, heap-allocated)
  Person = ref object
    name*: string
    age*:  int

# Constructor proc (by convention)
proc newPerson(name: string, age: int): Person =
  Person(name: name, age: age)

# Methods (procs that operate on the type)
proc greet(p: Person): string =
  "Hello, I'm " & p.name

proc birthday(p: Person) =
  p.age += 1   # ref object — mutation visible to caller

# Usage
let pt = Point(x: 3.0, y: 4.0)
echo pt.x, " ", pt.y

let alice = newPerson("Alice", 30)
echo alice.greet()
alice.birthday()
echo alice.age   # 31

# Object variants (discriminated union)
type
  ShapeKind = enum skCircle, skRect
  Shape = object
    case kind: ShapeKind
    of skCircle: radius: float
    of skRect:   width, height: float

let c = Shape(kind: skCircle, radius: 5.0)
let r = Shape(kind: skRect,   width: 4.0, height: 3.0)
```

## Gotchas

- `object` is a value type (copied on assignment); `ref object` is a reference type (pointer semantics).
- Nim has no constructors; `new(T)` allocates a zeroed `ref object`; use a `newT()` proc for initialization.
- Fields marked with `*` are exported (public); unmarked fields are module-private.
