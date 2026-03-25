---
title: "Channels & Message Passing"
language: "python"
feature: "channels"
category: "concurrency"
applicable: false
---

Python has no built-in channel primitive like Go's channels. The idiomatic alternative is `queue.Queue` (thread-safe) for multi-threaded code and `asyncio.Queue` for async code. Both provide producer/consumer message passing with optional capacity limits, closely mirroring channel semantics.

## Example

```python
import queue
import threading

# queue.Queue — thread-safe FIFO channel
def producer(q: queue.Queue, items: list) -> None:
    for item in items:
        q.put(item)
        print(f"Produced: {item}")
    q.put(None)   # sentinel to signal completion

def consumer(q: queue.Queue) -> None:
    while True:
        item = q.get()
        if item is None:
            break
        print(f"Consumed: {item}")
        q.task_done()

q: queue.Queue = queue.Queue(maxsize=5)  # bounded, like a buffered channel

t1 = threading.Thread(target=producer, args=(q, [1, 2, 3, 4, 5]))
t2 = threading.Thread(target=consumer, args=(q,))
t1.start(); t2.start()
t1.join();  t2.join()

# asyncio.Queue — async equivalent
import asyncio

async def async_producer(q: asyncio.Queue) -> None:
    for i in range(5):
        await q.put(i)
        await asyncio.sleep(0.05)

async def async_consumer(q: asyncio.Queue) -> None:
    while True:
        item = await q.get()
        print(f"Got: {item}")
        q.task_done()
        if q.empty():
            break

async def main() -> None:
    q: asyncio.Queue = asyncio.Queue()
    await asyncio.gather(async_producer(q), async_consumer(q))

asyncio.run(main())
```

## Gotchas

- `queue.Queue.get()` blocks the calling thread indefinitely by default — always pass a `timeout` or use `get_nowait()` to avoid deadlocks
- Unlike Go channels, `queue.Queue` has no `select`-like multiplexing primitive; use multiple queues with separate consumer threads or `asyncio` for fan-in patterns
- `asyncio.Queue` is not thread-safe — do not share it between threads; use `queue.Queue` for cross-thread communication
