---
title: "Inheritance"
language: "haskell"
feature: "inheritance"
category: "oop"
applicable: false
---

Haskell has no class inheritance. Instead, it uses **type class superclasses** (one type class requiring another) and **algebraic data types with shared constructors**. Behaviour reuse is achieved through composition, not inheritance.

## Example

```haskell
-- Type class hierarchy (superclass constraint)
-- Eq is a superclass of Ord: if you implement Ord, you must also implement Eq
class Eq a => Ord a where
    compare :: a -> a -> Ordering
    (<)  :: a -> a -> Bool
    (<=) :: a -> a -> Bool
    -- etc.

-- Defining a type class that extends another
class (Show a, Eq a) => Printable a where
    prettyPrint :: a -> String
    prettyPrint = show  -- default implementation

data Color = Red | Green | Blue deriving (Show, Eq)

instance Printable Color where
    prettyPrint Red   = "red"
    prettyPrint Green = "green"
    prettyPrint Blue  = "blue"

-- Composition instead of inheritance
data Animal = Animal { animalName :: String, sound :: String }
data Pet    = Pet    { animal :: Animal, ownerName :: String }

-- Delegation (explicit, not automatic)
speak :: Pet -> String
speak p = animalName (animal p) ++ " says " ++ sound (animal p)

-- "Mixin" via type class default methods
class Named a where
    name :: a -> String
    greeting :: a -> String
    greeting x = "Hello, I'm " ++ name x  -- default uses name

data Person = Person { personName :: String }
instance Named Person where
    name = personName
-- greeting (Person "Alice") == "Hello, I'm Alice"
```

## Gotchas

- Type class superclasses express interface dependencies, not data sharing; they do not inherit method implementations (only default methods provide reuse)
- Haskell avoids the fragile base class problem by making all data immutable and composition explicit
- For data reuse without inheritance, embed types as record fields and write delegating functions
