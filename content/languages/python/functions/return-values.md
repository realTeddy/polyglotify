---
title: "Return Values"
language: "python"
feature: "return-values"
category: "functions"
applicable: true
---

A Python function returns a value with the `return` statement and implicitly returns `None` when no `return` is reached. Python makes returning multiple values ergonomic by automatically packing them into a tuple, which the caller can unpack.

## Example

```python
# Single return value
def square(n: int) -> int:
    return n * n

# Implicit None return
def log(msg: str) -> None:
    print(msg)
    # no return statement — returns None

# Multiple return values (packed as a tuple)
def min_max(numbers: list[int]) -> tuple[int, int]:
    return min(numbers), max(numbers)

low, high = min_max([3, 1, 4, 1, 5, 9])
print(low, high)  # 1 9

# Early return
def find(items, target):
    for i, item in enumerate(items):
        if item == target:
            return i   # early exit
    return -1          # sentinel value

# Generator function (returns an iterator, not a value)
def countdown(n: int):
    while n > 0:
        yield n
        n -= 1

for tick in countdown(3):
    print(tick)  # 3, 2, 1
```

## Gotchas

- A function that "returns multiple values" actually returns a single tuple — callers can unpack it, but it is one object
- Forgetting to handle the `None` return from a void function causes `AttributeError` or `TypeError` if you try to use the result
- `yield` transforms a function into a generator; mixing `return <value>` and `yield` in the same function is valid in Python 3 but can be confusing
