---
title: "Common Patterns"
language: "haskell"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Haskell idioms are shaped by immutability, lazy evaluation, and the type system. Key patterns include the `newtype` wrapper, smart constructors, `Data.Map` pipelines, monadic chaining, and the `ReaderT` pattern for dependency injection.

## Example

```haskell
-- 1. newtype wrapper for type safety
newtype UserId   = UserId   Int  deriving (Show, Eq, Ord)
newtype UserName = UserName String deriving (Show, Eq)

-- 2. Smart constructor (validates invariants)
mkUserName :: String -> Either String UserName
mkUserName s
    | null s        = Left "name cannot be empty"
    | length s > 50 = Left "name too long"
    | otherwise     = Right (UserName s)

-- 3. Pipeline with function composition
process :: [String] -> [String]
process = filter (not . null) . map (dropWhile (== ' ')) . take 100

-- 4. Functor/Applicative/Monad chaining
parseAndDouble :: String -> Maybe Int
parseAndDouble s = (*2) <$> (readMaybe s :: Maybe Int)
  where readMaybe = \x -> case reads x of [(n,"")] -> Just n; _ -> Nothing

-- 5. ReaderT for dependency injection
import Control.Monad.Reader
data Config = Config { dbUrl :: String, logLevel :: Int }
type App a = ReaderT Config IO a

getDbUrl :: App String
getDbUrl = asks dbUrl

runApp :: Config -> App a -> IO a
runApp cfg action = runReaderT action cfg

-- 6. Maybe chaining (guard pattern)
lookupUser :: Map UserId UserName -> UserId -> Maybe String
lookupUser db uid = do
    UserName n <- Map.lookup uid db
    guard (not (null n))
    return n

-- 7. foldr to build data structures
toMap :: [(String, Int)] -> Map.Map String Int
toMap = foldr (\(k,v) acc -> Map.insert k v acc) Map.empty
```

## Gotchas

- The `newtype` pattern has zero runtime overhead and prevents mixing up semantically different `Int`s
- Smart constructors return `Maybe` or `Either`; export only the constructor function, not the raw data constructor, to maintain invariants
- Monadic `do`-notation with `Maybe`/`Either` is sequential and short-circuits on `Nothing`/`Left` — use it to replace deeply nested `case` expressions
