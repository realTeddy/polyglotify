---
title: "Operators"
language: "haskell"
feature: "operators"
category: "basics"
applicable: true
---

Haskell operators are infix functions whose names consist of symbols. Any function can be used infix with backticks; any operator can be used prefix in parentheses. Operators have fixity (precedence and associativity) declared with `infixl`/`infixr`/`infix`.

## Example

```haskell
-- Standard arithmetic
x = 10 + 3    -- 13
y = 10 - 3    -- 7
z = 10 * 3    -- 30
d = 10 / 3    -- 3.3333... (fractional division)
i = 10 `div` 3  -- 3  (integer division)
m = 10 `mod` 3  -- 1
p = 2 ^ 10    -- 1024

-- Comparison
True  == True   -- True
1     /= 2      -- True  (not-equal)
3     >  2      -- True

-- Boolean
True && False   -- False
True || False   -- True
not True        -- False

-- List operators
1 : [2, 3]      -- [1, 2, 3]  (cons)
[1,2] ++ [3,4]  -- [1,2,3,4]  (append)

-- Function application: highest precedence, left-associative
-- f x y = (f x) y

-- $ operator: low-precedence function application (avoids parens)
print $ map (*2) [1..5]  -- same as print (map (*2) [1..5])

-- . operator: function composition
f = (+1) . (*2)
f 3  -- 7   (3*2+1)

-- Custom operator
(|>) :: a -> (a -> b) -> b
x |> f = f x
3 |> (*2) |> (+1)  -- 7
```

## Gotchas

- `/` is fractional division for `Fractional` types; use `div` and `mod` for integers
- `-` used as negation needs parentheses in some positions: `negate x` or `(-x)` not `-x` after an operator
- `==` requires the `Eq` typeclass; not all types support it by default
