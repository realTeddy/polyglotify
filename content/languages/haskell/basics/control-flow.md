---
title: "Control Flow"
language: "haskell"
feature: "control-flow"
category: "basics"
applicable: true
---

Haskell replaces imperative control flow with expressions. `if/then/else` is an expression, not a statement. Pattern matching and guards handle branching more idiomatically. Recursion replaces loops; `map`, `filter`, and `fold` replace most iteration.

## Example

```haskell
-- if/then/else (both branches required, both must have the same type)
absolute :: Int -> Int
absolute n = if n < 0 then -n else n

-- Guards (cleaner multi-way branching)
classify :: Int -> String
classify n
    | n < 0     = "negative"
    | n == 0    = "zero"
    | n < 10    = "small"
    | otherwise = "large"

-- Pattern matching
describe :: [Int] -> String
describe []     = "empty list"
describe [x]    = "singleton: " ++ show x
describe (x:_)  = "starts with " ++ show x

-- Case expression
describeCase :: Int -> String
describeCase n = case n `mod` 3 of
    0 -> "divisible by 3"
    1 -> "remainder 1"
    _ -> "remainder 2"

-- Recursion instead of loops
factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)

-- List comprehension (declarative iteration)
evens :: [Int]
evens = [x | x <- [1..20], even x]

-- Higher-order iteration
doubled :: [Int]
doubled = map (*2) [1..5]

sumOfSquares :: Int
sumOfSquares = foldl (+) 0 (map (^2) [1..10])
```

## Gotchas

- `if/then/else` is an expression; omitting `else` is a type error
- `otherwise` in guards is just `True`; the last guard should always be `otherwise` to be exhaustive
- Non-exhaustive patterns produce a runtime error; use `-Wincomplete-patterns` to catch them at compile time
