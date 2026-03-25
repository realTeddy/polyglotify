---
title: "Interfaces & Traits"
language: "mojo"
feature: "interfaces"
category: "oop"
applicable: true
---

Mojo uses **traits** (similar to Rust traits or Swift protocols) as its primary interface mechanism. A `trait` defines a set of required methods that a `struct` must implement. Structs declare conformance with `struct MyType(Trait1, Trait2):`. Built-in traits include `Stringable`, `Copyable`, `Movable`, `Hashable`, `Equatable`, and `Comparable`.

## Example

```mojo
# Define a trait
trait Animal:
    fn speak(self) -> String: ...
    fn name(self) -> String: ...

# Implement the trait
struct Dog(Animal):
    var _name: String

    fn __init__(inout self, name: String):
        self._name = name

    fn speak(self) -> String:
        return self._name + " says: Woof!"

    fn name(self) -> String:
        return self._name

struct Cat(Animal):
    var _name: String

    fn __init__(inout self, name: String):
        self._name = name

    fn speak(self) -> String:
        return self._name + " says: Meow!"

    fn name(self) -> String:
        return self._name

# Generic function constrained to a trait
fn make_sound[T: Animal](animal: T):
    print(animal.speak())

fn main():
    var d = Dog("Rex")
    var c = Cat("Whiskers")
    make_sound(d)  # Rex says: Woof!
    make_sound(c)  # Whiskers says: Meow!

# Built-in trait example
struct Point(Stringable, Equatable):
    var x: Int
    var y: Int

    fn __str__(self) -> String:
        return "(" + str(self.x) + ", " + str(self.y) + ")"

    fn __eq__(self, other: Self) -> Bool:
        return self.x == other.x and self.y == other.y
```

## Gotchas

- Trait methods must be declared with `...` as the body in the trait definition; this is Mojo's convention for "abstract method."
- Struct trait conformance is monomorphized — `make_sound[T: Animal]` generates a separate function for each concrete type, enabling static dispatch without virtual call overhead.
- Mojo does not support dynamic dispatch through trait objects the same way Rust's `dyn Trait` does; check current Mojo docs for the latest approach.
