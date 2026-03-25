---
title: "Channels & Message Passing"
language: "zig"
feature: "channels"
category: "concurrency"
applicable: false
---

Zig has no built-in channels or message-passing primitives. The standard library provides `std.Thread.Mutex`, semaphores, and conditions for synchronization, but no higher-level channel type. Channels can be implemented manually using a mutex-protected queue, or by using third-party libraries.

## Example

```zig
const std = @import("std");

// Manual channel implementation using mutex + ArrayList
fn Channel(comptime T: type) type {
    return struct {
        mutex:  std.Thread.Mutex = .{},
        cond:   std.Thread.Condition = .{},
        buffer: std.ArrayList(T),
        closed: bool = false,

        const Self = @This();

        pub fn init(allocator: std.mem.Allocator) Self {
            return .{ .buffer = std.ArrayList(T).init(allocator) };
        }

        pub fn deinit(self: *Self) void { self.buffer.deinit(); }

        pub fn send(self: *Self, val: T) !void {
            self.mutex.lock();
            defer self.mutex.unlock();
            try self.buffer.append(val);
            self.cond.signal();
        }

        pub fn recv(self: *Self) ?T {
            self.mutex.lock();
            defer self.mutex.unlock();
            while (self.buffer.items.len == 0) {
                if (self.closed) return null;
                self.cond.wait(&self.mutex);
            }
            return self.buffer.orderedRemove(0);
        }

        pub fn close(self: *Self) void {
            self.mutex.lock();
            defer self.mutex.unlock();
            self.closed = true;
            self.cond.broadcast();
        }
    };
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();

    var ch = Channel(u32).init(gpa.allocator());
    defer ch.deinit();

    const t = try std.Thread.spawn(.{}, struct {
        fn run(c: *Channel(u32)) void {
            for (0..5) |i| c.send(@intCast(i)) catch {};
            c.close();
        }
    }.run, .{&ch});
    defer t.join();

    while (ch.recv()) |val| {
        std.debug.print("{d} ", .{val});
    }
    std.debug.print("\n", .{});
}
```

## Gotchas

- The manual implementation above is for illustration; production code should use a well-tested library.
- Zig has no built-in work-stealing or async runtime; each thread manually cooperates via locks.
- Consider `std.Thread.Semaphore` or `std.Thread.ResetEvent` for simpler producer/consumer synchronization.
