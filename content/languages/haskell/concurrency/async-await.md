---
title: "Async/Await"
language: "haskell"
feature: "async-await"
category: "concurrency"
applicable: true
---

The `async` package provides `async`/`await` semantics for Haskell. `async` spawns a computation concurrently; `wait` blocks until it completes and re-throws any exceptions. `concurrently` runs two actions in parallel and returns both results.

## Example

```haskell
import Control.Concurrent.Async
import Control.Concurrent (threadDelay)

-- Run a task asynchronously and await the result
fetchData :: String -> IO String
fetchData url = do
    threadDelay 100000  -- simulate network delay (100ms)
    return $ "data from " ++ url

main :: IO ()
main = do
    -- Sequential: ~200ms total
    -- r1 <- fetchData "url1"
    -- r2 <- fetchData "url2"

    -- Concurrent: ~100ms total
    a1 <- async (fetchData "url1")
    a2 <- async (fetchData "url2")
    r1 <- wait a1    -- blocks until a1 completes
    r2 <- wait a2
    putStrLn (r1 ++ ", " ++ r2)

-- concurrently: run two IO actions in parallel
bothResults :: IO (String, String)
bothResults = concurrently
    (fetchData "url1")
    (fetchData "url2")

-- mapConcurrently: parallel map
allResults :: IO [String]
allResults = mapConcurrently fetchData ["url1", "url2", "url3"]

-- race: return the first to complete, cancel the other
fastest :: IO String
fastest = do
    result <- race (fetchData "slow") (fetchData "fast")
    case result of
        Left  r -> return r
        Right r -> return r

-- withAsync: ensure cancellation on exception
safeAsync :: IO ()
safeAsync =
    withAsync (fetchData "url1") $ \a -> do
        r <- wait a
        putStrLn r
```

## Gotchas

- `wait` re-throws exceptions from the async thread in the calling thread; use `waitCatch` to handle them as `Either`
- `async` uses lightweight Haskell threads (green threads), not OS threads; thousands can run concurrently
- Always use `withAsync` or `cancel` to avoid leaking async threads when an exception occurs
