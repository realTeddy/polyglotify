---
title: "Arrays & Lists"
language: "haskell"
feature: "arrays"
category: "data-structures"
applicable: true
---

Haskell's standard list `[a]` is a singly-linked list, ideal for sequential processing but O(n) for indexed access. For array-like performance, use `Data.Array` (immutable, boxed), `Data.Vector` (immutable, efficient), or `Data.Vector.Unboxed` (primitive types, cache-friendly).

## Example

```haskell
import Data.List (sort, nub, group)

-- Linked list literals
nums :: [Int]
nums = [1, 2, 3, 4, 5]

-- Cons and deconstruction
oneToFive :: [Int]
oneToFive = 1 : 2 : 3 : 4 : 5 : []

-- Head and tail (unsafe on empty list!)
first :: Int
first = head nums  -- 1

rest :: [Int]
rest = tail nums   -- [2,3,4,5]

-- Safe access
safeHead :: [a] -> Maybe a
safeHead []    = Nothing
safeHead (x:_) = Just x

-- Ranges
r1 = [1..10]        -- [1,2,3,...,10]
r2 = [1,3..10]      -- [1,3,5,7,9]
r3 = take 5 [1..]   -- [1,2,3,4,5] (infinite list, lazily evaluated)

-- List operations
len    = length nums          -- 5
total  = sum nums             -- 15
sorted = sort [3,1,4,1,5]    -- [1,1,3,4,5]
unique = nub  [1,1,2,2,3]    -- [1,2,3]
zipped = zip [1,2,3] ["a","b","c"]  -- [(1,"a"),(2,"b"),(3,"c")]

-- Data.Vector for O(1) indexed access
import qualified Data.Vector as V
v :: V.Vector Int
v = V.fromList [10, 20, 30]
-- v V.! 1 == 20
-- V.length v == 3
```

## Gotchas

- `head []` and `tail []` throw runtime exceptions; prefer pattern matching or `safeHead` from `safe` package
- Linked lists have O(n) `length` and O(n) indexing with `!!`; use `Vector` when you need random access
- Infinite lists are fine thanks to lazy evaluation; `take n [1..]` does not evaluate the whole list
