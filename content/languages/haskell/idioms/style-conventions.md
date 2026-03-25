---
title: "Style Conventions"
language: "haskell"
feature: "style-conventions"
category: "idioms"
applicable: true
---

The Haskell community follows conventions in the [Johan Tibell style guide](https://github.com/tibbe/haskell-style-guide) and the more modern [Kowainik guide](https://kowainik.github.io/posts/2019-02-06-style-guide). **Ormolu** and **Fourmolu** are the standard formatters; **HLint** provides idiomatic suggestions.

## Example

```haskell
-- Module header: always include an explicit export list
module MyProject.Parser
    ( -- * Types
      ParseError(..)
    , ParseResult
      -- * Functions
    , parse
    , parseFile
    ) where

-- Imports: grouped and sorted (stdlib, external, internal)
import Data.Char       (isAlpha, isDigit)
import Data.List       (intercalate)

import Data.Text       (Text)
import qualified Data.Text       as T
import qualified Data.Map.Strict as Map

import MyProject.Core  (Config)

-- Types: PascalCase
data ParseError = UnexpectedChar Char Int | UnexpectedEOF
    deriving (Show, Eq)

type ParseResult a = Either ParseError a

-- Functions: camelCase
-- Constants / top-level values: camelCase
-- Type variables: single lowercase letters (a, b, f, m)
-- Type class constraints: listed before =>

parse :: Text -> ParseResult [Token]
parse input = ...

-- Alignment: align record fields and case branches
data Config = Config
    { configHost    :: Text
    , configPort    :: Int
    , configTimeout :: Int
    } deriving (Show)

classify :: Int -> String
classify n = case n of
    0 -> "zero"
    1 -> "one"
    _ -> "other"

-- 80-100 column line limit; break long signatures at arrows
processMany
    :: (Foldable t, Show a)
    => Config
    -> t a
    -> IO ()
processMany cfg xs = ...
```

```bash
# Format with Ormolu
ormolu --mode inplace src/**/*.hs

# Lint with HLint
hlint src/
```

## Gotchas

- Haskell is whitespace-sensitive; indentation determines block structure (layout rule)
- Always add type signatures to top-level bindings; they serve as documentation and help error messages
- Use explicit import lists or qualified imports; wildcard imports (`import Data.Map`) cause name collisions
