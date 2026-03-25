---
title: "Maps & Dictionaries"
language: "haskell"
feature: "maps"
category: "data-structures"
applicable: true
---

`Data.Map.Strict` (ordered, O(log n)) and `Data.HashMap.Strict` from `unordered-containers` (hash-based, O(1) average) are the standard map types. Both are immutable; operations return new maps.

## Example

```haskell
import qualified Data.Map.Strict as Map

-- Construction
empty :: Map.Map String Int
empty = Map.empty

fromList :: Map.Map String Int
fromList = Map.fromList [("alice", 30), ("bob", 25), ("carol", 28)]

-- Lookup
age :: Maybe Int
age = Map.lookup "alice" fromList  -- Just 30

missing :: Maybe Int
missing = Map.lookup "dave" fromList  -- Nothing

-- Insert / update (returns a new map)
updated :: Map.Map String Int
updated = Map.insert "dave" 22 fromList

-- Delete
deleted :: Map.Map String Int
deleted = Map.delete "bob" fromList

-- Adjust (update existing key)
adjusted :: Map.Map String Int
adjusted = Map.adjust (+1) "alice" fromList  -- alice -> 31

-- Fold and map over values
total :: Int
total = Map.foldl' (+) 0 fromList

doubled :: Map.Map String Int
doubled = Map.map (*2) fromList

-- Conversion
keys   :: [String]   = Map.keys   fromList
values :: [Int]      = Map.elems  fromList
pairs  :: [(String,Int)] = Map.toList fromList

-- Union (left-biased on collision)
m1 = Map.fromList [("a", 1), ("b", 2)]
m2 = Map.fromList [("b", 99), ("c", 3)]
union = Map.union m1 m2  -- fromList [("a",1),("b",2),("c",3)]
```

## Gotchas

- `Map.lookup` returns `Maybe v`; use `Map.findWithDefault` to supply a default value without unwrapping
- `Data.Map.Strict` evaluates values to WHNF on insertion; use `Data.Map.Lazy` only if values are expensive and rarely accessed
- Import qualified (`import qualified Data.Map.Strict as Map`) to avoid clashing with `Prelude` names
