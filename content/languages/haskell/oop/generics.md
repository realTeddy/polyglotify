---
title: "Generics"
language: "haskell"
feature: "generics"
category: "oop"
applicable: true
---

Haskell's type system is inherently generic via **parametric polymorphism** (type variables) and **type class constraints**. The `GHC.Generics` extension additionally provides structural generics for deriving boilerplate automatically.

## Example

```haskell
-- Parametric polymorphism (unconstrained generic)
identity :: a -> a
identity x = x

swap :: (a, b) -> (b, a)
swap (x, y) = (y, x)

-- Constrained generic (type class bounds)
largest :: Ord a => [a] -> a
largest = foldl1 max

showAndPrint :: Show a => a -> IO ()
showAndPrint x = putStrLn (show x)

-- Generic data structure
data Pair a b = Pair a b deriving (Show)

mapFst :: (a -> c) -> Pair a b -> Pair c b
mapFst f (Pair x y) = Pair (f x) y

-- Higher-kinded type variable (kind: * -> *)
class MyFunctor f where
    myFmap :: (a -> b) -> f a -> f b

data Box a = Box a deriving (Show)
instance MyFunctor Box where
    myFmap f (Box x) = Box (f x)

-- GHC.Generics: derive boilerplate structurally
{-# LANGUAGE DeriveGeneric #-}
import GHC.Generics (Generic)
import Data.Aeson   (ToJSON, FromJSON)

data User = User { userName :: String, userAge :: Int }
    deriving (Show, Generic)

instance ToJSON   User  -- derived generically
instance FromJSON User  -- derived generically
```

## Gotchas

- Haskell generics are **monomorphised at compile time** by GHC (like C++ templates); there is no runtime type erasure for parametric functions
- `GHC.Generics` structural generics are distinct from parametric polymorphism; they inspect the shape of a type at compile time
- Higher-kinded type variables (`f :: * -> *`) enable abstractions like `Functor`, `Monad`, and `Foldable` that are impossible in most OOP generics systems
