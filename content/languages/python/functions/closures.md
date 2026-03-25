---
title: "Closures & Lambdas"
language: "python"
feature: "closures"
category: "functions"
applicable: true
---

A closure is an inner function that captures variables from its enclosing scope. Python also has `lambda` for single-expression anonymous functions. The `nonlocal` keyword allows an inner function to rebind (not just read) a variable from the enclosing scope.

## Example

```python
# Closure — inner function captures `factor`
def make_multiplier(factor):
    def multiply(x):
        return x * factor   # `factor` is captured
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)
print(double(5))  # 10
print(triple(5))  # 15

# nonlocal — rebind an enclosing variable
def make_counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment

counter = make_counter()
print(counter())  # 1
print(counter())  # 2

# lambda — anonymous single-expression function
square = lambda x: x * x
print(square(4))  # 16

# Lambdas are common with sorted(), map(), filter()
names = ["Charlie", "Alice", "Bob"]
names.sort(key=lambda n: n.lower())
print(names)  # ['Alice', 'Bob', 'Charlie']
```

## Gotchas

- Closures capture variables by reference, not by value — a classic loop bug: `funcs = [lambda: i for i in range(3)]` all return `2`; fix with a default argument `lambda i=i: i`
- `lambda` is limited to a single expression — use a named `def` for anything more complex
- Without `nonlocal`, assigning to an enclosing variable inside an inner function creates a new local variable instead, raising an `UnboundLocalError` if you read it before assigning
