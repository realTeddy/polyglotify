---
title: "Threads"
language: "mojo"
feature: "threads"
category: "concurrency"
applicable: true
---

Mojo provides parallelism through the `parallelize` function in the `algorithm` module and through SIMD for data-level parallelism. `parallelize` distributes loop iterations across CPU threads. Mojo also exposes Python's `threading` module via interop. The focus is on high-performance compute parallelism rather than general-purpose threading.

## Example

```mojo
from algorithm import parallelize, vectorize
from math import sqrt

# Parallel loop — distribute iterations across CPU cores
fn parallel_sqrt(inout data: List[Float64]):
    @parameter
    fn compute(i: Int):
        data[i] = sqrt(data[i])

    parallelize[compute](len(data))

# Vectorize — SIMD parallelism within a single thread
fn vectorized_sqrt(inout data: List[Float64]):
    alias simd_width = 8  # process 8 floats at once

    @parameter
    fn compute_simd[width: Int](i: Int):
        var chunk = SIMD[DType.float64, width].load(data, i)
        chunk.store(data, i, sqrt(chunk))

    vectorize[compute_simd, simd_width](len(data))

# Python threading via interop
fn python_threads():
    from python import Python
    Python.execute("""
import threading

results = []
def worker(n):
    results.append(n * n)

threads = [threading.Thread(target=worker, args=(i,)) for i in range(4)]
for t in threads: t.start()
for t in threads: t.join()
print(results)
""")
```

## Gotchas

- `parallelize` has overhead; use it only when the work per iteration is substantial enough to justify the threading cost.
- SIMD (`vectorize`) and multi-threading (`parallelize`) can be combined for maximum throughput.
- Mojo's parallelism primitives are designed for embarrassingly parallel workloads; complex coordination is best handled through Python's threading/multiprocessing.
