---
title: "Return Values"
language: "haskell"
feature: "return-values"
category: "functions"
applicable: true
---

Every Haskell function returns exactly one value. "Multiple returns" are expressed via tuples, `Maybe`, `Either`, or custom ADTs. There is no `return` statement; the last expression in a definition is the result. In monadic code, `return` (or `pure`) wraps a value in a monad.

## Example

```haskell
-- Single return value
double :: Int -> Int
double x = x * 2  -- x * 2 is the result

-- "Multiple returns" via tuple
minMax :: [Int] -> (Int, Int)
minMax xs = (minimum xs, maximum xs)

lo, hi = let (a, b) = minMax [3,1,4,1,5] in (a, b)
-- (1, 5)

-- Optional return with Maybe
safeSqrt :: Double -> Maybe Double
safeSqrt x
    | x < 0    = Nothing
    | otherwise = Just (sqrt x)

-- Error + value with Either
safeDiv :: Int -> Int -> Either String Int
safeDiv _ 0 = Left "division by zero"
safeDiv x y = Right (x `div` y)

case safeDiv 10 2 of
    Left  err -> putStrLn $ "Error: " ++ err
    Right val -> print val   -- 5

-- Returning IO actions (return in do-notation)
getName :: IO String
getName = do
    putStr "Name: "
    line <- getLine
    return line   -- 'return' wraps the String in IO, not a statement

-- Using pure (equivalent to return for Applicative)
doubled :: IO [Int]
doubled = pure (map (*2) [1..5])
```

## Gotchas

- `return` in Haskell is **not** a control-flow statement; it is `pure :: a -> m a` and does not exit a function
- Tuples are the idiomatic way to return multiple values; keep them small (2–3 elements) or use a named record
- `Either String a` is the standard error-return type; `Left` carries the error, `Right` carries the success value
