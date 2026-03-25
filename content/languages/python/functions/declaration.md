---
title: "Function Declaration"
language: "python"
feature: "declaration"
category: "functions"
applicable: true
---

Functions are defined with the `def` keyword. They are first-class objects in Python — they can be assigned to variables, passed as arguments, and returned from other functions. Type hints on parameters and return values are optional but recommended.

## Example

```python
# Basic function
def greet(name):
    return f"Hello, {name}!"

# With type hints
def add(a: int, b: int) -> int:
    return a + b

# Functions are first-class objects
def apply(func, value):
    return func(value)

def double(x):
    return x * 2

result = apply(double, 5)  # 10

# Docstring convention
def divide(a: float, b: float) -> float:
    """Divide a by b. Raises ZeroDivisionError if b is zero."""
    return a / b

# Nested functions
def outer():
    def inner():
        return "from inner"
    return inner()
```

## Gotchas

- Functions without an explicit `return` statement implicitly return `None`
- Default argument values are evaluated once at definition time, not each call — using a mutable default (e.g. `def f(x=[])`) is a classic bug
- There is no function overloading; defining a second `def` with the same name silently replaces the first
