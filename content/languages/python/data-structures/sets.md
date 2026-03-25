---
title: "Sets"
language: "python"
feature: "sets"
category: "data-structures"
applicable: true
---

A Python `set` is an unordered collection of unique, hashable elements. Sets support fast membership testing (O(1) average) and the full suite of mathematical set operations — union, intersection, difference, and symmetric difference.

## Example

```python
# Creating sets
colors  = {"red", "green", "blue"}
numbers = set([1, 2, 2, 3, 3, 3])  # {1, 2, 3} — duplicates removed
empty   = set()                     # NOT {} — that's an empty dict

# Membership
print("red" in colors)    # True
print("yellow" in colors) # False

# Mutation
colors.add("yellow")
colors.discard("red")   # safe remove (no error if missing)
colors.remove("green")  # raises KeyError if missing
popped = colors.pop()   # removes and returns arbitrary element

# Set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)   # union:        {1, 2, 3, 4, 5, 6}
print(a & b)   # intersection: {3, 4}
print(a - b)   # difference:   {1, 2}
print(a ^ b)   # symmetric diff: {1, 2, 5, 6}

# Set comprehension
even_squares = {x ** 2 for x in range(10) if x % 2 == 0}

# frozenset — immutable, hashable set (usable as dict key)
fs = frozenset([1, 2, 3])
```

## Gotchas

- `{}` creates an empty `dict`, not an empty `set` — always use `set()` for an empty set
- Sets are unordered; you cannot index or slice them
- Elements must be hashable — you cannot put lists or dicts inside a set; use `frozenset` for a set of sets
