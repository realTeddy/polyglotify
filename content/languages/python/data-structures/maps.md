---
title: "Maps & Dictionaries"
language: "python"
feature: "maps"
category: "data-structures"
applicable: true
---

Python's built-in `dict` is an ordered (since 3.7), mutable hash map. Keys must be hashable (typically strings, numbers, or tuples). Dict comprehensions and the `|` merge operator (3.9+) make working with dicts concise and expressive.

## Example

```python
# Creating dicts
person = {"name": "Alice", "age": 30}
empty  = {}
from_keys = dict.fromkeys(["a", "b", "c"], 0)  # {"a": 0, "b": 0, "c": 0}

# Access
print(person["name"])              # "Alice"
print(person.get("height", 170))   # 170 (default if missing)

# Mutation
person["email"] = "alice@example.com"
person.update({"age": 31, "city": "NYC"})
del person["city"]

# Iteration
for key in person:
    print(key)
for key, value in person.items():
    print(f"{key}: {value}")

# Membership
print("name" in person)   # True (checks keys)

# Dict comprehension
squares = {x: x ** 2 for x in range(6)}

# Merging (Python 3.9+)
defaults = {"timeout": 30, "retries": 3}
overrides = {"timeout": 10}
config = defaults | overrides   # {"timeout": 10, "retries": 3}

# setdefault and defaultdict
from collections import defaultdict
word_count = defaultdict(int)
for word in "the cat sat on the mat".split():
    word_count[word] += 1
```

## Gotchas

- Accessing a missing key with `dict[key]` raises `KeyError`; prefer `dict.get(key, default)` for safe access
- Keys must be hashable — lists and other dicts cannot be keys; use tuples instead
- Modifying a dict while iterating over it raises `RuntimeError`; iterate over a copy (`list(d.items())`) if you need to mutate during iteration
