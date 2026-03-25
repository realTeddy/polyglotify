---
title: "Channels & Message Passing"
language: "haskell"
feature: "channels"
category: "concurrency"
applicable: true
---

`Control.Concurrent.Chan` provides unbounded FIFO channels; `Control.Concurrent.STM.TChan` and `TQueue` provide STM-composable channels. `STM` (Software Transactional Memory) is Haskell's preferred high-level concurrency abstraction.

## Example

```haskell
import Control.Concurrent
import Control.Concurrent.Chan
import Control.Concurrent.STM
import Control.Concurrent.STM.TQueue

-- Basic Chan (unbounded, not STM)
chanExample :: IO ()
chanExample = do
    ch <- newChan
    -- Producer thread
    forkIO $ mapM_ (writeChan ch) [1..5 :: Int]
    -- Consumer
    mapM_ (\_ -> readChan ch >>= print) [1..5 :: Int]

-- STM TQueue (bounded-like, composable)
stmExample :: IO ()
stmExample = do
    q <- atomically newTQueue
    -- Producer
    forkIO $ mapM_ (\x -> atomically (writeTQueue q x)) [1..5 :: Int]

    threadDelay 100000
    -- Drain queue
    let loop = do
            mv <- atomically (tryReadTQueue q)
            case mv of
                Nothing -> return ()
                Just v  -> print v >> loop
    loop

-- STM: composable atomic transactions
type Account = TVar Int

transfer :: Account -> Account -> Int -> STM ()
transfer from to amount = do
    bal <- readTVar from
    if bal < amount
        then retry  -- block until balance is sufficient
        else do
            writeTVar from (bal - amount)
            modifyTVar to (+amount)

bankExample :: IO ()
bankExample = do
    alice <- newTVarIO 100
    bob   <- newTVarIO 50
    atomically (transfer alice bob 30)
    a <- readTVarIO alice
    b <- readTVarIO bob
    putStrLn $ "Alice: " ++ show a ++ ", Bob: " ++ show b
    -- Alice: 70, Bob: 80
```

## Gotchas

- `Chan` is unbounded; a fast producer and slow consumer will exhaust memory — use `TBQueue` for bounded queues
- STM `retry` blocks the current transaction until a `TVar` it read has changed; it does not spin
- Avoid mixing `MVar` and `STM` in the same protocol; choose one abstraction and stay consistent
