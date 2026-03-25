---
title: "Inheritance"
language: "vlang"
feature: "inheritance"
category: "oop"
applicable: false
---

V does not support inheritance. Composition via struct embedding is the recommended alternative. A struct can embed another struct, gaining access to its fields and methods directly. For polymorphism, V uses interfaces (duck typing via implicit interface satisfaction).

## Example

```v
// Composition via embedding (V's answer to inheritance)

struct Animal {
    name string
}

fn (a Animal) speak() string {
    return '${a.name} makes a sound'
}

struct Dog {
    Animal  // embedded struct
    breed string
}

fn (d Dog) speak() string {
    // override by defining same method
    return '${d.name} says: Woof!'
}

struct Cat {
    Animal
}

// Cat uses Animal.speak() by promotion

fn main() {
    d := Dog{Animal: Animal{name: 'Rex'}, breed: 'Lab'}
    c := Cat{Animal{name: 'Whiskers'}}

    println(d.speak())    // Rex says: Woof!
    println(c.speak())    // Whiskers makes a sound
    println(d.name)       // Rex  (promoted field)
    println(d.breed)      // Lab
}
```

## Gotchas

- Embedding is not inheritance — there is no `super` call, no virtual dispatch, and no subtype relationship.
- If you define a method on the outer struct with the same name as the embedded struct's method, the outer method shadows the embedded one.
- For polymorphic behavior, define an interface and let multiple structs implement it.
