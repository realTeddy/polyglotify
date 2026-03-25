---
title: "Threads"
language: "haskell"
feature: "threads"
category: "concurrency"
applicable: true
---

GHC supports lightweight green threads via `Control.Concurrent.forkIO`. The runtime multiplexes them over OS threads (controlled by `+RTS -N`). `MVar` provides the basic synchronisation primitive — a mutable variable that can be empty or full, serving as both a mutex and a condition variable.

## Example

```haskell
import Control.Concurrent
import Control.Concurrent.MVar

main :: IO ()
main = do
    -- Fork a lightweight thread
    tid <- forkIO $ do
        threadDelay 500000  -- 500ms
        putStrLn "Thread finished"

    putStrLn "Main continues immediately"
    threadDelay 1000000  -- wait 1s for thread to complete

    -- MVar as a mutex / synchronized variable
    counter <- newMVar (0 :: Int)

    -- Spawn 10 threads each incrementing 1000 times
    threads <- mapM (\_ ->
        forkIO $ mapM_ (\_ ->
            modifyMVar_ counter (\n -> return (n + 1))
        ) [1..1000 :: Int]
        ) [1..10 :: Int]

    threadDelay 500000
    val <- readMVar counter
    putStrLn $ "Counter: " ++ show val  -- 10000

    -- MVar as a one-shot signal (empty = not ready, full = ready)
    done <- newEmptyMVar
    forkIO $ do
        threadDelay 200000
        putMVar done ()  -- signal completion
    takeMVar done        -- blocks until signal
    putStrLn "Worker done"

-- ThreadId can be used to kill a thread
killExample :: IO ()
killExample = do
    tid <- forkIO (threadDelay 10000000)
    threadDelay 100000
    killThread tid
    putStrLn "Thread killed"
```

## Gotchas

- GHC threads are green threads; compile with `+RTS -N` (or set `GHCRTS="-N"`) to use multiple OS cores
- `modifyMVar_` is safe but not composable; for STM-based composable transactions use `Control.Concurrent.STM`
- `killThread` throws `ThreadKilled` asynchronously; always use `bracket`/`finally` for cleanup
