---
title: "Operators"
language: "julia"
feature: "operators"
category: "basics"
applicable: true
---

Julia supports standard arithmetic, comparison, logical, and bitwise operators. Notably, it has a power operator `^`, integer division `÷`, and the element-wise "dot" broadcasting operator (`.+`, `.*`, etc.) for arrays. Operators are just functions and can be overloaded. Chained comparisons like `1 < x < 10` work naturally.

## Example

```julia
a, b = 10, 3

# Arithmetic
println(a + b, a - b, a * b, a / b)   # 13 7 30 3.3333
println(a ÷ b)   # integer division: 3
println(a % b)   # remainder: 1
println(a ^ 2)   # power: 100
println(√a)      # sqrt: 3.1622...

# Comparison — chaining supported
x = 5
println(1 < x < 10)    # true
println(1 <= x == 5)   # true

# Logical
println(true && false)
println(true || false)
println(!true)

# Bitwise
println(a & b)    # 2
println(a | b)    # 11
println(a ⊻ b)    # XOR: 9

# Broadcasting (element-wise)
v = [1, 2, 3, 4]
println(v .^ 2)          # [1, 4, 9, 16]
println(v .> 2)          # [false, false, true, true]
println(v .+ 10)         # [11, 12, 13, 14]
```

## Gotchas

- `/` always produces a float; use `÷` for integer division.
- `==` tests value equality; `===` tests identity (same object in memory).
- The dot-broadcasting syntax (`.+`, `.*`) is powerful for array operations but can surprise newcomers.
