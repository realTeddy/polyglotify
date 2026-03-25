---
title: "Result Types"
language: "haskell"
feature: "result-types"
category: "error-handling"
applicable: true
---

`Either e a` is Haskell's built-in result type: `Right a` represents success, `Left e` represents failure. `Maybe a` is used when the error carries no information. Both are `Functor`, `Applicative`, and `Monad`, enabling clean chaining with `do`-notation and `>>=`.

## Example

```haskell
import Data.Char (digitToInt, isDigit)

-- Maybe: success or absence
safeSqrt :: Double -> Maybe Double
safeSqrt x
    | x < 0    = Nothing
    | otherwise = Just (sqrt x)

-- Either: success or typed error
data ParseError = EmptyInput | InvalidChar Char | Overflow
    deriving (Show)

parsePositiveInt :: String -> Either ParseError Int
parsePositiveInt ""  = Left EmptyInput
parsePositiveInt str
    | not (all isDigit str) = Left (InvalidChar (head (filter (not . isDigit) str)))
    | otherwise =
        let n = read str :: Integer
        in if n > fromIntegral (maxBound :: Int)
           then Left Overflow
           else Right (fromIntegral n)

-- Chaining with >>= (monad)
processInput :: String -> Either ParseError Double
processInput s = do             -- do-notation for Either
    n <- parsePositiveInt s     -- Left short-circuits the chain
    root <- case safeSqrt (fromIntegral n) of
                Nothing -> Left (InvalidChar '?')  -- reuse error type
                Just r  -> Right r
    return (root * 2)

-- fmap / <$> over Either
doubled :: Either ParseError Int
doubled = (*2) <$> parsePositiveInt "21"  -- Right 42

-- Collecting multiple errors with Validation (not in base; use 'validation' package)
-- import Data.Validation
-- v1 <*> v2 accumulates errors rather than short-circuiting

-- Converting between Maybe and Either
maybeToEither :: e -> Maybe a -> Either e a
maybeToEither e Nothing  = Left e
maybeToEither _ (Just x) = Right x
```

## Gotchas

- `Either`'s `Monad` instance short-circuits on the **first** `Left`; for parallel validation (collecting all errors) use the `Validation` type from the `validation` package
- By convention, `Left` is error and `Right` is success; this is baked into the standard `Monad` instance
- `Maybe` loses the error reason; prefer `Either` when the caller needs to know *why* something failed
