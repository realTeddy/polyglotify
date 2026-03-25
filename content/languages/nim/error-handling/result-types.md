---
title: "Result Types"
language: "nim"
feature: "result-types"
category: "error-handling"
applicable: true
---

Nim doesn't have a built-in `Result` type, but the popular `results` package (by Araq) provides `Result[T, E]` with `ok`, `err`, `isOk`, `get`, and `?` (propagation) operators. Alternatively, Nim's `Option[T]` from `std/options` handles the nullable case. Exception-based and result-based styles can coexist.

## Example

```nim
import std/options

# Option[T] — for nullable values
proc findFirst(pred: proc(x: int): bool, nums: seq[int]): Option[int] =
  for n in nums:
    if pred(n): return some(n)
  none(int)

let found = findFirst(x => x > 3, @[1, 2, 3, 4, 5])
if found.isSome:
  echo "Found: ", found.get()
else:
  echo "Not found"

# Using get with default
echo found.get(0)
echo findFirst(x => x > 10, @[1,2,3]).get(-1)

# Option chaining with map/flatMap
let doubled = found.map(x => x * 2)
echo doubled

# results package (install with nimble install results)
# import results
# proc parsePort(s: string): Result[uint16, string] =
#   try:
#     let n = s.parseInt
#     if n < 1 or n > 65535: return err("port out of range")
#     ok(uint16(n))
#   except ValueError:
#     err("not a number")
#
# let r = parsePort("8080")
# if r.isOk: echo r.get()
# else: echo r.error()
```

## Gotchas

- `Option[T].get()` raises an exception if the option is `None`; always check `isSome` first or use `get(default)`.
- The `results` package is a third-party library; install with `nimble install results`.
- For new code, consider whether exceptions or result types are more idiomatic for your use case; Nim supports both.
