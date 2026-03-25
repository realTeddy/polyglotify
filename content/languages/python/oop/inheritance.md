---
title: "Inheritance"
language: "python"
feature: "inheritance"
category: "oop"
applicable: true
---

Python supports single and multiple inheritance. Child classes extend a parent by listing it in parentheses after the class name. `super()` is used to delegate to the parent's methods. Python resolves method lookup order in multiple inheritance using the C3 linearisation algorithm (MRO).

## Example

```python
class Animal:
    def __init__(self, name: str) -> None:
        self.name = name

    def speak(self) -> str:
        raise NotImplementedError

    def __repr__(self) -> str:
        return f"{type(self).__name__}(name={self.name!r})"

class Dog(Animal):
    def speak(self) -> str:
        return f"{self.name} says: Woof!"

class Cat(Animal):
    def speak(self) -> str:
        return f"{self.name} says: Meow!"

dog = Dog("Rex")
print(dog.speak())   # Rex says: Woof!
print(isinstance(dog, Animal))  # True

# Calling parent __init__ with super()
class GuideDog(Dog):
    def __init__(self, name: str, owner: str) -> None:
        super().__init__(name)
        self.owner = owner

    def speak(self) -> str:
        return super().speak() + " (guide dog)"

# Multiple inheritance
class Flyable:
    def fly(self) -> str:
        return f"{self.name} is flying"

class FlyingDog(Dog, Flyable):
    pass

fdog = FlyingDog("Astro")
print(fdog.speak())   # Astro says: Woof!
print(fdog.fly())     # Astro is flying

# Inspect MRO
print(FlyingDog.__mro__)
```

## Gotchas

- Always call `super().__init__()` in a subclass `__init__` when you need the parent's initialisation to run
- Multiple inheritance can cause the "diamond problem" — Python's MRO (viewable via `ClassName.__mro__`) determines which method wins
- Checking `type(obj) == ClassName` is usually wrong; prefer `isinstance(obj, ClassName)` to respect the inheritance hierarchy
