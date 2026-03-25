---
title: "Variables & Declaration"
language: "ruby"
feature: "variables"
category: "basics"
applicable: true
---

Ruby variables are dynamically typed and require no explicit declaration. Local variables use `snake_case`, instance variables are prefixed with `@`, class variables with `@@`, and global variables with `$`. Constants begin with an uppercase letter.

## Example

```ruby
# Local variable
name = "Alice"
age = 30

# Instance variable (inside a class)
@count = 0

# Class variable
@@total = 0

# Global variable
$app_name = "MyApp"

# Constant
MAX_RETRIES = 3

# Multiple assignment
x, y, z = 1, 2, 3

# Swap without temp variable
a, b = 1, 2
a, b = b, a
```

## Gotchas

- Ruby will warn but not error if you reassign a constant — it is not truly immutable
- Uninitialized local variables raise `NameError`, not `nil`
- `@@` class variables are shared across the entire inheritance hierarchy, which can cause unexpected behavior
