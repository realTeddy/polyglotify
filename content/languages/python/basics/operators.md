---
title: "Operators"
language: "python"
feature: "operators"
category: "basics"
applicable: true
---

Python provides arithmetic, comparison, logical, bitwise, and assignment operators. It also includes some operators not found in many other languages, such as `//` for floor division, `**` for exponentiation, and `in` / `not in` for membership testing.

## Example

```python
# Arithmetic
x = 10 + 3   # 13
y = 10 - 3   # 7
z = 10 * 3   # 30
q = 10 / 3   # 3.3333... (always float)
f = 10 // 3  # 3 (floor division)
r = 10 % 3   # 1 (modulo)
p = 2 ** 8   # 256 (exponentiation)

# Comparison
print(5 == 5)   # True
print(5 != 4)   # True
print(3 < 5 < 10)  # True (chained comparison)

# Logical
print(True and False)  # False
print(True or False)   # True
print(not True)        # False

# Membership and identity
items = [1, 2, 3]
print(2 in items)      # True
print(4 not in items)  # True
print(items is items)  # True (same object)

# Augmented assignment
count = 0
count += 1  # count is now 1
```

## Gotchas

- `/` always returns a `float` in Python 3, even for two integers — use `//` when you need integer division
- `==` compares value; `is` compares object identity — never use `is` to compare integers or strings in general
- Chained comparisons like `1 < x < 10` are valid and mean what they say mathematically, unlike in most other languages
