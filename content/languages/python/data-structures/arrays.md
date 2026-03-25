---
title: "Arrays & Lists"
language: "python"
feature: "arrays"
category: "data-structures"
applicable: true
---

Python's primary ordered, mutable sequence type is the built-in `list`. Lists are dynamic arrays that can hold items of any type and grow or shrink automatically. List comprehensions provide a concise, idiomatic way to build and transform lists.

## Example

```python
# Creating lists
fruits = ["apple", "banana", "cherry"]
mixed  = [1, "two", 3.0, True]
empty  = []

# Indexing and slicing
print(fruits[0])    # "apple"
print(fruits[-1])   # "cherry"
print(fruits[1:3])  # ["banana", "cherry"]
print(fruits[::-1]) # reversed copy

# Mutating
fruits.append("date")          # add to end
fruits.insert(1, "avocado")    # insert at index
fruits.remove("banana")        # remove first match
popped = fruits.pop()          # remove & return last

# Common operations
print(len(fruits))             # length
print("apple" in fruits)       # membership test
fruits.sort()                  # sort in-place
sorted_copy = sorted(fruits)   # non-mutating sort

# List comprehension
squares = [x ** 2 for x in range(10)]
evens   = [x for x in range(20) if x % 2 == 0]

# Nested comprehension
matrix = [[i * j for j in range(1, 4)] for i in range(1, 4)]
```

## Gotchas

- `list2 = list1` does NOT copy the list — both names point to the same object; use `list2 = list1.copy()` or `list2 = list1[:]`
- `list * n` repeats references, not deep copies — `[[]] * 3` gives three references to the same inner list
- `list.sort()` sorts in-place and returns `None`; `sorted(list)` returns a new list and leaves the original unchanged
