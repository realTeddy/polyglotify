---
title: "Types & Type Systems"
language: "haskell"
feature: "types"
category: "basics"
applicable: true
---

Haskell has a powerful static, strong, and inferred type system based on Hindley-Milner. Every expression has a type known at compile time. Polymorphism is expressed via type variables and type classes. `newtype` and `type` provide type aliases and wrappers with zero runtime cost.

## Example

```haskell
-- Basic types
name   :: String
name   = "Alice"

age    :: Int
age    = 30

height :: Double
height = 1.75

flag   :: Bool
flag   = True

-- Type aliases
type Name = String
type Age  = Int

-- newtype wrapper (zero-cost, distinct type)
newtype Email = Email String
  deriving (Show, Eq)

-- Algebraic Data Types (ADT)
data Shape
    = Circle Double          -- radius
    | Rectangle Double Double -- width height
    deriving (Show)

area :: Shape -> Double
area (Circle r)      = pi * r * r
area (Rectangle w h) = w * h

-- Type variables (polymorphism)
identity :: a -> a
identity x = x

-- Maybe type (built-in)
safeDiv :: Int -> Int -> Maybe Int
safeDiv _ 0 = Nothing
safeDiv x y = Just (x `div` y)
```

## Gotchas

- `Int` is a fixed-width machine integer; use `Integer` for arbitrary precision
- `String` is `[Char]` (a list of characters); for performance use `Data.Text`
- Type inference is powerful but error messages can be cryptic; add explicit signatures to top-level bindings
