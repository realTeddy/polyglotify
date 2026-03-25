---
title: "Return Values"
language: "nim"
feature: "return-values"
category: "functions"
applicable: true
---

Nim functions return the value of the last expression, values assigned to the implicit `result` variable, or via explicit `return`. Multiple return values use tuples. A procedure with no return type is implicitly `void`. The `result` variable is pre-initialized to the zero value of the return type and is always available inside the function body.

## Example

```nim
# Implicit return (last expression)
proc double(x: int): int =
  x * 2

# Explicit return
proc safeDivide(a, b: float): float =
  if b == 0.0:
    return float.NaN
  a / b

# result variable
proc sumList(nums: seq[int]): int =
  # result is 0 (zero-initialized) automatically
  for n in nums:
    result += n  # no explicit return needed

# Tuple for multiple return values
proc minMax(nums: seq[int]): (int, int) =
  var lo = nums[0]
  var hi = nums[0]
  for n in nums:
    if n < lo: lo = n
    if n > hi: hi = n
  (lo, hi)

# Destructure tuple return
let (minimum, maximum) = minMax(@[3, 1, 4, 1, 5, 9, 2])
echo "min=", minimum, " max=", maximum

echo double(7)
echo safeDivide(10.0, 3.0)
echo sumList(@[1, 2, 3, 4, 5])
```

## Gotchas

- The `result` variable is always the zero value of the return type at function entry; you don't need to initialize it.
- `return` without a value returns the current value of `result`.
- Returning a tuple is idiomatic for multiple values; destructuring with `let (a, b) = f()` is clean.
