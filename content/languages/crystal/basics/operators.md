---
title: "Operators"
language: "crystal"
feature: "operators"
category: "basics"
applicable: true
---

Crystal operators are Ruby-inspired and largely what you'd expect from a C-family language. Most operators are actually method calls and can be overloaded by defining methods. The `//` operator performs floor division. `**` is exponentiation. `&` prefix operators (`&+`, `&*`) are wrapping arithmetic that silently wraps on overflow. The `!` suffix on methods is a naming convention, not an operator.

## Example

```crystal
# Arithmetic
10 + 3   # => 13
10 - 3   # => 7
10 * 3   # => 30
10 / 3   # => 3     (integer division when both Int)
10 // 3  # => 3     (explicit floor division)
10 % 3   # => 1
2 ** 10  # => 1024
-7 // 2  # => -4    (floor division, not truncation)

# Comparison
1 <=> 2  # => -1   (spaceship / three-way)
1 == 1   # => true
"a" != "b" # => true

# Boolean
true && false  # => false
true || false  # => true
!true          # => false

# Bitwise
0b1010 & 0b1100  # => 0b1000 (8)
0b1010 | 0b1100  # => 0b1110 (14)
1 << 4           # => 16

# Wrapping arithmetic (no overflow exception)
Int32::MAX &+ 1  # wraps to Int32::MIN

# String operators
"hello " + "world"   # => "hello world"
"ha" * 3             # => "hahaha"
```

## Gotchas

- `/` between two integers performs integer division in Crystal (unlike Python 3 where it always returns a float).
- Operator overloading is done by defining a method with the operator name: `def +(other)`.
- `===` is the case equality operator used in `case/when`; it is not the same as JavaScript's `===`.
