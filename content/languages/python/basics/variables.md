---
title: "Variables & Declaration"
language: "python"
feature: "variables"
category: "basics"
applicable: true
---

Variables in Python are dynamically typed. You don't need to declare a type — just assign a value. Variable names use `snake_case` by convention.

## Example

```python
# No type declaration needed
name = "Alice"
age = 30
is_active = True

# Variables can be reassigned to different types
value = 42
value = "now a string"  # This is valid

# Multiple assignment
x, y, z = 1, 2, 3

# Constants (by convention, not enforced)
MAX_RETRIES = 3
```

## Gotchas

- Python has no true constants — `MAX_RETRIES` is just a naming convention
- Variables can change type at any time, which can cause subtle bugs
- Variable names are case-sensitive: `name` and `Name` are different variables
