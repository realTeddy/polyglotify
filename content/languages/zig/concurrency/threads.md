---
title: "Threads"
language: "zig"
feature: "threads"
category: "concurrency"
applicable: true
---

Zig provides OS threads via `std.Thread`. Threads are spawned with `std.Thread.spawn`, joined with `.join()`, and detached with `.detach()`. Shared mutable state is protected with `std.Thread.Mutex`, `std.Thread.RwLock`, or atomic operations via `std.atomic`. Zig has no data race detector built in, so careful design is required.

## Example

```zig
const std = @import("std");

const SharedState = struct {
    mutex: std.Thread.Mutex = .{},
    counter: u64 = 0,

    pub fn increment(self: *SharedState) void {
        self.mutex.lock();
        defer self.mutex.unlock();
        self.counter += 1;
    }
};

fn worker(state: *SharedState, iterations: u32) void {
    for (0..iterations) |_| {
        state.increment();
    }
}

pub fn main() !void {
    var state = SharedState{};

    const num_threads = 4;
    const iters_each  = 10_000;

    var threads: [num_threads]std.Thread = undefined;
    for (&threads) |*t| {
        t.* = try std.Thread.spawn(.{}, worker, .{&state, iters_each});
    }
    for (&threads) |t| {
        t.join();
    }

    const expected = num_threads * iters_each;
    std.debug.print("counter={d}, expected={d}, ok={}\n",
        .{state.counter, expected, state.counter == expected});
}
```

## Gotchas

- Always `join()` or `detach()` every spawned thread; leaking a thread handle is a resource leak.
- `defer mutex.unlock()` is the safe pattern to ensure unlock even if the function returns early.
- Zig's `std.Thread` maps 1:1 to OS threads; creating thousands is expensive — use a thread pool.
