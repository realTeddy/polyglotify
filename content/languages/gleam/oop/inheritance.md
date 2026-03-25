---
title: "Inheritance"
language: "gleam"
feature: "inheritance"
category: "oop"
applicable: false
---

Gleam has no inheritance. Code reuse is achieved through function composition, custom types with shared variants, and higher-order functions. The type system ensures correctness without the fragile base class problem that class hierarchies introduce.

## Example

```gleam
// Gleam uses sum types where you might use inheritance elsewhere
pub type Animal {
  Dog(name: String, breed: String)
  Cat(name: String, indoor: Bool)
  Bird(name: String, can_fly: Bool)
}

pub fn speak(animal: Animal) -> String {
  case animal {
    Dog(..) -> "Woof!"
    Cat(..) -> "Meow!"
    Bird(..) -> "Tweet!"
  }
}

pub fn name(animal: Animal) -> String {
  case animal {
    Dog(name: n, ..) -> n
    Cat(name: n, ..) -> n
    Bird(name: n, ..) -> n
  }
}

// Usage:
// let animals = [Dog("Rex", "Labrador"), Cat("Whiskers", True)]
// list.map(animals, speak)
```

## Gotchas

- Adding a new variant to the sum type causes compile errors in all `case` expressions that don't handle it — this is a feature, not a bug (it forces you to handle new cases).
- Common fields (like `name`) must be extracted via pattern matching or a helper function — there is no automatic field inheritance.
- Composition (embedding one type's value inside another) is the idiomatic alternative to inheritance.
