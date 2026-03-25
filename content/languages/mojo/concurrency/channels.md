---
title: "Channels & Message Passing"
language: "mojo"
feature: "channels"
category: "concurrency"
applicable: false
---

Mojo does not have built-in channels or message-passing primitives. Its concurrency model is focused on data parallelism (SIMD and `parallelize`) rather than actor-based or CSP-style concurrency. For channel-based concurrency, you can use Python's `queue.Queue` or `multiprocessing` via Mojo's Python interop.

## Example

```mojo
# Mojo has no built-in channels.
# Use Python's queue for message passing via interop.

fn python_channel_example():
    from python import Python
    Python.execute("""
import queue
import threading

ch = queue.Queue(maxsize=10)

def producer():
    for i in range(5):
        ch.put(f'item-{i}')
    ch.put(None)  # sentinel

def consumer():
    while True:
        item = ch.get()
        if item is None:
            break
        print('received:', item)

t_prod = threading.Thread(target=producer)
t_cons = threading.Thread(target=consumer)
t_prod.start()
t_cons.start()
t_prod.join()
t_cons.join()
""")

# For compute-focused parallelism, use parallelize instead
from algorithm import parallelize

fn parallel_map(inout results: List[Int], inputs: List[Int]):
    @parameter
    fn process(i: Int):
        results[i] = inputs[i] * inputs[i]
    parallelize[process](len(inputs))
```

## Gotchas

- Mojo's `parallelize` is fork-join, not message-passing; it does not support bidirectional communication between workers.
- For producer-consumer patterns, Python's `queue.Queue` via interop is the pragmatic solution until Mojo adds native concurrency primitives.
- Mojo's concurrency story is actively being developed; native channels may be added in future versions.
