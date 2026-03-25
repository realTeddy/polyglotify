---
title: "Async/Await"
language: "zig"
feature: "async-await"
category: "concurrency"
applicable: false
---

Zig had experimental async/await syntax in earlier versions, but it was removed from Zig 0.11+ while being redesigned. The feature is planned to return in a future version with a different implementation. Currently, concurrency in Zig is achieved with OS threads (`std.Thread`). For async I/O, use platform event loops or the `libxev` library.

## Example

```zig
// Zig 0.11+ has no async/await; use threads for concurrency

const std = @import("std");

fn worker(id: usize) void {
    std.debug.print("Worker {d} starting\n", .{id});
    std.time.sleep(10 * std.time.ns_per_ms);
    std.debug.print("Worker {d} done\n", .{id});
}

pub fn main() !void {
    var threads: [4]std.Thread = undefined;

    for (&threads, 0..) |*t, i| {
        t.* = try std.Thread.spawn(.{}, worker, .{i});
    }

    for (&threads) |t| {
        t.join();
    }

    std.debug.print("All workers finished\n", .{});
}
```

## Gotchas

- As of Zig 0.11+, `async`/`await` keywords are removed; code using them will not compile.
- Watch the Zig release notes for the return of async/await in a future version.
- For high-performance async I/O today, consider `libxev` (an event loop library) or platform-specific APIs via Zig's C interop.
