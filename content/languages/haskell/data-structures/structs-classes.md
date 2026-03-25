---
title: "Structs & Classes"
language: "haskell"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Haskell uses **record syntax** for struct-like types (named fields on an ADT). This is a purely functional data type: "updating" a record produces a new value. Haskell's `class` keyword defines type classes (interfaces/traits), not object-oriented classes.

## Example

```haskell
-- Record type (struct equivalent)
data Person = Person
    { firstName :: String
    , lastName  :: String
    , age       :: Int
    } deriving (Show, Eq)

-- Construction
alice :: Person
alice = Person { firstName = "Alice", lastName = "Smith", age = 30 }

-- Field access (each field name is a function)
name :: String
name = firstName alice  -- "Alice"

-- Record update syntax (creates a new Person)
olderAlice :: Person
olderAlice = alice { age = age alice + 1 }

-- Pattern matching on records
greet :: Person -> String
greet Person { firstName = fn, age = a } =
    "Hello, " ++ fn ++ "! You are " ++ show a

-- Newtype for a single-field wrapper (zero overhead)
newtype UserId = UserId Int
    deriving (Show, Eq, Ord)

-- Product type (multi-constructor ADT)
data Shape
    = Circle    { radius :: Double }
    | Rectangle { width :: Double, height :: Double }
    deriving (Show)

area :: Shape -> Double
area Circle    { radius = r }   = pi * r * r
area Rectangle { width = w, height = h } = w * h
```

## Gotchas

- Record field names become functions in the module scope; duplicate names across types in the same module cause a compile error (use `{-# LANGUAGE DuplicateRecordFields #-}` to allow it)
- Record update syntax does not modify in place; it creates a new value
- For large records with frequent updates, consider using lenses (`lens` or `optics` packages)
