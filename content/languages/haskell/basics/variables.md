---
title: "Variables & Declaration"
language: "haskell"
feature: "variables"
category: "basics"
applicable: true
---

In Haskell, "variables" are immutable bindings. A name bound to a value never changes. Top-level bindings are declared with `=`; local bindings use `let` (within expressions) or `where` (attached to a definition). `let` is an expression; `where` is a declaration block.

## Example

```haskell
-- Top-level binding (immutable)
greeting :: String
greeting = "Hello, World!"

-- Local bindings with let
circleArea :: Double -> Double
circleArea r =
    let pi'  = 3.14159265
        rsq  = r * r
    in pi' * rsq

-- Local bindings with where
cylinderVolume :: Double -> Double -> Double
cylinderVolume r h = area * h
  where
    area = pi * r * r  -- pi is a standard Prelude binding

-- Pattern-matched binding
(x, y) = (3, 4)   -- destructuring tuple at top level

-- let in do-notation (used in IO and monadic code)
main :: IO ()
main = do
    let name = "Alice"
        age  = 30 :: Int
    putStrLn $ name ++ " is " ++ show age
```

## Gotchas

- There are no mutable variables; use `IORef`, `STRef`, or `MVar` when you genuinely need mutation
- `let` in `do`-notation does **not** require `in`; it binds for the rest of the `do` block
- Top-level bindings are lazily evaluated by default; be aware of space leaks with large thunks
