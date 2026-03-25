---
title: "Tuples"
language: "python"
feature: "tuples"
category: "data-structures"
applicable: true
---

A `tuple` is an immutable, ordered sequence. Tuples are commonly used to group related values together, return multiple values from a function, and as dictionary keys (since they are hashable). Named tuples add field names without the overhead of a full class.

## Example

```python
# Creating tuples
point    = (3, 4)
rgb      = (255, 128, 0)
single   = (42,)   # trailing comma required for single-element tuple
empty    = ()

# Indexing and slicing (same as list)
print(point[0])    # 3
print(rgb[1:])     # (128, 0)

# Unpacking
x, y = point
r, g, b = rgb

# Extended unpacking
first, *rest = (1, 2, 3, 4, 5)
print(first)  # 1
print(rest)   # [2, 3, 4, 5]

# Tuples as dict keys (immutable = hashable)
grid = {(0, 0): "start", (9, 9): "end"}

# Named tuples — lightweight record type
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)   # 3 4
print(p)          # Point(x=3, y=4)

# typing.NamedTuple — typed, class-based syntax
from typing import NamedTuple
class Coordinate(NamedTuple):
    lat: float
    lon: float
    label: str = "unknown"
```

## Gotchas

- `(42)` is just `42` in parentheses, not a tuple — you need the trailing comma: `(42,)`
- Tuples are immutable, but if a tuple contains a mutable element (like a list), that element can still be mutated
- Tuple concatenation (`t1 + t2`) creates a new tuple; it does not modify either original
