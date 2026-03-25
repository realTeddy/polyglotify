---
title: "Sets"
language: "haskell"
feature: "sets"
category: "data-structures"
applicable: true
---

`Data.Set` (ordered, balanced BST, O(log n)) and `Data.HashSet` from `unordered-containers` (O(1) average) are the standard set types. Both require elements to have `Ord` (or `Hashable` + `Eq`) instances.

## Example

```haskell
import qualified Data.Set as Set

-- Construction
s1 :: Set.Set Int
s1 = Set.fromList [3, 1, 4, 1, 5, 9, 2, 6]
-- Set.fromList [1,2,3,4,5,6,9]  (duplicates removed, sorted)

s2 :: Set.Set Int
s2 = Set.fromList [2, 4, 6, 8, 10]

-- Membership (O(log n))
Set.member 3 s1   -- True
Set.member 7 s1   -- False

-- Insert / delete (returns new set)
s3 = Set.insert 7 s1
s4 = Set.delete 1 s1

-- Set operations
union    = Set.union        s1 s2  -- all elements
inter    = Set.intersection s1 s2  -- common elements: {2,4,6}
diff     = Set.difference   s1 s2  -- in s1 but not s2: {1,3,5,9}

-- Predicates
Set.isSubsetOf (Set.fromList [2,4]) s2  -- True
Set.null Set.empty                       -- True
Set.size s1                              -- 8

-- Conversion
list = Set.toList      s1  -- sorted list
asc  = Set.toAscList   s1
desc = Set.toDescList  s1

-- Fold
total = Set.foldl' (+) 0 s1
```

## Gotchas

- `Data.Set` requires `Ord`; for types without a natural ordering, derive or implement `Ord` or use `HashSet`
- Import qualified to avoid name clashes with `Prelude` (`map`, `filter`, `null`, etc.)
- `Set.toList` returns elements in ascending order — a useful property compared to hash sets
