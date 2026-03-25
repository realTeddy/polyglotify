---
title: "Parameters & Arguments"
language: "haskell"
feature: "parameters"
category: "functions"
applicable: true
---

Haskell functions are automatically curried — every function takes exactly one argument. Multi-argument functions return functions. Parameters are bound by pattern matching (literals, constructors, wildcards, or variable names). There are no named or optional parameters in the language, but record syntax provides a similar effect.

## Example

```haskell
-- Multi-parameter function (actually curried)
add :: Int -> Int -> Int
add x y = x + y

-- Partial application (fix first argument)
add10 :: Int -> Int
add10 = add 10
-- add10 5 == 15

-- Pattern matching on parameters
headOrDefault :: a -> [a] -> a
headOrDefault def []    = def
headOrDefault _   (x:_) = x

-- Wildcard _ ignores an argument
const' :: a -> b -> a
const' x _ = x

-- Tuple parameter
addPair :: (Int, Int) -> Int
addPair (x, y) = x + y
-- addPair (3, 4) == 7

-- Record-style "named parameters"
data Config = Config
    { host    :: String
    , port    :: Int
    , timeout :: Int
    } deriving (Show)

defaultConfig :: Config
defaultConfig = Config { host = "localhost", port = 8080, timeout = 30 }

-- Update syntax (immutable record update)
devConfig :: Config
devConfig = defaultConfig { port = 3000, timeout = 60 }

-- as-pattern: bind the whole value and its parts
firstAndAll :: [a] -> (a, [a])
firstAndAll [] = error "empty"
firstAndAll xs@(x:_) = (x, xs)
```

## Gotchas

- Applying a curried function to too few arguments is not an error — it returns a partially applied function
- Record field names are functions in the global namespace; duplicate field names across types cause compile errors
- `@`-patterns let you name both the whole structure and its components simultaneously
