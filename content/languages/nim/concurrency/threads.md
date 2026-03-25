---
title: "Threads"
language: "nim"
feature: "threads"
category: "concurrency"
applicable: true
---

Nim supports OS threads via the `std/threads` module (compile with `--threads:on`). Threads are created with `createThread`. Shared data is protected with `Lock`. Nim's GC is thread-local by default; use `--gc:arc` or `--gc:orc` for shared heap across threads. `channels` (typed) enable safe inter-thread communication.

## Example

```nim
import std/[threads, locks, atomics]

# Shared counter with lock
var
  counter {.global.}: int = 0
  lock {.global.}: Lock

initLock(lock)

proc incrementWorker(iterations: int) {.thread.} =
  for _ in 1..iterations:
    withLock(lock):
      inc counter

# Atomic counter (lock-free)
var atomicCounter: Atomic[int]
atomicCounter.store(0)

proc atomicWorker(iterations: int) {.thread.} =
  for _ in 1..iterations:
    discard atomicCounter.fetchAdd(1)

# Run threads
var threads: array[4, Thread[int]]
for t in threads.mitems:
  createThread(t, incrementWorker, 10_000)
for t in threads.mitems:
  joinThread(t)

echo "Counter: ", counter   # 40000

# Atomic version
var athreads: array[4, Thread[int]]
for t in athreads.mitems:
  createThread(t, atomicWorker, 10_000)
for t in athreads.mitems:
  joinThread(t)
echo "Atomic: ", atomicCounter.load()
```

## Gotchas

- Compile with `nim c --threads:on file.nim`; threading is disabled by default.
- With the default GC (refc), each thread has its own heap; passing `ref` objects between threads requires `--gc:arc/orc`.
- `{.thread.}` pragma marks a proc as a thread entry point; it cannot have a return type other than `void`.
