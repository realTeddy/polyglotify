---
title: "Control Flow"
language: "nim"
feature: "control-flow"
category: "basics"
applicable: true
---

Nim uses `if/elif/else`, `case`, `for`, `while`, `break`, `continue`, and `return`. Control flow constructs use significant indentation (Python-like). `case` can match ranges and sets. `for` iterates over iterators (ranges, sequences, etc.). `block` labels enable breaking from nested loops. `when` is a compile-time conditional.

## Example

```nim
# if/elif/else
let x = 7
if x > 0:
  echo "positive"
elif x < 0:
  echo "negative"
else:
  echo "zero"

# case (must be exhaustive for enum/int)
let day = 3
case day
of 1: echo "Mon"
of 2: echo "Tue"
of 3: echo "Wed"
of 4..5: echo "Thu or Fri"
else: echo "Weekend"

# for loop over range
for i in 1..5:
  echo i

# for loop over sequence
let fruits = @["apple", "banana", "cherry"]
for fruit in fruits:
  echo fruit

# for with index
for i, fruit in fruits:
  echo i, ": ", fruit

# while
var n = 0
while n < 5:
  n += 1
  if n == 3: continue
  echo n

# Labeled block for nested break
block outer:
  for i in 1..3:
    for j in 1..3:
      if i == 2 and j == 2:
        break outer
      echo i, ",", j
```

## Gotchas

- Nim uses significant indentation; inconsistent indentation is a parse error.
- `case` on integers/enums must be exhaustive or have an `else` branch, similar to Zig.
- `1..5` creates an inclusive range; `1..<5` is exclusive end (1 to 4).
