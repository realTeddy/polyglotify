---
title: "Threads"
language: "gleam"
feature: "threads"
category: "concurrency"
applicable: true
---

On the BEAM target, Gleam uses Erlang's lightweight **processes** as its concurrency unit — not OS threads. Processes are cheap (hundreds of bytes of memory), scheduled cooperatively by the BEAM VM across all CPU cores, and communicate via message passing. The `gleam_otp` library wraps OTP actors for structured concurrency.

## Example

```gleam
import gleam/io
import gleam/otp/task
import gleam/list

pub fn parallel_map(items: List(a), f: fn(a) -> b) -> List(b) {
  // Spawn a task for each item
  let tasks = list.map(items, fn(item) {
    task.async(fn() { f(item) })
  })

  // Collect results
  list.map(tasks, fn(t) {
    let assert Ok(result) = task.await(t, 5000)
    result
  })
}

pub fn main() {
  let inputs = [1, 2, 3, 4, 5]

  let results = parallel_map(inputs, fn(n) {
    // Each runs in its own BEAM process
    n * n
  })

  io.debug(results)
}
```

## Gotchas

- BEAM processes are not OS threads — millions can run simultaneously on a single machine.
- Process crashes are isolated: one process crashing does not bring down others unless they are linked.
- Shared mutable state does not exist — all data is immutable and passed by copying.
- For long-lived stateful actors, use `gleam_otp`'s `actor` module (wraps `gen_server`) rather than raw `spawn`.
- On the JavaScript target, there is no multi-threading at the Gleam level — JS runs on a single event loop.
