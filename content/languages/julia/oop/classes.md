---
title: "Classes"
language: "julia"
feature: "classes"
category: "oop"
applicable: false
---

Julia has no classes in the OOP sense. Instead, it uses **structs** for data and **multiple dispatch** for behavior. Functions are defined outside of types and dispatch on argument types. This is a fundamentally different paradigm: behavior (methods) are attached to *generic functions*, not to types. The result is more flexible than single-dispatch OOP.

## Example

```julia
# Julia's equivalent: struct + methods via multiple dispatch

abstract type Animal end

struct Dog <: Animal
    name::String
end

struct Cat <: Animal
    name::String
end

# Methods dispatch on type — Julia's equivalent of class methods
speak(a::Dog) = println(a.name, " says: Woof!")
speak(a::Cat) = println(a.name, " says: Meow!")
describe(a::Animal) = println("Animal named ", a.name)

# Usage
d = Dog("Rex")
c = Cat("Whiskers")
speak(d)         # Rex says: Woof!
speak(c)         # Whiskers says: Meow!
describe(d)      # Animal named Rex (uses Animal method)
```

## Gotchas

- Structs cannot contain methods; all behavior is in external generic functions.
- There is no `self` or `this` — the object is passed as an explicit argument.
- Multiple dispatch allows a function to specialize on *all* argument types, not just the first — more powerful than single-dispatch OOP.
