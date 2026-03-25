---
title: "Interfaces & Traits"
language: "python"
feature: "interfaces"
category: "oop"
applicable: true
---

Python has no `interface` keyword. Two idiomatic alternatives exist: Abstract Base Classes (`abc.ABC`) enforce a contract at instantiation time, and `typing.Protocol` enables structural subtyping ("duck typing") where no explicit inheritance is required.

## Example

```python
from abc import ABC, abstractmethod

# Abstract Base Class — nominal typing
class Drawable(ABC):
    @abstractmethod
    def draw(self) -> None: ...

    @abstractmethod
    def area(self) -> float: ...

class Circle(Drawable):
    def __init__(self, radius: float) -> None:
        self.radius = radius

    def draw(self) -> None:
        print(f"Drawing circle r={self.radius}")

    def area(self) -> float:
        import math
        return math.pi * self.radius ** 2

# Drawable()  # TypeError: Can't instantiate abstract class

# Protocol — structural typing (duck typing, no inheritance needed)
from typing import Protocol

class Serializable(Protocol):
    def to_json(self) -> str: ...

class User:
    def __init__(self, name: str) -> None:
        self.name = name

    def to_json(self) -> str:
        import json
        return json.dumps({"name": self.name})

def save(obj: Serializable) -> None:
    print(obj.to_json())

# User doesn't extend Serializable, but satisfies it structurally
save(User("Alice"))
```

## Gotchas

- With `ABC`, failing to implement every abstract method raises `TypeError` only at instantiation, not at class definition time
- `Protocol` is checked by static type checkers (mypy, pyright) but is not enforced at runtime unless combined with `runtime_checkable` and `isinstance`
- `@runtime_checkable` on a `Protocol` only checks that the methods exist — it does not verify their signatures
