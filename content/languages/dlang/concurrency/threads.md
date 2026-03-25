---
title: "Threads"
language: "dlang"
feature: "threads"
category: "concurrency"
applicable: true
---

D provides two threading models: `std.concurrency` (message-passing with `spawn`, `send`, `receive`) and `core.thread.Thread` (raw OS threads with shared memory). The type system enforces sharing rules: data must be `shared` or `immutable` to be safely accessed across threads; `__gshared` bypasses checks (like C-style globals). `std.parallelism` offers task-parallel higher-level abstractions.

## Example

```d
import std.stdio;
import std.concurrency;
import std.parallelism : parallel, taskPool;

// Message-passing concurrency
void worker(Tid parent)
{
    auto msg = receiveOnly!string();
    writeln("Worker received: ", msg);
    send(parent, "done");
}

void main()
{
    // std.concurrency: spawn + message passing
    Tid child = spawn(&worker, thisTid);
    send(child, "hello from main");
    auto reply = receiveOnly!string();
    writeln("Main received: ", reply);

    // std.parallelism: parallel foreach
    int[] data = new int[](8);
    foreach (i, ref v; parallel(data))
        v = cast(int)(i * i);
    writeln(data);  // [0, 1, 4, 9, 16, 25, 36, 49]

    // taskPool for async tasks
    auto t = taskPool.async((int x) => x * x, 7);
    writeln(t.yieldForce());  // 49
}
```

## Gotchas

- `std.concurrency` enforces that only `immutable` or value types can be sent between threads (non-`shared` class references are forbidden).
- `shared` data requires explicit synchronisation (mutexes, `atomicOp`) — the type system does not prevent data races automatically, it just flags unsynchronised accesses at compile time via `shared` qualifiers.
- Mixing `std.concurrency` and raw `core.thread.Thread` in the same program is possible but requires care.
- `std.parallelism.parallel` is not suitable for tasks with interdependencies — use it only for embarrassingly parallel work.
