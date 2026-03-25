---
title: "Interfaces & Traits"
language: "haskell"
feature: "interfaces"
category: "oop"
applicable: true
---

**Type classes** are Haskell's mechanism for interfaces and polymorphism. A type class declares a set of operations; `instance` declarations implement them for specific types. This is more powerful than OOP interfaces because type classes support default implementations, multi-parameter type classes, and functional dependencies.

## Example

```haskell
-- Defining a type class (interface)
class Container f where
    empty  :: f a
    insert :: a -> f a -> f a
    toList :: f a -> [a]
    size   :: f a -> Int
    size   = length . toList  -- default implementation

-- Implementing for a list-based stack
newtype Stack a = Stack [a] deriving (Show)

instance Container Stack where
    empty              = Stack []
    insert x (Stack xs) = Stack (x:xs)
    toList (Stack xs)   = xs

-- Implementing for a simple queue
newtype Queue a = Queue [a] deriving (Show)

instance Container Queue where
    empty              = Queue []
    insert x (Queue xs) = Queue (xs ++ [x])
    toList (Queue xs)   = xs

-- Polymorphic function over any Container
fillAndCount :: Container f => [a] -> f a -> Int
fillAndCount xs c = size (foldl (flip insert) c xs)

-- Standard type classes
-- Eq, Ord, Show, Read, Functor, Foldable, Traversable ...
data Tree a = Leaf | Node (Tree a) a (Tree a)

instance Functor Tree where
    fmap _ Leaf         = Leaf
    fmap f (Node l x r) = Node (fmap f l) (f x) (fmap f r)

-- Multiple constraints
printSorted :: (Show a, Ord a) => [a] -> IO ()
printSorted = mapM_ print . Data.List.sort
```

## Gotchas

- Type class instances are selected by the **type**, not the value; there can be at most one instance per type per class (orphan instances need `{-# LANGUAGE OrphanInstances #-}` and are discouraged)
- Default method implementations can be overridden per instance
- `{-# MINIMAL #-}` pragma documents which methods must be implemented for a minimal complete definition
