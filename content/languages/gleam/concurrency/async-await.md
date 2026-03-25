---
title: "Async/Await"
language: "gleam"
feature: "async-await"
category: "concurrency"
applicable: false
---

Gleam has no async/await syntax. On the BEAM target, concurrency is achieved through Erlang processes and message passing (OTP). On the JavaScript target, Gleam can interop with JS promises via FFI, but there is no native `async`/`await` in the Gleam language itself. The `gleam_otp` library provides structured concurrency primitives for BEAM.

## Example

```gleam
// On the BEAM target: use gleam_otp for concurrent tasks
import gleam/otp/task

pub fn main() {
  // Spawn a concurrent task (runs in a separate BEAM process)
  let t1 = task.async(fn() { expensive_computation(1) })
  let t2 = task.async(fn() { expensive_computation(2) })

  // Await results (blocks until done)
  let r1 = task.await(t1, 5000)  // 5 second timeout
  let r2 = task.await(t2, 5000)

  io.debug(r1)
  io.debug(r2)
}

fn expensive_computation(n: Int) -> Int {
  // Simulated work
  n * n
}
```

## Gotchas

- On the BEAM, `task.async` spawns a real lightweight process, not a cooperative coroutine — it is true parallelism.
- For JavaScript target, you need to write FFI to wrap Promise-based JS APIs.
- `task.await` will crash the calling process if the task crashes (unless you use `task.try_await`).
- There is no built-in event loop or promise type in Gleam — JavaScript async patterns require FFI wrappers.
