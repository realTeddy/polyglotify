---
title: "Async/Await"
language: "python"
feature: "async-await"
category: "concurrency"
applicable: true
---

Python's `asyncio` library provides cooperative multitasking via an event loop. Functions declared with `async def` are coroutines; `await` suspends the current coroutine until the awaited task completes. Async I/O is ideal for high-concurrency network or file operations without threads.

## Example

```python
import asyncio
import aiohttp  # third-party async HTTP library

# Basic coroutine
async def greet(name: str) -> str:
    await asyncio.sleep(0.1)   # non-blocking sleep
    return f"Hello, {name}!"

async def main() -> None:
    result = await greet("Alice")
    print(result)

asyncio.run(main())  # entry point for async code

# Running tasks concurrently with asyncio.gather
async def fetch_data(url: str) -> str:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def fetch_all(urls: list[str]) -> list[str]:
    tasks = [fetch_data(url) for url in urls]
    return await asyncio.gather(*tasks)

# asyncio.create_task — fire-and-forget style
async def background_job() -> None:
    await asyncio.sleep(1)
    print("Job done")

async def run_background() -> None:
    task = asyncio.create_task(background_job())
    print("Doing other work...")
    await task   # wait for it to finish

# Async context managers and iterators
async def read_lines(path: str):
    async with aiofiles.open(path) as f:  # aiofiles third-party
        async for line in f:
            yield line.strip()
```

## Gotchas

- `async def` functions return a coroutine object when called — you must `await` them or pass them to `asyncio.run()`/`create_task()` to actually execute
- Mixing blocking code (e.g. `time.sleep`, synchronous file I/O) inside an async function blocks the entire event loop; use `asyncio.sleep` and async-compatible libraries
- `asyncio` is single-threaded — it gives concurrency for I/O-bound work but does not parallelise CPU-bound computation; use `ProcessPoolExecutor` for that
