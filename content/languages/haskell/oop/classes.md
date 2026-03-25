---
title: "Classes"
language: "haskell"
feature: "classes"
category: "oop"
applicable: false
---

Haskell has no object-oriented classes. The `class` keyword in Haskell defines a **type class** — an interface (set of operations) that types can implement. This is closer to Rust traits or Java interfaces than to Java/Python classes.

The equivalent of a class with data and methods is achieved by combining a **data type** (for state) with **functions** (for behaviour), optionally grouped in a module.

## Example

```haskell
-- Type class: defines an interface
class Describable a where
    describe :: a -> String

-- Data type: holds state
data Circle = Circle { radius :: Double }
data Square = Square { side   :: Double }

-- Instance: implements the interface for a specific type
instance Describable Circle where
    describe c = "Circle with radius " ++ show (radius c)

instance Describable Square where
    describe s = "Square with side " ++ show (side s)

-- Polymorphic function works for any Describable
printDescription :: Describable a => a -> IO ()
printDescription x = putStrLn (describe x)

printDescription (Circle 5.0)
-- Circle with radius 5.0
printDescription (Square 3.0)
-- Square with side 3.0

-- "Object with methods" as a module + data type
data Counter = Counter { count :: Int }

increment :: Counter -> Counter
increment c = c { count = count c + 1 }

reset :: Counter -> Counter
reset _ = Counter { count = 0 }

-- Usage
c0 = Counter 0
c1 = increment c0
c2 = increment c1
print (count c2)  -- 2
```

## Gotchas

- Haskell type classes are resolved at compile time via dictionary passing; there is no runtime vtable dispatch (unless using `ExistentialQuantification`)
- Haskell deliberately separates data (types) from behaviour (functions); this avoids the "banana/gorilla/jungle" problem of OOP
- For open dispatch at runtime, use `Data.Dynamic` or existential types
