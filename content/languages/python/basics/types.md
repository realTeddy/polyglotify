---
title: "Types & Type Systems"
language: "python"
feature: "types"
category: "basics"
applicable: true
---

Python is dynamically typed — types are checked at runtime, not compile time. Since Python 3.5, optional type hints can be added for documentation and static analysis tools like mypy.

## Example

```python
# No type annotations (classic Python)
name = "Alice"
count = 42

# With type hints (Python 3.5+)
name: str = "Alice"
count: int = 42
scores: list[float] = [9.5, 8.7, 10.0]

# Type hints don't enforce anything at runtime
age: int = "not a number"  # No error at runtime!

# Common built-in types
text: str = "hello"
number: int = 42
decimal: float = 3.14
flag: bool = True
items: list[str] = ["a", "b"]
lookup: dict[str, int] = {"a": 1}
```

## Gotchas

- Type hints are completely optional and not enforced at runtime
- Use `mypy` or `pyright` for static type checking
- `None` is its own type — use `Optional[str]` or `str | None` for nullable values
