---
title: "Structs & Classes"
language: "python"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Python has no separate struct type. Lightweight, immutable record-like structures are best expressed with `dataclasses` (Python 3.7+) or `typing.NamedTuple`. `dataclass` automatically generates `__init__`, `__repr__`, and `__eq__`, making it the idiomatic replacement for simple C-style structs.

## Example

```python
from dataclasses import dataclass, field

@dataclass
class Point:
    x: float
    y: float

p = Point(1.0, 2.5)
print(p)          # Point(x=1.0, y=2.5)
print(p.x)        # 1.0

# Default values
@dataclass
class Config:
    host: str = "localhost"
    port: int = 5432
    tags: list[str] = field(default_factory=list)  # mutable default

# Frozen dataclass — immutable like a struct
@dataclass(frozen=True)
class Vector:
    x: float
    y: float

v = Vector(3.0, 4.0)
# v.x = 1.0  # raises FrozenInstanceError

# Typed NamedTuple — immutable and indexable
from typing import NamedTuple
class Color(NamedTuple):
    r: int
    g: int
    b: int

red = Color(255, 0, 0)
print(red.r, red[0])  # 255 255
```

## Gotchas

- Never use a mutable value directly as a `dataclass` field default — use `field(default_factory=list)` instead
- `@dataclass` does not provide `__hash__` by default when `eq=True` (the default); to make instances hashable set `frozen=True` or `unsafe_hash=True`
- `NamedTuple` fields are positional as well as named — instances support both `color.r` and `color[0]`
