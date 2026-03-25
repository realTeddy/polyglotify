---
title: "Sets"
language: "nim"
feature: "sets"
category: "data-structures"
applicable: true
---

Nim has two set types: the built-in `set[T]` (a bit set, only works for small ordinal types like enums or `char`) and `HashSet[T]` from `std/sets` for general hash-based sets. `set[T]` is extremely efficient (stored as a bitfield) but is limited to types with at most 2^16 values. `HashSet` works with any hashable type.

## Example

```nim
import std/sets

# Built-in set (for small ordinals — enums, char, small ints)
type Weekday = enum Mon, Tue, Wed, Thu, Fri, Sat, Sun
var workdays: set[Weekday] = {Mon, Tue, Wed, Thu, Fri}

echo Mon in workdays    # true
echo Sat in workdays    # false
workdays.incl(Sat)
workdays.excl(Mon)

let weekend = {Sat, Sun}
echo workdays * weekend   # intersection: {Sat}
echo workdays + weekend   # union
echo workdays - {Sat}     # difference

# HashSet — general purpose
var hs = initHashSet[string]()
hs.incl("apple")
hs.incl("banana")
hs.incl("apple")   # duplicate, ignored

echo hs.len          # 2
echo "apple" in hs   # true

# From sequence
let fruits = ["apple", "banana", "cherry"].toHashSet
echo fruits.len

# Set operations on HashSet
let s1 = [1, 2, 3, 4].toHashSet
let s2 = [3, 4, 5, 6].toHashSet
echo s1 * s2         # intersection: {3, 4}
echo s1 + s2         # union
echo s1 - s2         # difference: {1, 2}
```

## Gotchas

- Built-in `set[T]` only works for ordinal types with values fitting in 2^16 bits; `set[int]` is not allowed.
- `HashSet` requires elements to implement the `hash` function; custom types need `hash` defined.
- Use `{Mon, Tue}` literal syntax for built-in sets; use `initHashSet` + `incl` for `HashSet`.
