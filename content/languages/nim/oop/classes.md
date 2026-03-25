---
title: "Classes"
language: "nim"
feature: "classes"
category: "oop"
applicable: true
---

Nim uses `ref object` with associated `proc`s to achieve class-like behavior. There are no `class` keywords, but `ref object` provides reference semantics (heap allocation, shared state) and supports inheritance with `of`. Methods are regular `proc`s that take the object as first argument; the dot-call syntax (`obj.method()`) is syntactic sugar.

## Example

```nim
type
  Animal = ref object of RootObj
    name*: string
    sound*: string

  Dog = ref object of Animal
    breed*: string

# "Constructor"
proc newAnimal(name, sound: string): Animal =
  Animal(name: name, sound: sound)

proc newDog(name, breed: string): Dog =
  Dog(name: name, sound: "Woof", breed: breed)

# "Methods" — procs on the type
proc speak(a: Animal) =
  echo a.name, " says: ", a.sound

proc describe(d: Dog) =
  echo d.name, " is a ", d.breed, " dog"

# Method (virtual dispatch via method keyword)
method makeSound(a: Animal): string {.base.} =
  a.sound

method makeSound(d: Dog): string =
  "WOOF WOOF"

# Usage
let animal = newAnimal("Generic", "...")
let dog    = newDog("Rex", "Labrador")

speak(animal)
speak(dog)
describe(dog)

# Virtual dispatch
let animals: seq[Animal] = @[animal, dog]
for a in animals:
  echo makeSound(a)   # dispatches to correct override
```

## Gotchas

- Use `proc` for statically dispatched methods; use `method` (with `{.base.}` on the root) for virtual dispatch.
- `ref object` inherits from `RootObj` by default; all `ref object` types are assignable to `RootObj`.
- `isNil` checks if a `ref object` is null; Nim's GC manages the heap memory.
