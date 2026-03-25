---
title: "Generics"
language: "python"
feature: "generics"
category: "oop"
applicable: true
---

Python generics are expressed through the `typing` module. `TypeVar` defines a placeholder type parameter, and classes inherit from `Generic[T]` to be parameterised. Python 3.12 introduced a cleaner `type` statement and `[T]` syntax. Generics are enforced by static type checkers, not at runtime.

## Example

```python
from typing import Generic, TypeVar

T = TypeVar("T")
K = TypeVar("K")
V = TypeVar("V")

# Generic class
class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

    def peek(self) -> T:
        return self._items[-1]

    def __len__(self) -> int:
        return len(self._items)

stack: Stack[int] = Stack()
stack.push(1)
stack.push(2)
print(stack.pop())   # 2

# Generic function
def first(items: list[T]) -> T:
    return items[0]

print(first([10, 20, 30]))   # 10
print(first(["a", "b"]))     # "a"

# Bounded TypeVar — only accepts subtypes of a base class
from typing import TypeVar
Numeric = TypeVar("Numeric", int, float)

def add(a: Numeric, b: Numeric) -> Numeric:
    return a + b

# Python 3.12+ syntax (no TypeVar boilerplate)
# def first[T](items: list[T]) -> T:
#     return items[0]
```

## Gotchas

- Generic type parameters exist only for static analysis — at runtime `Stack[int]` and `Stack[str]` are the same class; there is no runtime type enforcement
- Use `TypeVar` with `bound=` to restrict a type variable to subclasses of a given class: `T = TypeVar("T", bound=Comparable)`
- Built-in collection types (`list`, `dict`, `set`, `tuple`) are directly subscriptable as generics in Python 3.9+; for older versions import `List`, `Dict`, etc. from `typing`
