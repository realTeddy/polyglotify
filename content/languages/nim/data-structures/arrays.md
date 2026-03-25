---
title: "Arrays & Lists"
language: "nim"
feature: "arrays"
category: "data-structures"
applicable: true
---

Nim has two main sequential types: fixed-size `array[N, T]` (stack-allocated, length known at compile time) and `seq[T]` (dynamic sequence, heap-allocated, like a list or vector). `seq` is the idiomatic choice for most use cases. Nim sequences are 0-indexed and have a rich set of operations in `std/sequtils`.

## Example

```nim
import std/[sequtils, algorithm]

# Fixed array
var arr: array[5, int] = [1, 2, 3, 4, 5]
echo arr[0]          # 1
echo arr.len         # 5

# Dynamic seq
var s = @[10, 20, 30, 40, 50]

# Access
echo s[0]             # 10
echo s[^1]            # 50 (last element, ^1 index)
echo s[1..3]          # @[20, 30, 40]

# Mutate
s.add(60)
s.delete(0)
echo s

# Common operations
echo s.len
echo s.contains(20)
echo s.find(30)       # index or -1
echo s.reversed()
echo s.sorted()

# Functional style
let nums = @[1, 2, 3, 4, 5]
echo nums.map(x => x * x)
echo nums.filter(x => x mod 2 == 0)
echo nums.foldl(a + b)

# Sequence comprehension (collect)
let evens = collect:
  for x in 1..10:
    if x mod 2 == 0: x
echo evens
```

## Gotchas

- `array` has a fixed size known at compile time; use `seq` for runtime-sized collections.
- `^1` is the last element, `^2` is second-to-last — this is Nim's index-from-end syntax.
- Slicing a `seq` with `s[1..3]` returns a copy; use `toOpenArray` for zero-copy views.
