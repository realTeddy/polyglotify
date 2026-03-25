---
title: "Common Patterns"
language: "python"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Python has a rich set of idiomatic patterns that experienced developers rely on: comprehensions, context managers, generators, unpacking, and the use of standard library utilities like `itertools` and `functools`. Knowing these patterns is the difference between "Python that works" and "Pythonic Python".

## Example

```python
# Comprehensions (list, dict, set, generator)
squares   = [x ** 2 for x in range(10)]
index_map = {v: i for i, v in enumerate(["a", "b", "c"])}
unique_sq = {x ** 2 for x in range(-3, 4)}
gen_sq    = (x ** 2 for x in range(10))  # lazy generator

# Context managers — automatic cleanup
with open("data.txt", "r") as f:
    content = f.read()   # file is closed automatically

# Multiple context managers
with open("in.txt") as src, open("out.txt", "w") as dst:
    dst.write(src.read())

# Unpacking and star expressions
first, *middle, last = [1, 2, 3, 4, 5]
a, b = b, a   # swap without temp variable

# enumerate and zip
for i, val in enumerate(["a", "b", "c"], start=1):
    print(i, val)

for name, score in zip(["Alice", "Bob"], [95, 87]):
    print(name, score)

# Generator functions for lazy pipelines
def read_chunks(path, size=4096):
    with open(path, "rb") as f:
        while chunk := f.read(size):
            yield chunk

# itertools and functools
from itertools import chain, islice, groupby
from functools import lru_cache, partial

@lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

double = partial(pow, exp=2)  # partial application
```

## Gotchas

- Generator expressions are lazy — they only compute values on demand; consuming the generator a second time yields nothing
- `zip` stops at the shortest iterable; use `itertools.zip_longest` if you need to pair all elements
- `lru_cache` requires all arguments to be hashable — it will raise `TypeError` for list or dict arguments
