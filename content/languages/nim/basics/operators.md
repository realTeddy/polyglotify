---
title: "Operators"
language: "nim"
feature: "operators"
category: "basics"
applicable: true
---

Nim supports standard arithmetic (`+`, `-`, `*`, `/`, `div`, `mod`), comparison (`==`, `!=`, `<`, `>`, `<=`, `>=`), logical (`and`, `or`, `not`, `xor`), and bitwise (`and`, `or`, `xor`, `not`, `shl`, `shr`) operators. Nim allows user-defined operators and has a powerful macro system. The `&` operator concatenates strings and sequences.

## Example

```nim
let a = 10
let b = 3

# Arithmetic
echo a + b       # 13
echo a - b       # 7
echo a * b       # 30
echo a / b       # 3.333... (float division)
echo a div b     # 3 (integer division)
echo a mod b     # 1 (remainder)
echo a ^ 2       # 100 (power)

# Comparison
echo a == 10     # true
echo a != b      # true
echo 1 < 2 and 2 < 3  # chained: true

# Logical (not &&/||)
echo true and false  # false
echo true or false   # true
echo not true        # false

# Bitwise (same keywords as logical but different precedence context)
echo a and b     # bitwise AND: 2
echo a or b      # bitwise OR: 11
echo a xor b     # bitwise XOR: 9
echo a shl 1     # left shift: 20
echo a shr 1     # right shift: 5

# String concatenation
let hello = "Hello" & ", " & "World!"
echo hello
```

## Gotchas

- `/` always returns a float; use `div` for integer division.
- `and`, `or`, `not` are both logical and bitwise operators depending on operand types — be careful.
- Nim supports custom operators: you can define `proc \`@@\`(a, b: int): int = a * 2 + b`.
