---
title: "Variables & Declaration"
language: "crystal"
feature: "variables"
category: "basics"
applicable: true
---

Crystal uses type inference, so variable types are determined at compile time without explicit annotations in most cases. Local variables use `snake_case`. Constants use `SCREAMING_SNAKE_CASE` or `PascalCase`. Crystal is statically typed — once a variable's type is inferred, it cannot change. Uninitialized variables are not allowed; every variable must be assigned before use.

## Example

```crystal
# Local variable — type inferred as Int32
x = 42
name = "Alice"
flag = true

# Type annotation (optional when type can be inferred)
score : Float64 = 3.14

# Constants
MAX_SIZE = 100
Pi = 3.14159

# Nilable variable (union with Nil)
maybe : String? = nil   # same as String | Nil
maybe = "hello"

# Multiple assignment
a, b, c = 1, 2, 3
first, *rest = [1, 2, 3, 4]  # splat
```

## Gotchas

- Crystal variables are not nilable by default; use `Type?` (shorthand for `Type | Nil`) to allow `nil`.
- Reassigning a variable to a different type widens its inferred type to a union; the compiler tracks all possible types.
- Constants must be defined at the top level or inside a type — not inside methods.
