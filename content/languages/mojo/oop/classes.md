---
title: "Classes"
language: "mojo"
feature: "classes"
category: "oop"
applicable: true
---

Mojo has `class` for Python-compatible OOP with reference semantics and dynamic dispatch. Classes are heap-allocated and garbage-collected (Python-style). For performance-critical code, `struct` is strongly preferred. Classes support all Python OOP features including multiple inheritance, `super()`, and dunder methods.

## Example

```mojo
# Python-compatible class (reference semantics)
class Animal:
    var name: String

    def __init__(self, name: String):
        self.name = name

    def speak(self) -> String:
        return self.name + " makes a sound"

    def __str__(self) -> String:
        return "Animal(" + self.name + ")"

class Dog(Animal):
    def __init__(self, name: String, breed: String):
        super().__init__(name)
        self.breed = breed

    def speak(self) -> String:
        return self.name + " says: Woof!"

fn main():
    var d = Dog("Rex", "Lab")
    print(d.speak())          # Rex says: Woof!
    print(isinstance(d, Animal))  # True

    # Class method / static method
    class Counter:
        count: Int = 0

        @staticmethod
        def reset_all():
            pass

        def increment(self):
            self.count += 1
```

## Gotchas

- Mojo `class` instances are reference types — assigning copies the reference, not the object.
- Classes in Mojo are still evolving; some Python class features may not be fully supported yet.
- For new Mojo code, prefer `struct` + traits over `class` + inheritance; `struct` provides predictable performance and value semantics.
