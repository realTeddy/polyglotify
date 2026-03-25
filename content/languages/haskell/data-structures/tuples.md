---
title: "Tuples"
language: "haskell"
feature: "tuples"
category: "data-structures"
applicable: true
---

Tuples are fixed-size, heterogeneous, immutable collections. A 2-tuple `(a, b)` is the most common. Haskell provides `fst` and `snd` for pairs; for larger tuples, pattern matching is used. For many fields, a named record is preferable.

## Example

```haskell
-- 2-tuple (pair)
point :: (Int, Int)
point = (3, 4)

fst point  -- 3
snd point  -- 4

-- 3-tuple
rgb :: (Int, Int, Int)
rgb = (255, 128, 0)

-- Heterogeneous tuple
person :: (String, Int, Bool)
person = ("Alice", 30, True)

-- Pattern matching to destructure
greet :: (String, Int) -> String
greet (name, age) = name ++ " is " ++ show age

-- Swap a pair
swap :: (a, b) -> (b, a)
swap (x, y) = (y, x)

-- zip produces a list of pairs
pairs :: [(Int, Char)]
pairs = zip [1,2,3] "abc"
-- [(1,'a'),(2,'b'),(3,'c')]

-- unzip splits a list of pairs
(ns, cs) = unzip pairs
-- ns = [1,2,3], cs = "abc"

-- zipWith3 for 3-tuples
triples = zipWith3 (\a b c -> (a,b,c)) [1,2] "ab" [True,False]
-- [(1,'a',True),(2,'b',False)]
```

## Gotchas

- Tuples beyond 2–3 elements become hard to read; define a named record instead
- Unlike lists, tuples of different lengths are **different types**: `(Int,Int)` and `(Int,Int,Int)` cannot be stored in the same list
- `fst` and `snd` only work on 2-tuples; pattern matching works on any size
