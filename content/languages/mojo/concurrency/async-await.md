---
title: "Async/Await"
language: "mojo"
feature: "async-await"
category: "concurrency"
applicable: false
---

Mojo does not have `async`/`await` syntax as of its current releases (through mid-2025). Mojo's concurrency roadmap includes parallelism primitives focused on data parallelism (SIMD, `parallelize`) rather than async I/O. Python's `asyncio` can be used through Mojo's Python interop layer for I/O-bound concurrency.

## Example

```mojo
# Mojo's parallelism is data-parallel (not async I/O)
from algorithm import parallelize

fn process_chunk(start: Int, end: Int, data: List[Float64]) -> Float64:
    var sum = 0.0
    for i in range(start, end):
        sum += data[i] * data[i]
    return sum

fn parallel_sum_of_squares(data: List[Float64]) -> Float64:
    # parallelize splits work across CPU cores
    var n = len(data)
    var chunk = n // 4  # 4 chunks

    # NOTE: parallelize API varies by Mojo version
    # This illustrates the concept
    var total = 0.0
    for i in range(4):
        total += process_chunk(i * chunk, (i + 1) * chunk, data)
    return total

# Python asyncio via interop
fn use_python_async():
    from python import Python
    Python.execute("""
import asyncio
async def fetch():
    await asyncio.sleep(0)
    return 'done'
result = asyncio.run(fetch())
print(result)
""")
```

## Gotchas

- Mojo is primarily focused on compute (ML/AI) parallelism using SIMD and multi-core; async I/O is not a current priority.
- For async I/O needs, use Python interop with `asyncio` or call into Python's `aiohttp` etc.
- The `parallelize` function in `algorithm` module provides fork-join parallelism for CPU-bound tasks.
