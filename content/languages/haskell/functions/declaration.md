---
title: "Function Declaration"
language: "haskell"
feature: "declaration"
category: "functions"
applicable: true
---

Functions are the primary abstraction in Haskell. They are defined with equations, can use pattern matching across multiple clauses, and are automatically curried. Every function in Haskell takes exactly one argument and returns one value; multi-argument functions are curried by default.

## Example

```haskell
-- Simple function with type signature
double :: Int -> Int
double x = x * 2

-- Multiple clauses (pattern matching)
fib :: Integer -> Integer
fib 0 = 0
fib 1 = 1
fib n = fib (n-1) + fib (n-2)

-- Guards in function definition
bmi :: Double -> String
bmi b
    | b < 18.5 = "Underweight"
    | b < 25.0 = "Normal"
    | b < 30.0 = "Overweight"
    | otherwise = "Obese"

-- Lambda (anonymous function)
addThree :: Int -> Int
addThree = \x -> x + 3

-- Curried multi-argument function
add :: Int -> Int -> Int
add x y = x + y

-- Partial application
add5 :: Int -> Int
add5 = add 5

-- where clause for local helpers
hypotenuse :: Double -> Double -> Double
hypotenuse a b = sqrt sumSq
  where
    sumSq = a*a + b*b

-- Operator as function (sections)
double' :: [Int] -> [Int]
double' = map (*2)
```

## Gotchas

- The type `a -> b -> c` means `a -> (b -> c)` — all functions are curried; `add 3` is a valid partial application returning `Int -> Int`
- Pattern matching is tried top-to-bottom; put the most specific patterns first
- Recursive functions need a base case or they will loop forever (or overflow the stack for strict evaluation)
