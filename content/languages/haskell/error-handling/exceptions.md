---
title: "Exceptions & Try/Catch"
language: "haskell"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Haskell supports both pure functional error handling (`Maybe`, `Either`) and impure IO exceptions via `Control.Exception`. The `try`, `catch`, and `throwIO` functions work within the `IO` monad. Pure exceptions exist but are strongly discouraged; use typed `Either` instead.

## Example

```haskell
import Control.Exception
import System.IO.Error (isDoesNotExistError)

-- throwIO (safe, only in IO)
validateAge :: Int -> IO ()
validateAge age
    | age < 0   = throwIO (userError "Age cannot be negative")
    | otherwise = putStrLn $ "Age is " ++ show age

-- try :: Exception e => IO a -> IO (Either e a)
safeReadFile :: FilePath -> IO (Either IOError String)
safeReadFile path = try (readFile path)

main :: IO ()
main = do
    result <- safeReadFile "/nonexistent"
    case result of
        Left  err -> putStrLn $ "IO error: " ++ show err
        Right txt -> putStrLn txt

-- catch with a handler
readFileSafe :: FilePath -> IO String
readFileSafe path =
    readFile path `catch` handler
  where
    handler :: IOError -> IO String
    handler e
        | isDoesNotExistError e = return ""
        | otherwise             = throwIO e

-- Custom exception type
data AppError = NotFound String | InvalidInput String
    deriving (Show)

instance Exception AppError

throwExample :: IO ()
throwExample = throwIO (NotFound "user:42")

catchExample :: IO ()
catchExample =
    throwExample `catch` \(NotFound msg) ->
        putStrLn $ "Not found: " ++ msg

-- bracket: resource safety (try/finally equivalent)
withFile' :: FilePath -> (Handle -> IO a) -> IO a
withFile' path action =
    bracket (openFile path ReadMode) hClose action
```

## Gotchas

- `error "msg"` (pure) throws an exception that can only be caught in `IO`; never use it in pure code — use `Maybe` or `Either` instead
- Asynchronous exceptions can arrive at any `IO` action; use `mask` or `bracket` to protect critical sections
- `catch` only catches exceptions matching the specified type; unexpected exception types propagate
