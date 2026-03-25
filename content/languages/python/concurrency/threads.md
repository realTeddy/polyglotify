---
title: "Threads"
language: "python"
feature: "threads"
category: "concurrency"
applicable: true
---

Python's `threading` module provides OS-level threads. Due to the Global Interpreter Lock (GIL), only one thread executes Python bytecode at a time, so threads are best suited for I/O-bound concurrency. CPU-bound work should use `multiprocessing` or `concurrent.futures.ProcessPoolExecutor` instead.

## Example

```python
import threading
import time

# Basic thread
def worker(name: str, delay: float) -> None:
    time.sleep(delay)
    print(f"Worker {name} done")

t = threading.Thread(target=worker, args=("A", 1.0))
t.start()
t.join()   # wait for thread to finish

# Thread with shared state — use a Lock
counter = 0
lock = threading.Lock()

def increment(n: int) -> None:
    global counter
    for _ in range(n):
        with lock:
            counter += 1

threads = [threading.Thread(target=increment, args=(1000,)) for _ in range(5)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(counter)  # 5000

# Thread-local storage
local_data = threading.local()

def set_name(name: str) -> None:
    local_data.name = name
    print(f"Thread {name}: local = {local_data.name}")

# Using ThreadPoolExecutor for managed pools
from concurrent.futures import ThreadPoolExecutor

def fetch(url: str) -> str:
    # simulate I/O
    time.sleep(0.1)
    return f"fetched {url}"

urls = ["http://example.com", "http://python.org", "http://pypi.org"]
with ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(fetch, urls))
```

## Gotchas

- The GIL means Python threads do not provide true parallelism for CPU-bound code — use `multiprocessing` for that
- Forgetting to acquire a lock around shared mutable state causes race conditions that are hard to reproduce
- Daemon threads (`t.daemon = True`) are killed abruptly when the main thread exits — they should not hold resources that need cleanup
