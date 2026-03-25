---
title: "Interfaces & Traits"
language: "nim"
feature: "interfaces"
category: "oop"
applicable: false
---

Nim has no formal interface or trait syntax. Interfaces are approximated in two ways: (1) **concept** types (structural typing via `concept` keyword) which define compile-time duck-typing constraints, and (2) **base methods** in an inheritance hierarchy. Concepts are Nim's most powerful interface-like mechanism and work at compile time.

## Example

```nim
# Concept — compile-time structural interface
type
  Printable = concept x
    $x is string       # must have $ operator returning string

  Measurable = concept x
    x.len is int       # must have .len returning int

proc printIt[T: Printable](val: T) =
  echo $val

proc printLength[T: Measurable](val: T) =
  echo "length: ", val.len

# Any type satisfying the concept works automatically
printIt(42)
printIt("hello")
printIt(3.14)

printLength("hello")
printLength(@[1, 2, 3])

# Concept with multiple requirements
type Comparable = concept a, b
  (a < b) is bool
  (a == b) is bool

proc findMin[T: Comparable](a, b: T): T =
  if a < b: a else: b

echo findMin(3, 7)
echo findMin("apple", "banana")
```

## Gotchas

- Concepts are purely compile-time; there is no runtime interface dispatch (unlike Go's interfaces).
- If a type doesn't satisfy a concept, the error messages can be complex; document required operations.
- For runtime polymorphism, use `method` + inheritance instead of concepts.
