---
title: "Closures & Lambdas"
language: "haskell"
feature: "closures"
category: "functions"
applicable: true
---

All Haskell functions are closures — they capture bindings from their lexical scope. Lambda expressions (`\x -> ...`) are anonymous functions. Because values are immutable, closures capture a value (or a thunk), never a mutable reference.

## Example

```haskell
-- Lambda syntax
double :: Int -> Int
double = \x -> x * 2

-- Multi-argument lambda
add :: Int -> Int -> Int
add = \x y -> x + y

-- Closure capturing an outer binding
makeAdder :: Int -> (Int -> Int)
makeAdder n = \x -> x + n   -- n is captured from the enclosing scope

add5 :: Int -> Int
add5 = makeAdder 5
-- add5 3 == 8

-- Partial application creates closures implicitly
greet :: String -> String -> String
greet greeting name = greeting ++ ", " ++ name ++ "!"

helloGreet :: String -> String
helloGreet = greet "Hello"   -- closes over "Hello"
-- helloGreet "Alice" == "Hello, Alice!"

-- Closures in higher-order functions
applyTwice :: (a -> a) -> a -> a
applyTwice f x = f (f x)

-- applyTwice (+3) 10 == 16

-- let creates local closures
makeMultiplier :: Int -> (Int -> Int)
makeMultiplier factor =
    let multiply x = x * factor  -- multiply closes over factor
    in multiply

triple :: Int -> Int
triple = makeMultiplier 3
-- triple 7 == 21
```

## Gotchas

- Because values are immutable, there are no "captured mutable variable" bugs common in other languages
- Lazy evaluation means a closure can capture a thunk that is only evaluated later; this can cause unexpected memory retention (space leaks)
- `\x y -> ...` is shorthand for `\x -> \y -> ...` (curried lambda)
